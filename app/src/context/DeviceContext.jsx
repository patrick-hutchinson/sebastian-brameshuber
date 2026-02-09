"use client";

import { createContext, useState, useEffect } from "react";

// Create the context
export const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [deviceDimensions, setDeviceDimensions] = useState({ width: 0, height: 0 });
  const [isSafari, setIsSafari] = useState(false);
  const [isTouch, setIsTouch] = useState(null); // ← NEW

  // Detect if the screen is mobile size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setIsMobile(width < 769);
      setIsTablet(width >= 769 && width < 1280);
      setIsDesktop(width >= 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const hasTouch =
      navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

    setIsTouch(hasTouch);
  }, []);

  useEffect(() => {
    const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(safari);
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        isMobile,
        isTablet,
        isDesktop,
        isSafari,
        isTouch,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
