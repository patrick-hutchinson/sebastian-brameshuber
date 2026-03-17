import { useLayoutEffect, useState, useRef } from "react";

import Interview from "@/components/Text/Interview/Interview";

import styles from "../FilmPage.module.css";

const FilmInterviews = ({ film }) => {
  if (!film.interviews || film.interviews.length === 0) return undefined;

  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    setHeight(contentRef.current.scrollHeight);
  }, [film]);

  return (
    <div className={styles.filmInterviews}>
      {film.interviews.map((interview) => (
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

          {height > 305 && (
            <button
              typo="fineprint"
              style={{ paddingTop: "var(--margin-3)" }}
              className={styles.readMore}
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilmInterviews;
