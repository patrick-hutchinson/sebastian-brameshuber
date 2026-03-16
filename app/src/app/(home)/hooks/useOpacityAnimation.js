import { useEffect } from "react";
import { useTransform, useMotionValue, animate } from "framer-motion";
import { useContext } from "react";
import { DeviceContext } from "@/context/DeviceContext";

export function useOpacityAnimation({ progress, isTransitioning, isFocused, isIdle, top }) {
  const { isMobile } = useContext(DeviceContext);
  const scrollOpacity = isMobile
    ? useTransform(progress, [1, 0.78, 0.5, 0.22, 0], [0, 0.35, 1, 0.35, 0])
    : useTransform(progress, [1, 0.45, 0], [1, 1, 0]);
  const clickOpacity = useMotionValue(1);

  useEffect(() => {
    if (isIdle) {
      animate(clickOpacity, 1, {
        duration: 0.25,
        ease: "easeOut",
      });
    } else if (isTransitioning) {
      animate(clickOpacity, 1, {
        duration: 0.25,
        ease: "easeOut",
      });
    } else if (isFocused) {
      animate(clickOpacity, 1);
    } else {
      animate(clickOpacity, 0, {
        duration: 0.2,
        ease: "easeOut",
      });
    }
  }, [isIdle, isTransitioning]);

  const opacity = useTransform([scrollOpacity, clickOpacity], ([scroll, click]) => scroll * click);

  return opacity;
}
