import { useContext, useMemo } from "react";

import { DeviceContext } from "@/context/DeviceContext";
import { useViewport } from "@/context/ViewportContext";

export function useGeometry({ filmsLength, staticViewportHeight }) {
  const { isMobile } = useContext(DeviceContext);
  const { viewportWidth } = useViewport();

  const factor = isMobile ? 0.4 : 0.75;
  const slideHeight = useMemo(() => staticViewportHeight * factor, [staticViewportHeight]);
  const slideWidth = useMemo(() => (isMobile ? "100%" : viewportWidth * factor), [viewportWidth]);

  const loopHeight = useMemo(() => slideHeight * filmsLength, [slideHeight, filmsLength, staticViewportHeight]);

  const scrollContainerHeight = useMemo(() => loopHeight + staticViewportHeight - 19.5, [loopHeight]);

  return { slideHeight, slideWidth, loopHeight, scrollContainerHeight };
}
