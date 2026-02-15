"use client";

import { useState, useEffect, useRef } from "react";
import { useLenisContext } from "@/context/LenisContext";
import { animate } from "framer-motion";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";
import { useMotionValue, motion, wrap } from "framer-motion";

const HomePage = ({ films }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const [isAnimating, setIsAnimating] = useState(false);

  const virtualScroll = useMotionValue(0);
  const duplicatedArray = [...films, ...films];
  const SLIDE_HEIGHT = 600; // ⚠️ Update slide height!

  const LOOP_HEIGHT = SLIDE_HEIGHT * films.length + 745; // ⚠️ Update manual offset!

  const lenis = useLenisContext();
  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ scroll }) => {
      if (isAnimating) return; // ignore scroll events while animating
      const y = wrap(-LOOP_HEIGHT, 0, -scroll);

      virtualScroll.set(y);
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  useEffect(() => {}, [activeIndex]);

  // HomePage
  const scrollToSlide = (index) => {
    setIsAnimating(true);
    const targetScroll = index * SLIDE_HEIGHT - window.innerHeight / 2 + SLIDE_HEIGHT / 2;

    // stop Lenis while animating
    lenis?.stop();
    virtualScroll.stop();

    animate(virtualScroll, -targetScroll, {
      type: "spring",
      stiffness: 150,
      damping: 25,
      onComplete: () => {
        setActiveIndex(index);
      },
    });
  };

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
              activeIndex={activeIndex}
              scrollToSlide={scrollToSlide}
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
