import { useState, useEffect, useContext } from "react";
import { motion, useTransform, animate, useMotionValue } from "framer-motion";
import styles from "../HomePage.module.css";

import Media from "@/components/Media/Media";
import { useScaleAnimation } from "../hooks/useScaleAnimation";
import { useViewport } from "../../../context/ViewportContext";
import { useOpacityAnimation } from "../hooks/useOpacityAnimation";

const FilmSlide = ({ film, index, virtualScroll, slideHeight, activeIndex, scrollToSlide, pendingIndex }) => {
  const { viewportHeight } = useViewport();
  const nonePending = pendingIndex === null;
  const isPending = index === pendingIndex; // Maybe rename to "is moving, movementinitiated"
  const isActive = index === activeIndex; // maybe rename to "has set, position completed"

  const slideTop = index * slideHeight;

  const progress = useTransform(virtualScroll, (scrollValue) => {
    const y = -scrollValue; // v is NEGATIVE (you set -looped)

    const relative = slideTop - y; // position of this slide relative to viewport

    const start = -slideHeight;
    const end = viewportHeight;

    return Math.min(1, Math.max(0, (relative - start) / (end - start))); // normalize into [0..1] window
  });

  const scale = useScaleAnimation({ progress, isActive, nonePending, film });
  const opacity = useOpacityAnimation({ progress, isPending, nonePending });
  const top = useTransform(progress, [1, 0.5, 0], [0, 0, 250]);

  return (
    <motion.div className={styles.filmSlide} style={{ scale, x: "-50%", opacity, top }} onClick={() => scrollToSlide(index)}>
      <Media medium={film.coverMedia?.medium} />
    </motion.div>
  );
};

export default FilmSlide;
