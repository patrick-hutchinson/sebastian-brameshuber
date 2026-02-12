import { useState, useRef, useEffect } from "react";

import FilmCommentItem from "./FilmCommentItem";

import styles from "../../FilmPage.module.css";

const FilmComments = ({ film }) => {
  if (!film.comments) return undefined;

  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    setContainerHeight(containerRef.current.getBoundingClientRect().height);
  }, []);

  return (
    <div
      className={styles.filmComments}
      typo="longcopy"
      style={{ position: "sticky", top: `calc(50% - ${containerHeight / 2}px)` }}
    >
      {film.comments?.map((comment) => (
        <FilmCommentItem comment={comment} />
      ))}
    </div>
  );
};

export default FilmComments;
