import { useState, useRef, useEffect } from "react";

import Text from "@/components/Text/Text";

import styles from "../FilmPage.module.css";

const FilmReviews = ({ film }) => {
  if (!film.reviews) return undefined;

  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    setContainerHeight(containerRef.current.getBoundingClientRect().height);
  }, []);

  return (
    <div
      className={styles.filmReviews}
      typo="fineprint"
      ref={containerRef}
      style={{ top: `calc(50% - ${containerHeight / 2}px)` }}
    >
      {film.reviews.map((review) => (
        <div key={review._id} className={styles.filmReview}>
          <Text text={review.text} />
          <div className={styles.filmReview_credit}>{`${review.author}, ${review.publication}`}</div>
        </div>
      ))}
    </div>
  );
};

export default FilmReviews;
