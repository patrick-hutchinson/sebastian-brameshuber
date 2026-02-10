import { useRef, useContext, useEffect, useState } from "react";

import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";

import { DeviceContext } from "@/context/DeviceContext";

import Media from "@/components/Media/Media";

const ImagePreview = ({ medium, isHovering }) => {
  const { isTouch } = useContext(DeviceContext);

  const [isScrolling, setIsScrolling] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const imageRef = useRef(null);
  const scrollPosition = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => setIsMounted(true), []);

  // Track the scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollPosition.current = window.scrollY;
      setIsScrolling(true);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current); // Clear the previous timeout
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Set new timeout to detect scroll end
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!isHovering) return;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [isHovering]);

  if (isTouch || !isMounted) return;

  return createPortal(
    <AnimatePresence>
      {isHovering && !isScrolling && (
        <motion.div
          key={medium._id}
          ref={imageRef}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            position: "fixed",
            x,
            y,
            top: "var(--margin-page)",
            left: "var(--margin-page)",
            width: "clamp(200px, 10vw, 500px)",
            height: "auto",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <Media medium={medium} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("portal"),
  );
};

export default ImagePreview;
