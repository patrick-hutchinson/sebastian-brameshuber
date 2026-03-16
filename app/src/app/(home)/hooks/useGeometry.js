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
  const slideGap = useMemo(() => (isMobile ? (staticViewportHeight || 0) * 0.2 : 0), [isMobile, staticViewportHeight]);
  const slideStride = useMemo(() => slideHeight + slideGap, [slideHeight, slideGap]);

  const loopHeight = useMemo(() => slideStride * filmsLength, [slideStride, filmsLength]);

  const scrollContainerHeight = useMemo(() => loopHeight + staticViewportHeight - 19.5, [loopHeight]);

  return { slideHeight, slideWidth, slideGap, slideStride, loopHeight, scrollContainerHeight };
}
