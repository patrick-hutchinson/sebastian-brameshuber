"use client";

import { useEffect, useState, useRef } from "react";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";
import { useLenisContext } from "@/context/LenisContext";
import { useMotionValue, motion, useTransform } from "framer-motion";

const HomePage = ({ films }) => {
  const lenis = useLenisContext();
  const scroll = useMotionValue(0); // virtual scroll
  const prevScrollRef = useRef(0);

  const array = [
    { background: "#f00" },
    { background: "#ff0" },
    { background: "#0f0" },
    { background: "#f0f" },
    { background: "#0ff" },
    { background: "#fff" },
    { background: "#00f" },
  ];

  const duplicatedArray = [...array, ...array];

  const slideHeight = 879;
  const totalHeight = slideHeight * duplicatedArray.length;

  useEffect(() => {
    if (!lenis) return;

    const onScroll = (e) => {
      const delta = e.animatedScroll - prevScrollRef.current;
      prevScrollRef.current = e.animatedScroll;
      scroll.set(scroll.get() + delta);
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, scroll]);

  const wrappedScroll = useTransform(scroll, (v) => {
    console.log(v, "v");
    return -(v % totalHeight);
  });

  return (
    <div className={styles.container}>
      <motion.div style={{ y: wrappedScroll }}>
        {duplicatedArray.map((film, index) => (
          <FilmSlide
            key={index}
            film={film}
            index={index}
            slideHeight={slideHeight}
            totalHeight={totalHeight}
            scroll={scroll}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HomePage;
