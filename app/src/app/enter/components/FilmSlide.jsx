import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "../HomePage.module.css";
import Media from "@/components/Media/Media";

const FilmSlide = ({ film, index }) => {
  const ref = useRef(null);

  return (
    <motion.div ref={ref} className={styles.filmSlide} style={{ background: "#fff" }}>
      <Media medium={film.coverMedia?.medium} />
    </motion.div>
  );
};

export default FilmSlide;
