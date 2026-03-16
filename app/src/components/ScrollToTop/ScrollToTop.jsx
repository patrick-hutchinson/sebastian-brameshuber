"use client";

import { DeviceContext } from "@/context/DeviceContext";
import { useLenisContext } from "@/context/LenisContext";
import { useContext, useEffect, useState } from "react";
import { useViewport } from "../../context/ViewportContext";

const ScrollToTop = () => {
  const { viewportHeight } = useViewport();
  const lenis = useLenisContext();
  const { isMobile, isTouch, isDesktop } = useContext(DeviceContext);
  const [scrollHeight, setScrollHeight] = useState(null);
  const [pageIsOverflowing, setPageIsOverflowing] = useState(false);

  useEffect(() => {
    const updateOverflow = () => {
      const height = viewportHeight;
      const scroll = document.querySelector("main")?.scrollHeight ?? 0;
      setScrollHeight(scroll);
      setPageIsOverflowing(scroll > height);
    };

    updateOverflow();
    window.addEventListener("resize", updateOverflow);
    return () => window.removeEventListener("resize", updateOverflow);
  }, []);

  const handleClick = () => {
    const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const rawDuration = scrollHeight / 2000;
    const duration = Math.min(Math.max(rawDuration, 1), 3); // clamp between 1 and 3 seconds

    lenis?.scrollTo(0, { duration, easing: easeInOut });
  };

  // if (!isMobile) return;
  if (!pageIsOverflowing || isDesktop) return;

  return (
    <div
      className="scrollToTop"
      typo="display"
      onClick={() => handleClick()}
      style={{ textAlign: "center", width: "100%", margin: "var(--margin-2) 0" }}
    >
      <button>Scroll to Top</button>
    </div>
  );
};

export default ScrollToTop;
