"use client";

import { useContext, useState } from "react";

import { DeviceContext } from "@/context/DeviceContext";

import Media from "@/components/Media/Media";
import Text from "@/components/Text/Text";

import styles from "./NewsItem.module.css";
import ImagePreview from "@/components/ImagePreview/ImagePreview";
import ScreeningDate from "@/components/Screenings/ScreeningDate";
import FormatDate from "@/components/FormatDate/FormatDate";

const NewsItem = ({ newsItem }) => {
  const { isTouch } = useContext(DeviceContext);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    if (isTouch) return;
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    if (isTouch) return;
    setIsHovering(false);
  };

  return (
    <div className={styles.newsItem} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}>
      <div className={styles.newsHeadline} typo="display">
        <FormatDate date={newsItem.date} />
        <Text text={newsItem.text} className={styles.clamp} />
      </div>
      {isTouch && <Media medium={newsItem.previewMedia.medium} className={styles.previewMedia} />}
      <div typo="fineprint" className={styles.newsFooter}>
        <div className={styles.category}>{newsItem.category}</div>

        <span className={styles.source}>
          {newsItem.author}, {newsItem.publication} on {newsItem.film.title}
        </span>
      </div>

      {newsItem.previewMedia?.medium && <ImagePreview medium={newsItem.previewMedia.medium} isHovering={isHovering} />}
    </div>
  );
};

export default NewsItem;
