import { useRef, useLayoutEffect } from "react";

export function useHeaderHeight() {
  const headerHeight = useRef(0);

  useLayoutEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const update = () => {
      headerHeight.current = header.getBoundingClientRect().height;
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  return headerHeight;
}
