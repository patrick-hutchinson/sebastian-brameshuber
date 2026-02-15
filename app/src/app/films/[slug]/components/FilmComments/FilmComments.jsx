import { useStickyPositioning } from "@/components/Media/hooks/useStickyPositioning";

import FilmCommentItem from "./FilmCommentItem";

import styles from "../../FilmPage.module.css";

const FilmComments = ({ film }) => {
  if (!film.comments) return undefined;

  const { containerRef, top } = useStickyPositioning();

  return (
    <div ref={containerRef} className={styles.filmComments} typo="longcopy" style={{ top }}>
      {film.comments?.map((comment) => (
        <FilmCommentItem comment={comment} />
      ))}
    </div>
  );
};

export default FilmComments;
