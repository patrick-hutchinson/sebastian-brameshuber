import { useState, useEffect } from "react";
import { motion, useTransform, animate, useMotionValue } from "framer-motion";
import styles from "../HomePage.module.css";

import Media from "@/components/Media/Media";
import { useFilmSlideScale } from "../hooks/useFilmSlideScale";

const FilmSlide = ({ film, index, virtualScroll, slideHeight, activeIndex, scrollToSlide }) => {
  const noneSelected = activeIndex === null;
  const isActive = index === activeIndex;

  const slideTop = index * slideHeight;

  const progress = useTransform(virtualScroll, (scrollValue) => {
    const y = -scrollValue; // v is NEGATIVE (you set -looped)

    const relative = slideTop - y; // position of this slide relative to viewport

    const start = -slideHeight;
    const end = window.innerHeight;

    return Math.min(1, Math.max(0, (relative - start) / (end - start))); // normalize into [0..1] window
  });

  const scale = useFilmSlideScale({ progress, isActive, noneSelected, film });
  const opacity = useTransform(progress, [1, 0.35, 0], [1, 1, 0.2]);

  return (
    <motion.div
      className={styles.filmSlide}
      style={{
        transformOrigin: "center",

        scale: scale,
        left: "50%",
        x: "-50%",

        opacity: noneSelected
          ? opacity // normal scroll-based
          : isActive
            ? 1 // clicked element
            : 0, // fade out the others

        background: "#fff",
        color: "#000",
        pointerEvents: noneSelected || isActive ? "all" : "none",
      }}
      onClick={() => scrollToSlide(index)}
    >
      <Media medium={film.coverMedia?.medium} />
    </motion.div>
  );
};

export default FilmSlide;
