import { useEffect } from "react";
import { useMotionValue, wrap } from "framer-motion";

export function useVirtualScroll({ lenis, loopHeight }) {
  const virtualScroll = useMotionValue(0);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ scroll }) => {
      const y = wrap(-loopHeight, 0, -scroll);
      virtualScroll.set(y);
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, loopHeight]);

  return virtualScroll;
}
