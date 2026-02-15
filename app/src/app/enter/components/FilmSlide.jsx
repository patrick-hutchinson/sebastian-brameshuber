import { useState } from "react";
import { motion, useTransform, animate } from "framer-motion";
import styles from "../HomePage.module.css";

import Media from "@/components/Media/Media";

const FilmSlide = ({ film, index, virtualScroll, slideHeight, activeIndex, scrollToSlide }) => {
  const slideTop = index * slideHeight;

  const progress = useTransform(virtualScroll, (scrollValue) => {
    const y = -scrollValue; // v is NEGATIVE (you set -looped)

    const relative = slideTop - y; // position of this slide relative to viewport

    const start = -slideHeight;
    const end = window.innerHeight;

    return Math.min(1, Math.max(0, (relative - start) / (end - start))); // normalize into [0..1] window
  });

  const scale = useTransform(progress, [1, 0], [1.3, 0.8]);
  const opacity = useTransform(progress, [1, 0.35, 0], [1, 1, 0.2]);

  const handleClick = () => {
    scrollToSlide(index);
  };

  return (
    <motion.div
      className={styles.filmSlide}
      style={{
        transformOrigin: "center",
        scale:
          activeIndex === null
            ? scale // normal scroll-based
            : index === activeIndex
              ? 1 // clicked element
              : scale, // fade out the others
        left: "50%",
        x: "-50%",

        opacity:
          activeIndex === null
            ? opacity // normal scroll-based
            : index === activeIndex
              ? 1 // clicked element
              : 0, // fade out the others

        background: "#fff",
        color: "#000",
        pointerEvents:
          activeIndex === null
            ? "all" // normal scroll-based
            : index === activeIndex
              ? "all" // clicked element
              : "none", // fade out the others
      }}
      animate={{
        position: index === activeIndex ? "absolute" : "relative",
        width: index === activeIndex ? "100vw" : "80vw", // animate width
        height: index === activeIndex ? "100vh" : 600, // animate width
        originX: 0.5, // center horizontally
        originY: 0.5, // center vertically
      }}
      onClick={() => handleClick()}
    >
      <Media medium={film.coverMedia?.medium} />
    </motion.div>
  );
};

export default FilmSlide;
