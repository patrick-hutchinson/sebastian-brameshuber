import Media from "@/components/Media/Media";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useViewport } from "@/context/ViewportContext";
import { useContext } from "react";
import { DeviceContext } from "@/context/DeviceContext";
import { useLenisContext } from "@/context/LenisContext";

import styles from "./CoverMedia.module.css";

const CoverMedia = ({ medium }) => {
  if (!medium) return null;

  const { viewportHeight, viewportWidth } = useViewport();
  const { isMobile } = useContext(DeviceContext);
  const lenis = useLenisContext();

  const aspectRatio = medium.width / medium.height;

  const [scrollMax, setScrollMax] = useState(0);
  const [sliderValue, setSliderValue] = useState(0); // ← React owns this

  const rawScroll = useMotionValue(0);

  const scrollProgress = useSpring(rawScroll, {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
  });

  const x = useTransform(scrollProgress, (v) => -v);
  const pageScroll = useMotionValue(0);
  const fadeOutDistance = Math.max(1, viewportHeight * 0.5);
  const opacity = useTransform(pageScroll, [0, fadeOutDistance], [1, 0]);

  // calculate bounds
  useEffect(() => {
    const max = Math.max(0, viewportHeight * aspectRatio - viewportWidth);
    setScrollMax(max);
    setSliderValue(max / 2);
    rawScroll.set(max / 2);
  }, [viewportHeight, viewportWidth, aspectRatio]);

  // keep MotionValue in sync with slider
  // useEffect(() => {
  //   rawScroll.set(sliderValue);
  // }, [sliderValue]);

  useEffect(() => {
    const max = Math.max(0, viewportHeight * aspectRatio - viewportWidth);
    setScrollMax(max);
    const center = max / 2;
    setSliderValue(center);
    rawScroll.set(center); // initial set only
  }, [viewportHeight, viewportWidth, aspectRatio]);

  useEffect(() => {
    if (lenis) {
      const onScroll = ({ scroll }) => {
        pageScroll.set(scroll);
      };

      pageScroll.set(lenis.scroll ?? 0);
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }

    const onWindowScroll = () => pageScroll.set(window.scrollY || 0);
    onWindowScroll();
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [lenis, pageScroll]);

  return (
    <motion.div className={styles.coverMedia} style={{ opacity }}>
      <motion.div
        className={styles.coverMedia_inner}
        style={{
          height: "100%",
          width: viewportHeight * aspectRatio,
          x: x,
        }}
      >
        <Media medium={medium} />
      </motion.div>

      {isMobile && (
        <input
          type="range"
          min={0}
          max={scrollMax}
          step={0.01}
          value={sliderValue}
          // onChange={(e) => setSliderValue(parseFloat(e.target.value))}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setSliderValue(val);
            rawScroll.set(val); // drive the spring
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className={styles.coverMedia_slider}
        />
      )}
    </motion.div>
  );
};

export default CoverMedia;
