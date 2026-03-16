"use client";

import { useContext, useState } from "react";

import { motion } from "framer-motion";

import { DeviceContext } from "@/context/DeviceContext";

import Media from "@/components/Media/Media";
import Text from "@/components/Text/Text";

import ImagePreview from "@/components/ImagePreview/ImagePreview";
import AnimationLink from "@/components/Animation/AnimationLink";
import FormatDate from "@/components/FormatDate/FormatDate";
import SplitMask from "../../../../components/Animation/SplitMask";

import styles from "./NewsItem.module.css";

const NewsItem = ({ newsItem }) => {
  const { isTouch } = useContext(DeviceContext);

  const [isHovering, setIsHovering] = useState(false);
  const [isSplitArrived, setIsSplitArrived] = useState(false);

  const handleMouseEnter = () => {
    if (isTouch) return;
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    if (isTouch) return;
    setIsHovering(false);
  };

  const commonProps = {
    className: styles.newsItem,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  const hasLink = newsItem.link;
  const Wrapper = hasLink ? AnimationLink : "div";
  const wrapperProps = hasLink ? { link: newsItem.link, ...commonProps } : { ...commonProps };

  const NewsFooter = () => {
    // if (!newsItem.author || !newsItem.publication || !newsItem.film.title) return;

    return (
      <motion.div
        typo="fineprint"
        className={styles.newsFooter}
        initial={{ opacity: 0 }}
        animate={{ opacity: isSplitArrived ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className={styles.category}>{newsItem.newsCategory?.name}</div>

        <FormatDate date={newsItem.date} />

        {newsItem.author && newsItem.publication && newsItem.film.title && (
          <span className={styles.source}>
            {newsItem.author}, {newsItem.publication} on {newsItem.film.title}
          </span>
        )}
      </motion.div>
    );
  };

  return (
    <SplitMask onArrive={() => setIsSplitArrived(true)}>
      <Wrapper {...wrapperProps}>
        <div className={styles.newsHeadline} typo="display">
          <Text text={newsItem.text} className={styles.clamp} />
        </div>
        {isTouch && <Media medium={newsItem.previewMedia.medium} className={styles.previewMedia} />}

        <NewsFooter />

        {newsItem.previewMedia?.medium && <ImagePreview medium={newsItem.previewMedia.medium} isHovering={isHovering} />}
      </Wrapper>
    </SplitMask>
  );
};

export default NewsItem;
