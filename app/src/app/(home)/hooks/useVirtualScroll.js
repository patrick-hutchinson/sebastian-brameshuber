import { useEffect } from "react";
import { useMotionValue, wrap } from "framer-motion";

export function useVirtualScroll({ lenis, loopHeight, initialOffset = 0 }) {
  const virtualScroll = useMotionValue(0);

  useEffect(() => {
    if (!lenis) return;

    // console.log(lenis, "lenis");

    const onScroll = ({ scroll }) => {
      const y = wrap(-loopHeight, 0, -scroll + initialOffset);
      virtualScroll.set(y);
    };

    lenis.on("scroll", onScroll);
    onScroll({ scroll: lenis.scroll || 0 });
    return () => lenis.off("scroll", onScroll);
  }, [initialOffset, lenis, loopHeight]);

  return virtualScroll;
}
