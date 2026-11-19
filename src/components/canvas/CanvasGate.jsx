import React, { Suspense, useEffect, useState } from "react";

import useInView from "../../hooks/useInView";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

/**
 * Mounts a 3D scene only when its container is close to the viewport,
 * and only on screens wide enough to benefit from it. This keeps three.js
 * out of the initial download on phones.
 */
const CanvasGate = ({
  children,
  className = "w-full h-full",
  rootMargin = "300px",
  minWidth = 768,
  fallback = null,
}) => {
  const [ref, inView] = useInView({ rootMargin });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(mediaQuery.matches && !reduceMotion.matches);

    update();
    mediaQuery.addEventListener("change", update);
    reduceMotion.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
      reduceMotion.removeEventListener("change", update);
    };
  }, [minWidth]);

  return (
    <div ref={ref} className={className}>
      {enabled && inView && (
        <CanvasErrorBoundary>
          <Suspense fallback={fallback}>{children}</Suspense>
        </CanvasErrorBoundary>
      )}
    </div>
  );
};

export default CanvasGate;
