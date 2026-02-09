"use client";

import AnimationLink from "../Animation/AnimationLink";
import styles from "./Header.module.css";

const Header = ({}) => {
  return (
    <header className={styles.header} typo="fineprint">
      <AnimationLink path="/films">Films</AnimationLink>
      <AnimationLink path="/screenings">Screenings</AnimationLink>
    </header>
  );
};

export default Header;
