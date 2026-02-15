"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";

import { useLenisContext } from "@/context/LenisContext";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";

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

  const ITEM_HEIGHT = 50; // vh or px
  const TOTAL = array.length * ITEM_HEIGHT;

  const lenis = useLenisContext();
  const scroll = useMotionValue(0);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = (e) => scroll.set(e.animatedScroll);

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, scroll]);

  return (
    <div className={styles.gallery}>
      {array.map((film, index) => (
        <FilmSlide key={index} film={film} index={index} scroll={scroll} total={TOTAL} itemHeight={ITEM_HEIGHT} />
      ))}
    </div>
  );
};

export default HomePage;
