import { motion, useTransform } from "framer-motion";
import styles from "../HomePage.module.css";

import Media from "@/components/Media/Media";
import { useScaleAnimation } from "../hooks/useScaleAnimation";

import { useOpacityAnimation } from "../hooks/useOpacityAnimation";
import { useViewportHeight } from "../hooks/useViewportHeight";

const FilmSlide = ({ film, index, virtualScroll, itemHeight, scrollToSlide, animationPhase, slidePosition }) => {
  const viewportHeight = useViewportHeight();

  const isTransitioning = animationPhase.phase === "transitioning" && animationPhase.index === index;
  const isFocused = animationPhase.phase === "focused" && animationPhase.index === index;
  const isIdle = animationPhase.phase === "idle";

  const progress = useTransform(virtualScroll, (scrollValue) => {
    const y = -scrollValue; // v is NEGATIVE (you set -looped)

    const relative = slidePosition - y; // position of this slide relative to viewport

    const start = -itemHeight;
    const end = viewportHeight;

    return Math.min(1, Math.max(0, (relative - start) / (end - start))); // normalize into [0..1] window
  });

  const scale = useScaleAnimation({ progress, isFocused, isIdle, film });
  const opacity = useOpacityAnimation({ progress, isTransitioning, isIdle });
  const top = useTransform(progress, [1, 0.5, 0], [0, 0, 250]);

  return (
    <motion.div className={styles.filmSlide} style={{ scale, x: "-50%", opacity, top }} onClick={() => scrollToSlide(index)}>
      <Media medium={film.coverMedia?.medium} />
    </motion.div>
  );
};

export default FilmSlide;
