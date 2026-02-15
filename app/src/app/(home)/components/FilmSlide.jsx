import { useRef, useState, useEffect } from "react";

import styles from "../HomePage.module.css";

const FilmSlide = ({ film, index }) => {
  const ref = useRef(null);
  return (
    <div ref={ref} className={styles.filmSlide}>
      <div>{index + 1}</div>
    </div>
  );
};

export default FilmSlide;
