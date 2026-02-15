"use client";

import { useEffect, useRef } from "react";

import FilmSlide from "./components/FilmSlide";

import styles from "./HomePage.module.css";

const HomePage = ({ films }) => {
  const array = [
    { background: "#f00" },
    { background: "#ff0" },
    { background: "#0f0" },
    { background: "#f0f" },
    { background: "#0ff" },
    { background: "#fff" },
    { background: "#00f" },
    { background: "#f00" },
  ];

  const duplicatedArray = [...array, ...array];

  return (
    <div>
      {array.map((film, index) => (
        <FilmSlide key={film._id} film={film} index={index} />
      ))}
    </div>
  );
};

export default HomePage;
