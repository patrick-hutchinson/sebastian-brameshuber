"use client";

import { useContext, useRef, useState } from "react";

import { motion, useInView } from "framer-motion";

import { DeviceContext } from "@/context/DeviceContext";

import Media from "@/components/Media/Media";
import Text from "@/components/Text/Text";

import ImagePreview from "@/components/ImagePreview/ImagePreview";
import AnimationLink from "@/components/Animation/AnimationLink";
import FormatDate from "@/components/FormatDate/FormatDate";

import styles from "./NewsItem.module.css";

const NewsItem = ({ newsItem, staggerIndex = 0 }) => {
  const { isTouch } = useContext(DeviceContext);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const staggerDelay = Math.min(staggerIndex * 0.06, 0.6);

  const [isHovering, setIsHovering] = useState(false);

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
      <motion.div typo="fineprint" className={styles.newsFooter}>
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
    <motion.div ref={containerRef} style={{ height: "fit-content", width: "100%", overflow: "hidden" }}>
      <motion.div
        initial={{ y: "120%" }}
        animate={isInView ? { y: 0 } : { y: "120%" }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], delay: staggerDelay }}
      >
        <Wrapper {...wrapperProps}>
          <NewsFooter />

          <div className={styles.newsHeadline} typo="display">
            <Text text={newsItem.text} className={styles.clamp} />
          </div>
          {isTouch && newsItem.previewMedia?.medium && (
            <Media medium={newsItem.previewMedia?.medium} className={styles.previewMedia} />
          )}

          {newsItem.previewMedia?.medium && (
            <ImagePreview medium={newsItem.previewMedia.medium} isHovering={isHovering} />
          )}
        </Wrapper>
      </motion.div>
    </motion.div>
  );
};

export default NewsItem;
