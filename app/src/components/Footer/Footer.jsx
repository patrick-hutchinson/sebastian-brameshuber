"use client";

import AnimationLink from "../Animation/AnimationLink";

import styles from "./Footer.module.css";

const Footer = ({ site }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} typo="fineprint">
      <span className={styles.copyright}>{`${currentYear} ${site.title}`}</span>

      <div className={styles.footerLinks}>
        <AnimationLink path="terms">Terms of Use</AnimationLink>,{"\u00A0"}
        <AnimationLink path="imprint">Imprint</AnimationLink>
      </div>
    </footer>
  );
};

export default Footer;
