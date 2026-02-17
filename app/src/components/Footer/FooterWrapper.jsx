"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";

const FooterWrapper = ({ site }) => {
  const pathname = usePathname();

  if (pathname === "/") return null;
  return <Footer site={site} />;
};

export default FooterWrapper;
