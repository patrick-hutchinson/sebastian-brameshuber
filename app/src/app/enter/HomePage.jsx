"use client";

import { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import { useLenisContext } from "@/context/LenisContext";
import { animate } from "framer-motion";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";
import { useMotionValue, motion, wrap } from "framer-motion";
import { getCssVariable } from "@/utils/getCSSVariable";
import { remToPixels } from "@/utils/remToPixels";

const HomePage = ({ films }) => {
  const lenis = useLenisContext();

  const loopedFilms = [...films, ...films];
  const [activeIndex, setActiveIndex] = useState(null);

  const [viewportHeight, setViewportHeight] = useState(0);
  const layoutOffsets = useRef({ headerHeight: 0, margin: 0 });

  const virtualScroll = useMotionValue(0);
  const SLIDE_HEIGHT = useMemo(() => viewportHeight * 0.75, [viewportHeight]);
  const LOOP_HEIGHT = useMemo(() => SLIDE_HEIGHT * films.length + viewportHeight, [SLIDE_HEIGHT, viewportHeight]);

  useLayoutEffect(() => {
    const update = () => setViewportHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useLayoutEffect(() => {
    layoutOffsets.current = {
      headerHeight: remToPixels(getCssVariable("--header-height")),
      margin: getCssVariable("--margin-page"),
    };
  }, []);

  // Update y based on lenis' scroll
  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ scroll }) => {
      const y = wrap(-LOOP_HEIGHT, 0, -scroll);

      virtualScroll.set(y);
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  const scrollToSlide = (index) => {
    const { headerHeight, margin } = layoutOffsets.current;

    const targetScroll = index * SLIDE_HEIGHT - window.innerHeight / 2 + SLIDE_HEIGHT / 2 - headerHeight - margin;

    // stop Lenis while animating
    lenis?.stop();
    virtualScroll.stop();

    animate(virtualScroll, -targetScroll, {
      type: "spring",
      stiffness: 120,
      damping: 30,
      mass: 1.2,
      onComplete: () => {
        setActiveIndex(index);
      },
    });
  };

  return (
    <>
      <div className={styles.viewport}>
        <motion.div className={styles.track} style={{ y: virtualScroll }}>
          {loopedFilms.map((film, index) => (
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
