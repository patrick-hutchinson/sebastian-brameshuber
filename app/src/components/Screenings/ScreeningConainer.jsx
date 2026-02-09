"use client";

import { motion } from "framer-motion";

import styles from "./Screening.module.css";

const ScreeningContainer = ({ children }) => {
  return (
    <motion.div layout className={styles.screeningContainer}>
      {children}
    </motion.div>
  );
};

export default ScreeningContainer;
