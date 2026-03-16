import { motion, useTransform } from "framer-motion";
import styles from "../HomePage.module.css";

import Media from "@/components/Media/Media";

import { useOpacityAnimation } from "../hooks/useOpacityAnimation";
import { useStaticViewportHeight } from "../hooks/useStaticViewportHeight";
import { useContext } from "react";
import { DeviceContext } from "@/context/DeviceContext";

const FilmSlide = ({
  film,
  index,
  virtualScroll,
  slideHeight,
  slideWidth,
  slideGap,
  scrollToSlide,
  animationPhase,
  slidePosition,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const { isDesktop } = useContext(DeviceContext);
  const { staticViewportHeight } = useStaticViewportHeight();

  const isTransitioning = animationPhase.phase === "transitioning" && animationPhase.index === index;
  const isFocused = animationPhase.phase === "focused" && animationPhase.index === index;
  const isIdle = animationPhase.phase === "idle";

  const progress = useTransform(virtualScroll, (scrollValue) => {
    const y = -scrollValue; // v is NEGATIVE (you set -looped)

    const relative = slidePosition - y; // position of this slide relative to viewport

    const start = -slideHeight;
    const end = staticViewportHeight;

    return Math.min(1, Math.max(0, (relative - start) / (end - start))); // normalize into [0..1] window
  });

  const top = {
    mobile: useTransform(progress, [1, 0.5, 0], [180, 0, 180]),
    desktop: useTransform(progress, [1, 0.5, 0], [250, 0, 250]),
  };
  const scale = useTransform(progress, [1, 0], [1.2, 0.8]);
  const opacity = useOpacityAnimation({ progress, isTransitioning, isFocused, isIdle, top });

  const mobileStyles = {
    height: slideHeight,
    width: slideWidth,
    opacity,
    scale,
    x: "-50%",
    top: top.mobile,
    marginBottom: slideGap,
  };
  const desktopStyles = {
    height: slideHeight,
    width: slideWidth,
    opacity,
    scale,
    x: "-50%",
    top: top.desktop,
  };

  const styling = isDesktop ? desktopStyles : mobileStyles;

  return (
    <motion.div
      className={styles.filmSlide}
      style={styling}
      onClick={() => scrollToSlide(index, film)}
      onMouseEnter={() => handleMouseEnter(film)}
      onMouseLeave={handleMouseLeave}
    >
      <Media medium={film.coverMedia?.medium} />
    </motion.div>
  );
};

export default FilmSlide;
