import Media from "@/components/Media/Media";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useViewport } from "@/context/ViewportContext";
import { useContext } from "react";
import { DeviceContext } from "@/context/DeviceContext";

import styles from "./CoverMedia.module.css";

const CoverMedia = ({ medium }) => {
  if (!medium) return null;
  const SWIPE_SENSITIVITY = 2;

  const { viewportHeight, viewportWidth } = useViewport();
  const { isMobile } = useContext(DeviceContext);

  const aspectRatio = medium.width / medium.height;

  const [scrollMax, setScrollMax] = useState(0);
  const [sliderValue, setSliderValue] = useState(0); // ← React owns this

  const rawScroll = useMotionValue(0);
  const touchState = useRef({ startX: 0, startY: 0, startValue: 0 });

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

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    const touch = e.touches?.[0];
    if (!touch) return;

    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startValue: sliderValue,
    };
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    const touch = e.touches?.[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchState.current.startX;
    const deltaY = touch.clientY - touchState.current.startY;

    // Only hijack clearly horizontal swipes; let vertical gestures pass through.
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

    e.preventDefault();
    const nextValue = clamp(touchState.current.startValue - deltaX * SWIPE_SENSITIVITY, 0, scrollMax);
    setSliderValue(nextValue);
    rawScroll.set(nextValue);
  };

  return (
    <motion.div className={styles.coverMedia} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
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
    </motion.div>
  );
};

export default CoverMedia;
