import FilmCommentItem from "./FilmCommentItem";

import styles from "../../FilmPage.module.css";

const FilmComments = ({ film }) => {
  if (!film.comments) return undefined;

  return (
    <div className={styles.filmComments} typo="longcopy">
      {film.comments?.map((comment) => (
        <FilmCommentItem comment={comment} />
      ))}
    </div>
  );
};

export default FilmComments;
