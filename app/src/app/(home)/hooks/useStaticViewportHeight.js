// hooks/useViewportHeight.ts
import { useState, useLayoutEffect, useEffect } from "react";

export function useStaticViewportHeight() {
  const [staticViewportHeight, setStaticViewportHeight] = useState(null);

  // Initial mount (layout viewport, not visual viewport)
  useLayoutEffect(() => {
    setStaticViewportHeight(window.innerHeight);
  }, []);

  // Update only on orientation change
  useEffect(() => {
    const update = () => {
      setStaticViewportHeight(window.innerHeight);
    };

    window.addEventListener("orientationchange", update);
    return () => window.removeEventListener("orientationchange", update);
  }, []);

  return { staticViewportHeight };
}
