import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "../HomePage.module.css";

const FilmSlide = ({ film, index }) => {
  const ref = useRef(null);

  return (
    <motion.div ref={ref} className={styles.filmSlide} style={{ background: film.background }}>
      <div>{index + 1}</div>
    </motion.div>
  );
};

export default FilmSlide;
