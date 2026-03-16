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

    // lenis?.stop();
    // virtualScroll.stop();

    // setPendingIndex(index); // 🔑 fade immediately
    setAnimationPhase({ phase: "transitioning", index });

    animate(virtualScroll, -targetScroll, {
      type: "spring",
      stiffness: 120,
      damping: 30,
      mass: 1.2,
      onComplete: () => {
        setAnimationPhase({ phase: "focused", index });
        if (film?.slug?.current) {
          navigate(`films/${film.slug.current}`);
        }
      },
    });
  };

  return { animationPhase, scrollToSlide };
}
