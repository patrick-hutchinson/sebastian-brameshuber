import Media from "@/components/Media/Media";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useViewport } from "@/context/ViewportContext";
import { useContext } from "react";
import { DeviceContext } from "@/context/DeviceContext";

import styles from "./CoverMedia.module.css";

const CoverMedia = ({ medium }) => {
  if (!medium) return null;

  const { viewportHeight, viewportWidth } = useViewport();
  const { isMobile } = useContext(DeviceContext);

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

  // calculate bounds
  useEffect(() => {
    const max = Math.max(0, viewportHeight * aspectRatio - viewportWidth);
    setScrollMax(max);
    setSliderValue(max / 2);
    rawScroll.set(max / 2);
  }, [viewportHeight, viewportWidth, aspectRatio]);

  // keep MotionValue in sync with slider
  useEffect(() => {
    rawScroll.set(sliderValue);
  }, [sliderValue]);

  return (
    <div className={styles.coverMedia}>
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
          onChange={(e) => setSliderValue(parseFloat(e.target.value))}
          className={styles.coverMedia_slider}
        />
      )}
    </div>
  );
};

export default CoverMedia;
