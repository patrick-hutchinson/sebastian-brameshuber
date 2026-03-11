import { useContext, useMemo } from "react";

import { DeviceContext } from "@/context/DeviceContext";
import { useViewport } from "@/context/ViewportContext";

export function useGeometry({ filmsLength, staticViewportHeight }) {
  const { isMobile } = useContext(DeviceContext);
  const { viewportWidth } = useViewport();

  // Keep the slide responsive by width while enforcing a fixed 16:9 media frame.
  const widthFactor = isMobile ? 1 : 0.75;
  const slideWidth = useMemo(() => viewportWidth * widthFactor, [viewportWidth, widthFactor]);
  const slideHeight = useMemo(() => (slideWidth * 9) / 16, [slideWidth]);

  const loopHeight = useMemo(() => slideHeight * filmsLength, [slideHeight, filmsLength, staticViewportHeight]);

  const scrollContainerHeight = useMemo(() => loopHeight + staticViewportHeight - 19.5, [loopHeight]);

  return { slideHeight, slideWidth, loopHeight, scrollContainerHeight };
}
