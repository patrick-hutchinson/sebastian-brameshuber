"use client";

import { useEffect, useRef } from "react";
import { useLenisContext } from "@/context/LenisContext";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";
import { useMotionValue, motion, wrap } from "framer-motion";

const HomePage = ({ films }) => {
  const array = [
    { background: "#f00" },
    { background: "#ff0" },
    { background: "#0f0" },
    { background: "#f0f" },
    { background: "#0ff" },
    { background: "#fff" },
    { background: "#00f" },
  ];

  const virtualScroll = useMotionValue(0);
  const duplicatedArray = [...array, ...array];
  const SLIDE_HEIGHT = 600;
  const LOOP_HEIGHT = SLIDE_HEIGHT * array.length + 745;

  const lenis = useLenisContext();
  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ scroll }) => {
      const y = wrap(-LOOP_HEIGHT, 0, -scroll);
      console.log(y, "y");
      virtualScroll.set(y);
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  return (
    <>
      <div className={styles.viewport}>
        <motion.div className={styles.track} style={{ y: virtualScroll }}>
          {duplicatedArray.map((film, index) => (
            <FilmSlide
              key={index}
              film={film}
              index={index}
              virtualScroll={virtualScroll}
              slideHeight={SLIDE_HEIGHT}
              loopHeight={LOOP_HEIGHT}
            />
          ))}
        </motion.div>
      </div>

      {/* SCROLL INPUT ONLY */}
      <div style={{ height: LOOP_HEIGHT }} />
    </>
  );
};

export default HomePage;
