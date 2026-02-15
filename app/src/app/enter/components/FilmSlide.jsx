import { motion, useTransform } from "framer-motion";
import styles from "../HomePage.module.css";

const FilmSlide = ({ film, index, virtualScroll, slideHeight, loopHeight, y }) => {
  const slideTop = index * slideHeight;

  const progress = useTransform(virtualScroll, (v) => {
    // v is NEGATIVE (you set -looped)
    const y = -v;

    // position of this slide relative to viewport
    const relative = slideTop - y;

    // normalize into [0..1] window
    const start = -slideHeight;
    const end = window.innerHeight;

    return Math.min(1, Math.max(0, (relative - start) / (end - start)));
  });

  const scale = useTransform(progress, [1, 0], [1.4, 0.8]);
  const opacity = useTransform(progress, [1, 0.35, 0], [1, 1, 0.2]);

  return (
    <motion.div
      className={styles.filmSlide}
      style={{
        scale,
        background: film.background,
        left: "50%",
        x: "-50%",
        opacity,
      }}
    >
      {index + 1}
    </motion.div>
  );
};

export default FilmSlide;
