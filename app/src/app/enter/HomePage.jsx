"use client";

import { useEffect, useState, useRef } from "react";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";
import { useLenisContext } from "@/context/LenisContext";
import { useMotionValue, motion, useTransform } from "framer-motion";

const HomePage = ({ films }) => {
  const lenis = useLenisContext();
  const scroll = useMotionValue(0); // virtual scroll

  const duplicatedArray = [...films, ...films];

  const slideHeight = 767;
  const totalHeight = slideHeight * duplicatedArray.length;

  useEffect(() => {
    if (!lenis) return;

    const onScroll = (e) => {
      scroll.set(e.animatedScroll);
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, scroll]);

  const halfHeight = slideHeight * films.length;

  const wrappedScroll = useTransform(scroll, (v) => {
    // keep value within [0, halfHeight] for seamless loop
    return -(v % halfHeight);
  });

  return (
    <div className={styles.container}>
      {duplicatedArray.map((film, index) => (
        <FilmSlide key={index} film={film} index={index} />
      ))}
    </div>
  );
};

export default HomePage;
