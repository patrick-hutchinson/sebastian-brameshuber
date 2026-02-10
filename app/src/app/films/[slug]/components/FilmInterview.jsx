import Interview from "@/components/Text/Interview/Interview";

import styles from "../FilmPage.module.css";

const FilmInterview = ({ film }) => {
  if (!film.interview) return undefined;

  const interview = film.interview;
  return (
    <div className={styles.filmInterview}>
      <div typo="display" className={styles.interviewHeading}>
        <div className={styles.interviewTitle}>{interview.title}</div>
        <div className={styles.interviewSubtitle}>{interview.subtitle}</div>
      </div>
      <Interview className={styles.interviewText} text={film.interview.interviewText} />
    </div>
  );
};

export default FilmInterview;
