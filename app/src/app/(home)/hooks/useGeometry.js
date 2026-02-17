import { useMemo } from "react";

export function useGeometry({ filmsLength, viewportHeight }) {
  const GAP = 0;

  const slideHeight = useMemo(() => viewportHeight * 0.75, [viewportHeight]);

  const itemHeight = useMemo(() => slideHeight + GAP, [slideHeight]);

  const loopHeight = useMemo(() => itemHeight * filmsLength + viewportHeight, [itemHeight, filmsLength, viewportHeight]);

  return { slideHeight, itemHeight, loopHeight };
}
