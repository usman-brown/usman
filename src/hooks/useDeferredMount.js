import { useEffect, useState } from "react";

/**
 * Delays mounting heavy 3D content until the browser is idle.
 * Skips entirely for small screens and users who prefer reduced motion.
 */
const useDeferredMount = ({ timeout = 2500, minWidth = 768 } = {}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia(`(max-width: ${minWidth - 1}px)`);

    if (reduceMotion.matches || smallScreen.matches) return undefined;

    let cancelled = false;
    let idleId;
    let timeoutId;

    const enable = () => {
      if (!cancelled) setReady(true);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout });
    } else {
      timeoutId = window.setTimeout(enable, 800);
    }

    return () => {
      cancelled = true;
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [timeout, minWidth]);

  return ready;
};

export default useDeferredMount;
