import { useLayoutEffect, useState, useRef } from "react";

import Interview from "@/components/Text/Interview/Interview";
import Text from "@/components/Text/Text";

import styles from "../FilmPage.module.css";

const FilmInterviewItem = ({ interview }) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    setHeight(contentRef.current.scrollHeight);
  }, [interview]);

  return (
    <div className={styles.filmInterview}>
      <div typo="display" className={styles.interviewHeading}>
        <div className={styles.interviewTitle}>{interview.title}</div>
        <div className={styles.interviewSubtitle}>{interview.subtitle}</div>
      </div>

      <div
        ref={contentRef}
        className={styles.textWrapper}
        style={{
          overflow: "hidden",
          maxHeight: expanded ? height : 915,
          transition: "max-height 0.5s ease",
        }}
      >
        <Interview className={styles.interviewText} text={interview.interviewText} />
      </div>

      <div className={styles.interviewInformation} typo="fineprint">
        <div className={styles.interviewSource}>
          <Text text={interview.source} />
        </div>

        {height > 915 && (
          <button typo="fineprint" className={styles.readMore} onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

const FilmInterviews = ({ film }) => {
  if (!film.interviews || film.interviews.length === 0) return undefined;

  return (
    <div className={styles.filmInterviews}>
      {film.interviews.map((interview, index) => (
        <FilmInterviewItem key={interview._id ?? interview._key ?? index} interview={interview} />
      ))}
    </div>
  );
};

export default FilmInterviews;
