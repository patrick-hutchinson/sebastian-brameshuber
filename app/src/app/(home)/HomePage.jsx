"use client";

import { useContext, useMemo, useState } from "react";
import { useLenisContext } from "@/context/LenisContext";
import { DeviceContext } from "@/context/DeviceContext";

import { AnimatePresence, motion, useMotionValueEvent } from "framer-motion";

import { useGeometry } from "./hooks/useGeometry";
import { useHeaderHeight } from "./hooks/useHeaderHeight";
import { useStaticViewportHeight } from "./hooks/useStaticViewportHeight";
import { useVirtualScroll } from "./hooks/useVirtualScroll";
import { useAnimation } from "./hooks/useAnimation";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";

const HomePage = ({ films }) => {
  const lenis = useLenisContext();
  const { isMobile } = useContext(DeviceContext);

  const [hoveredFilm, setHoveredFilm] = useState(null);
  const [mobileInViewFilm, setMobileInViewFilm] = useState(null);

  const { staticViewportHeight } = useStaticViewportHeight();
  const headerHeight = useHeaderHeight();

  const sortedFilms = films.filter((film) => film.showOnHomePage);

  const { slideHeight, slideWidth, loopHeight, scrollContainerHeight } = useGeometry({
    filmsLength: sortedFilms.length,
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

  const handleMouseEnter = (film) => {
    setHoveredFilm(film);
  };
  const handleMouseLeave = () => {
    setHoveredFilm(null);
  };

  const loopedFilms = [...sortedFilms, ...sortedFilms];

  const slidePositions = useMemo(() => loopedFilms.map((_, i) => i * slideHeight), [loopedFilms, slideHeight]);

  useMotionValueEvent(virtualScroll, "change", (scrollValue) => {
    if (!isMobile || !slidePositions.length || !staticViewportHeight) return;

    const y = -scrollValue;
    const viewportCenter = staticViewportHeight / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    slidePositions.forEach((position, index) => {
      const slideCenter = position - y + slideHeight / 2;
      const distance = Math.abs(slideCenter - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    const nextFilm = loopedFilms[closestIndex] ?? null;
    setMobileInViewFilm((prevFilm) => {
      if (!prevFilm && !nextFilm) return prevFilm;
      if (prevFilm?.slug?.current && nextFilm?.slug?.current && prevFilm.slug.current === nextFilm.slug.current) {
        return prevFilm;
      }
      if (prevFilm?.title === nextFilm?.title) return prevFilm;
      return nextFilm;
    });
  });

  const subtitleText = isMobile ? (mobileInViewFilm?.title ?? null) : (hoveredFilm?.title ?? null);

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
                handleMouseLeave={handleMouseLeave}
                handleMouseEnter={handleMouseEnter}
              />
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {subtitleText && (
          <motion.div
            key={subtitleText}
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            typo="display"
            style={{ zIndex: 2 }}
          >
            {subtitleText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL INPUT ONLY */}
      {<div style={{ height: scrollContainerHeight }} />}
    </>
  );
};

export default HomePage;
