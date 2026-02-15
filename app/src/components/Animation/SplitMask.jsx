"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const SplitMask = () => {
  const pathname = usePathname();

  const ease = [0.6, -0.05, 0.01, 0.99];

  const variants = {
    initial: { y: "100%", transition: { duration: 0.8, ease } },
    animate: { y: 0, transition: { duration: 0.8, ease } },
    exit: { y: "100%", transition: { duration: 0.8, ease } },
  };

  return (
    <main>
      <AnimatePresence mode="wait">
        <motion.div key={pathname} style={{ height: "200px", width: "500px", overflow: "hidden" }}>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            style={{ position: "relative", height: "100%", width: "100%", background: "#fff" }}
          >
            Demo Page loaded
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default SplitMask;
