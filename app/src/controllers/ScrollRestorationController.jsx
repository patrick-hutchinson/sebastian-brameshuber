"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestorationController() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/enter") return; // Only reset scroll at home

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return null; // this component doesn’t render anything
}
