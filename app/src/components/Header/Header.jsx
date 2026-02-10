"use client";

import AnimationLink from "../Animation/AnimationLink";
import styles from "./Header.module.css";

const Header = ({}) => {
  return (
    <header className={styles.header} typo="fineprint">
      <AnimationLink path="/films">Films</AnimationLink>
      <AnimationLink path="/news">News</AnimationLink>
      <AnimationLink path="/about">About</AnimationLink>
      <AnimationLink path="/screenings">Screenings</AnimationLink>
      <AnimationLink path="/publications">Publications</AnimationLink>

      <AnimationLink path="/contact">Contact</AnimationLink>
    </header>
  );
};

export default Header;
