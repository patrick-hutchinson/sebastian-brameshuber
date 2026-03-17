import { useState } from "react";
import { animate } from "framer-motion";
import { useAnimatedNavigation } from "@/components/Animation/hooks/useAnimatedNavigation";

export function useAnimation({ lenis, slideHeight, slideStride, virtualScroll, headerHeight, staticViewportHeight }) {
  const navigate = useAnimatedNavigation();

  // Animation Phase, and all Keyframe Functions
  const [animationPhase, setAnimationPhase] = useState({
    phase: "idle", // "0️⃣ idle" | "1️⃣ transitioning" | "2️⃣ focused"
    index: null,
  });

  const scrollToSlide = (index, film) => {
    if (animationPhase.phase === "transitioning") return;

    const targetScroll = index * slideStride - staticViewportHeight / 2 + slideHeight / 2 - headerHeight;
    const targetVirtualScroll = -targetScroll;

    // lenis?.stop();
    // virtualScroll.stop();

    // setPendingIndex(index); // 🔑 fade immediately
    setAnimationPhase({ phase: "transitioning", index });

    animate(virtualScroll, targetVirtualScroll, {
      type: "tween",
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setAnimationPhase({ phase: "focused", index });
        if (film?.slug?.current) navigate(`films/${film.slug.current}`);
      },
    });
  };

  return { animationPhase, scrollToSlide };
}
