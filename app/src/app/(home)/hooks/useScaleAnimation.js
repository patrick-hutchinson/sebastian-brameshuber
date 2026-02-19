import { useEffect, useContext } from "react";
import { useTransform, useMotionValue, animate } from "framer-motion";
import { useAnimatedNavigation } from "../../../components/Animation/hooks/useAnimatedNavigation";

import { DeviceContext } from "@/context/DeviceContext";

import { preloadImage } from "@/utils/imageCache";

export function useScaleAnimation({ progress, isFocused, isIdle, film }) {
  const { isMobile } = useContext(DeviceContext);
  const navigate = useAnimatedNavigation();
  // scroll-driven scale
  const scrollScale = useTransform(progress, [1, 0], [1.2, 0.8]);

  // click-driven scale
  const clickScale = useMotionValue(1);

  const preloadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });

  useEffect(() => {
    if (isIdle) {
      animate(clickScale, 1, {
        type: "spring",
        stiffness: 120,
        damping: 24,
      });
    } else if (isFocused) {
      animate(clickScale, isMobile ? 1 : 1.265, {
        type: "spring",
        stiffness: 120,
        damping: 24,
        onComplete: async () => {
          const imageUrl = film.coverMedia.medium.url;

          await preloadImage(imageUrl);

          navigate(`films/${film.slug.current}`);
        },
      });
    } else {
      animate(clickScale, 1, {
        type: "spring",
        stiffness: 120,
        damping: 24,
      });
    }
  }, [isFocused, isIdle]);

  // combine
  const scale = useTransform([scrollScale, clickScale], ([scroll, click]) => scroll * click);

  return scale;
}
