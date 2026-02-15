"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const SplitMask = ({ children }) => {
  const pathname = usePathname();

  const ease = [0.6, -0.05, 0.01, 0.99];

  const variants = {
    initial: { y: "102%", transition: { duration: 0.8, ease } },
    animate: { y: 0, transition: { duration: 0.8, ease } },
    exit: { y: "102%", transition: { duration: 0.8, ease } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} style={{ height: "fit-content", width: "fit-content", overflow: "hidden" }}>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          style={{ position: "relative", height: "fit-content", width: "fit-content" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplitMask;
