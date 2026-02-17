"use client";

import { useRef } from "react";

import Media from "@/components/Media/Media";
import Text from "@/components/Text/Text";

import styles from "./PublicationDisplay.module.css";
import AdaptiveMediaContainer from "@/components/AdaptiveMediaContainer/AdaptiveMediaContainer";

const PublicationDisplay = ({ publication }) => {
  const containerRef = useRef(null);
  return (
    <div className={styles.publicationDisplay} typo="longcopy">
      <div className={styles.publicationTitle}>{publication.title}</div>
      <div className={styles.publicationMediaContainer} ref={containerRef}>
        <AdaptiveMediaContainer container={containerRef} medium={publication.media.medium}>
          <Media medium={publication.media.medium} className={styles.publicationMedia} />
        </AdaptiveMediaContainer>
      </div>
      <Text text={publication.text} />
    </div>
  );
};

export default PublicationDisplay;
