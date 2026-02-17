import { useState } from "react";
import { animate } from "framer-motion";

export function useAnimation({ lenis, itemHeight, virtualScroll, headerHeight, viewportHeight }) {
  // Animation Phase, and all Keyframe Functions
  const [animationPhase, setAnimationPhase] = useState({
    phase: "idle", // "0️⃣ idle" | "1️⃣ transitioning" | "2️⃣ focused"
    index: null,
  });

  const scrollToSlide = (index) => {
    const targetScroll = index * itemHeight - viewportHeight / 2 + itemHeight / 2 - headerHeight;

    lenis?.stop(); // stop Lenis while animating
    virtualScroll.stop();

    // setPendingIndex(index); // 🔑 fade immediately
    setAnimationPhase({ phase: "transitioning", index });

    animate(virtualScroll, -targetScroll, {
      type: "spring",
      stiffness: 120,
      damping: 30,
      mass: 1.2,
      onComplete: () => {
        setAnimationPhase({ phase: "focused", index });
      },
    });
  };

  return { animationPhase, scrollToSlide };
}
