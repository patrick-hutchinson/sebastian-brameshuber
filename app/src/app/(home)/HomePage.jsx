"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLenisContext } from "@/context/LenisContext";
import { DeviceContext } from "@/context/DeviceContext";
import { isImageLoaded, preloadImage } from "@/utils/imageCache";
import { useRouter } from "next/navigation";

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
  const { isMobile, isSafari } = useContext(DeviceContext);
  const router = useRouter();

  const [hoveredFilm, setHoveredFilm] = useState(null);
  const [mobileInViewFilm, setMobileInViewFilm] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  const { staticViewportHeight } = useStaticViewportHeight();
  const headerHeight = useHeaderHeight();

  const sortedFilms = useMemo(() => films.filter((film) => film.showOnHomePage), [films]);

  const { slideHeight, slideWidth, slideGap, slideStride, loopHeight, scrollContainerHeight } = useGeometry({
    filmsLength: sortedFilms.length,
    staticViewportHeight,
  });

  const virtualScroll = useVirtualScroll({ lenis, loopHeight });

  const { scrollToSlide, animationPhase } = useAnimation({
    lenis,
    slideHeight,
    slideStride,
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

  const slidePositions = useMemo(() => loopedFilms.map((_, i) => i * slideStride), [loopedFilms, slideStride]);
  const homeImageUrls = useMemo(
    () => [...new Set(sortedFilms.map((film) => film.coverMedia?.medium?.url).filter(Boolean))],
    [sortedFilms],
  );

  useEffect(() => {
    if (!isSafari) {
      setIsInitialLoading(false);
      return;
    }
    if (!homeImageUrls.length) {
      setIsInitialLoading(false);
      return;
    }

    const urlsToPreload = homeImageUrls.filter((url) => !isImageLoaded(url));
    if (!urlsToPreload.length) {
      setIsInitialLoading(false);
      return;
    }

    let isCancelled = false;
    setIsInitialLoading(true);

    const timeout = setTimeout(() => {
      if (!isCancelled) setIsInitialLoading(false);
    }, 3500);

    Promise.allSettled(urlsToPreload.map((url) => preloadImage(url))).then(() => {
      if (isCancelled) return;
      clearTimeout(timeout);
      setIsInitialLoading(false);
    });

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [isSafari, homeImageUrls]);

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

  useEffect(() => {
    const uniqueFilmPaths = [...new Set(sortedFilms.map((film) => film?.slug?.current).filter(Boolean))].map(
      (slug) => `/films/${slug}`,
    );

    uniqueFilmPaths.forEach((path) => router.prefetch(path));
  }, [router, sortedFilms]);

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
                slideGap={slideGap}
                eagerImages={isSafari}
                animationPhase={animationPhase}
                scrollToSlide={scrollToSlide}
                handleMouseLeave={handleMouseLeave}
                handleMouseEnter={handleMouseEnter}
              />
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            className={styles.loadingOverlay}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span typo="display">Loading Films...</span>
          </motion.div>
        )}
      </AnimatePresence>

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
