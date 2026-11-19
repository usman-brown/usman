import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and a boolean that flips to true the first time the element
 * enters the viewport. Used to defer expensive 3D canvases until they are
 * actually needed, which keeps the initial page load light.
 */
const useInView = ({ rootMargin = "200px", threshold = 0 } = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, inView];
};

export default useInView;
