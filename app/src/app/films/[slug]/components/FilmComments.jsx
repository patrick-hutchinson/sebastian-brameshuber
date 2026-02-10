import Text from "@/components/Text/Text";
import AnimationLink from "@/components/Animation/AnimationLink";

import styles from "../FilmPage.module.css";

const FilmComments = ({ film }) => {
  if (!film.comments) return undefined;

  return (
    <div className={styles.filmComments} typo="longcopy">
      {film.comments?.map((comment) => (
        <div key={comment._id} className={styles.filmComment}>
          <Text text={comment.title} />
          <Text text={comment.text} className={styles.text} />
          <div className={styles.commentInformation} typo="fineprint">
            <div className={styles.CommentSource}>
              <div>{comment.source}</div>
              <div>{comment.author}</div>
            </div>
            <div className={styles.readMore}>
              <AnimationLink link={comment.link}>Read More</AnimationLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilmComments;
