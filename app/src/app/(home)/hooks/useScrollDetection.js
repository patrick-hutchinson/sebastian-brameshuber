import { useEffect, useRef, useState } from "react";
import { useLenisContext } from "@/context/LenisContext";

export const useScrollDetection = () => {
  const lenis = useLenisContext();

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  // Track whether Lenis is scrolling
  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      setIsScrolling(true);

      // reset debounce
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 120); // feels good with Lenis
    };

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, [lenis]);

  return isScrolling;
};
