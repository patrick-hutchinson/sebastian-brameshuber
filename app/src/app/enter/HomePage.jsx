"use client";

import { useEffect, useState, useRef } from "react";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";
import { useLenisContext } from "@/context/LenisContext";
import { useMotionValue } from "framer-motion";

const HomePage = ({ films }) => {
  const lenis = useLenisContext();
  const scroll = useMotionValue(0); // virtual scroll
  const [lastScroll, setLastScroll] = useState(0);

  const [slideHeight, setSlideHeight] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const style = getComputedStyle(root);

    const parse = (v) => parseFloat(v);

    setSlideHeight(parse(style.getPropertyValue("--content-height")));
  }, [films]);

  const array = [
    { background: "#f00" },
    { background: "#ff0" },
    { background: "#0f0" },
    { background: "#f0f" },
    { background: "#0ff" },
    { background: "#fff" },
    { background: "#00f" },
    { background: "#f00" },
  ];

  useEffect(() => {
    if (!lenis) return;

    let prevScroll = 0;

    const onScroll = (e) => {
      const delta = e.animatedScroll - prevScroll; // difference since last frame
      prevScroll = e.animatedScroll;

      scroll.set(scroll.get() + delta); // accumulate continuously
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, scroll]);

  const duplicatedArray = [...array, ...array];

  return (
    <div className={styles.container}>
      {array.map((film, index) => (
        <FilmSlide key={film._id} film={film} index={index} />
      ))}
    </div>
  );
};

export default HomePage;
