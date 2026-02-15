// context/LenisContext.js
"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";

const LenisContext = createContext(null);

export const useLenisContext = () => useContext(LenisContext);

export default function LenisProvider({ children }) {
  const lenis = useLenis(); // hook provided by ReactLenis
  const pathname = usePathname();

  const infiniteRoutes = ["/", "/enter"];
  const scrollInfinite = infiniteRoutes.includes(pathname);

  return (
    <ReactLenis root options={{ infinite: scrollInfinite, syncTouch: true }}>
      <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
    </ReactLenis>
  );
}
