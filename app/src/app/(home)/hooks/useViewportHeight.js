// hooks/useViewportHeight.ts
import { useState, useLayoutEffect, useEffect } from "react";

export function useViewportHeight() {
  const [height, setHeight] = useState(null);

  // Initial mount (layout viewport, not visual viewport)
  useLayoutEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  // Update only on orientation change
  useEffect(() => {
    const update = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("orientationchange", update);
    return () => window.removeEventListener("orientationchange", update);
  }, []);

  return height;
}
