import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "../HomePage.module.css";

const FilmSlide = ({ film, index }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /**
   * scrollYProgress meaning:
   * 0   → element bottom touches viewport bottom
   * 0.5 → element centered
   * 1   → element top touches viewport top
   */

  // const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [2, 1.2, 1, 0.75, 0.5]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <motion.div ref={ref} className={styles.filmSlide} style={{ scale, background: film.background }}>
      <div>{index + 1}</div>
    </motion.div>
  );
};

export default FilmSlide;
