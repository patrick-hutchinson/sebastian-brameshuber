import { useStickyPositioning } from "@/components/Media/hooks/useStickyPositioning";

import Text from "@/components/Text/Text";

import styles from "../FilmPage.module.css";

const FilmReviews = ({ film }) => {
  if (!film.reviews) return undefined;

  const { containerRef, top } = useStickyPositioning();

  return (
    <div className={styles.filmReviews} typo="fineprint" ref={containerRef} style={{ top }}>
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
