"use client";

import { useLenisContext } from "@/context/LenisContext";

const ScrollToTop = () => {
  const lenis = useLenisContext();

  const handleClick = () => {
    if (!lenis) return;
    lenis.scrollTo(0, { duration: 1, easing: (t) => t }); // scroll to top
  };

  return (
    <div typo="display" onClick={() => handleClick()}>
      <button>Scroll to Top</button>
    </div>
  );
};

export default ScrollToTop;
