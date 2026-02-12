import { useState, useRef, useEffect, useLayoutEffect } from "react";

import Text from "@/components/Text/Text";

import styles from "../../FilmPage.module.css";

const FilmCommentItem = ({ comment }) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    setHeight(contentRef.current.scrollHeight);
  }, [comment]);

  return (
    <div key={comment._id} className={styles.filmComment}>
      <Text text={comment.title} />
      <div
        ref={contentRef}
        className={styles.textWrapper}
        style={{
          overflow: "hidden",
          maxHeight: expanded ? height : 305,
          transition: "max-height 0.5s ease",
        }}
      >
        <Text text={comment.text} className={styles.text} />
      </div>
      <div className={styles.commentInformation} typo="fineprint">
        <div className={styles.CommentSource}>
          <div>{comment.source}</div>
          <div>{comment.author}</div>
        </div>
        <button className={styles.readMore} onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default FilmCommentItem;
