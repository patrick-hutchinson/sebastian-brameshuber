"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useLenisContext } from "@/context/LenisContext";

import { AnimatePresence, motion } from "framer-motion";

import { useGeometry } from "./hooks/useGeometry";
import { useHeaderHeight } from "./hooks/useHeaderHeight";
import { useStaticViewportHeight } from "./hooks/useStaticViewportHeight";
import { useVirtualScroll } from "./hooks/useVirtualScroll";
import { useAnimation } from "./hooks/useAnimation";
import { useScrollDetection } from "./hooks/useScrollDetection";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";

const HomePage = ({ films }) => {
  const lenis = useLenisContext();

  const isScrolling = useScrollDetection();

  const { staticViewportHeight } = useStaticViewportHeight();
  const headerHeight = useHeaderHeight();

  const { slideHeight, slideWidth, loopHeight, scrollContainerHeight } = useGeometry({
    filmsLength: films.length,
    staticViewportHeight,
  });

  const virtualScroll = useVirtualScroll({ lenis, loopHeight });

  const { scrollToSlide, animationPhase } = useAnimation({
    lenis,
    slideHeight,
    virtualScroll,
    headerHeight: headerHeight.current,
    staticViewportHeight,
  });

  const loopedFilms = [...films, ...films];

  const slidePositions = useMemo(() => loopedFilms.map((_, i) => i * slideHeight), [loopedFilms, slideHeight]);

  if (!staticViewportHeight) return;

  return (
    <>
      <div className={styles.viewport}>
        <motion.div className={styles.track} style={{ y: virtualScroll }}>
          {loopedFilms.map((film, index) => {
            return (
              <FilmSlide
                key={index}
                film={film}
                index={index}
                slidePosition={slidePositions[index]}
                virtualScroll={virtualScroll}
                slideHeight={slideHeight}
                slideWidth={slideWidth}
                animationPhase={animationPhase}
                scrollToSlide={scrollToSlide}
              />
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {!isScrolling && (
          <motion.div
            key="subtitle"
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            typo="display"
          >
            Directed by Sebastian Brameshuber
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL INPUT ONLY */}
      {<div style={{ height: scrollContainerHeight }} /> /* ❓ Where does 19.5 come from? */}
    </>
  );
};

export default HomePage;
