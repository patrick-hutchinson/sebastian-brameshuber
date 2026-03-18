"use client";

import { useRef, useState } from "react";

import AnimationLink from "@/components/Animation/AnimationLink";
import Media from "@/components/Media/Media";
import { useLenisContext } from "@/context/LenisContext";

import PublicationText from "./components/PublicationText";

import styles from "./PublicationDisplay.module.css";
import AdaptiveMediaContainer from "@/components/AdaptiveMediaContainer/AdaptiveMediaContainer";

const PublicationDisplay = ({ publication }) => {
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const lenis = useLenisContext();
  const publicationRef = useRef(null);
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const hasExcerpts = Array.isArray(publication.excerpts) && publication.excerpts.length > 0;
  const hasLink = publication.link && !hasExcerpts;
  const Wrapper = hasLink ? AnimationLink : "div";
  const wrapperProps = hasLink ? { link: publication.link } : {};

  const handleToggle = () => {
    if (!hasExcerpts) return;

    if (expanded && publicationRef.current && lenis) {
      lenis.scrollTo(publicationRef.current, {
        offset: -8,
        duration: 0.6,
        easing: easeInOut,
        lock: true,
        onComplete: () => setExpanded(false),
      });
      return;
    }

    setExpanded((prev) => !prev);
  };

  return (
    <Wrapper {...wrapperProps}>
      <div
        ref={publicationRef}
        className={`${styles.publicationDisplay} ${hasExcerpts ? styles.publicationDisplayExpandable : ""}`}
        typo="longcopy"
        onClick={handleToggle}
      >
        <div className={styles.publicationTitle}>{publication.title}</div>
        {publication.media?.medium && (
          <div className={styles.publicationMediaContainer} ref={containerRef}>
            <AdaptiveMediaContainer container={containerRef} medium={publication.media?.medium}>
              <Media medium={publication.media?.medium} className={styles.publicationMedia} />
            </AdaptiveMediaContainer>
          </div>
        )}
        <PublicationText publication={publication} expanded={expanded} />
      </div>
    </Wrapper>
  );
};

export default PublicationDisplay;
