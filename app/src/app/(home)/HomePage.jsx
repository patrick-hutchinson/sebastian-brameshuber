"use client";

import { useEffect, useRef } from "react";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";

const HomePage = ({ films }) => {
  return (
    <div>
      {films.map((film, index) => (
        <FilmSlide key={film._id} film={film} index={index} />
      ))}
    </div>
  );
};

export default HomePage;
