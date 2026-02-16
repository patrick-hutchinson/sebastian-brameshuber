import { useEffect } from "react";
import { useTransform, useMotionValue, animate } from "framer-motion";

export function useOpacityAnimation({ progress, isPending, nonePending }) {
  const scrollOpacity = useTransform(progress, [1, 0.35, 0], [1, 1, 0.2]);
  const clickOpacity = useMotionValue(1);

  useEffect(() => {
    if (nonePending) {
      animate(clickOpacity, 1, {
        duration: 0.25,
        ease: "easeOut",
      });
    } else if (isPending) {
      animate(clickOpacity, 1, {
        duration: 0.25,
        ease: "easeOut",
      });
    } else {
      animate(clickOpacity, 0, {
        duration: 0.2,
        ease: "easeOut",
      });
    }
  }, [nonePending, isPending]);

  const opacity = useTransform([scrollOpacity, clickOpacity], ([scroll, click]) => scroll * click);

  return opacity;
}
