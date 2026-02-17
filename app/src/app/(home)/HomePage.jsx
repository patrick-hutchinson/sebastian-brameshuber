"use client";

import { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import { useLenisContext } from "@/context/LenisContext";

import { motion } from "framer-motion";

import { useGeometry } from "./hooks/useGeometry";
import { useHeaderHeight } from "./hooks/useHeaderHeight";
import { useViewportHeight } from "./hooks/useViewportHeight";
import { useVirtualScroll } from "./hooks/useVirtualScroll";
import { useAnimation } from "./hooks/useAnimation";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";

const HomePage = ({ films }) => {
  const lenis = useLenisContext();

  const loopedFilms = [...films, ...films];

  const viewportHeight = useViewportHeight();
  const headerHeight = useHeaderHeight();

  const { itemHeight, loopHeight } = useGeometry({
    filmsLength: films.length,
    viewportHeight,
  });

  const virtualScroll = useVirtualScroll({ lenis, loopHeight });
  const { scrollToSlide, animationPhase } = useAnimation({
    lenis,
    itemHeight,
    virtualScroll,
    headerHeight: headerHeight.current,
    viewportHeight,
  });

  const slidePositions = useMemo(() => loopedFilms.map((_, i) => i * itemHeight), [loopedFilms, itemHeight]);

  if (!viewportHeight) return;

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
                itemHeight={itemHeight}
                animationPhase={animationPhase}
                scrollToSlide={scrollToSlide}
                viewportHeight={viewportHeight}
              />
            );
          })}
        </motion.div>
      </div>

      {/* SCROLL INPUT ONLY */}
      <div style={{ height: loopHeight }} />
    </>
  );
};

export default HomePage;
