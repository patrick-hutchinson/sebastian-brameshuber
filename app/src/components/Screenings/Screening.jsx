"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import AnimationLink from "../Animation/AnimationLink";

import ScreeningDate from "@/components/Screenings/components/ScreeningDate";

import styles from "./Screening.module.css";

const Screening = ({ screening }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const firstScreening = screening.showtimes[0];
  const extraScreenings = screening.showtimes.slice(1);

  const ScreeningFestival = () => {
    if (!screening.festival) return;

    return <span>, {screening.festival}</span>;
  };

  const ScreeningLocation = () => {
    if (!screening.location) return;

    return (
      <span className={styles.location}>
        , {screening.location.city && <span>{screening.location.city}, </span>}
        {screening.location.country && <span>{screening.location.country}</span>}
      </span>
    );
  };

  const ScreeningAnnotation = () => {
    if (!screening.annotation) return;

    return <span>, {screening.annotation}</span>;
  };

  return (
    <motion.div ref={containerRef} style={{ height: "fit-content", width: "100%", overflow: "hidden" }}>
      <motion.div
        initial={{ y: "120%" }}
        animate={isInView ? { y: 0 } : { y: "120%" }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <AnimationLink link={screening.link}>
          <div className={styles.screening} typo="h4">
            <div className={styles.screeningHeader}>
              <span className={styles.filmTitle}>{screening.film?.title}</span>
              <ScreeningFestival />
              <ScreeningAnnotation />
              <ScreeningLocation />
            </div>
            <div className={styles.screeningBody} typo="h2">
              <ScreeningDate date={firstScreening?.screeningDate} />
              {firstScreening?.cinema || firstScreening?.festival
                ? `, ${firstScreening.cinema ?? firstScreening.festival}`
                : null}
            </div>
          </div>
        </AnimationLink>

        {extraScreenings?.map((showtime) => {
          const resolvedLink = showtime.link ?? screening.link;
          const Wrapper = resolvedLink ? AnimationLink : "div";

          return (
            <Wrapper key={showtime._id} {...(resolvedLink ? { link: resolvedLink } : {})}>
              <div className={styles.screening}>
                <div className={styles.screeningBody} typo="h2">
                  <ScreeningDate date={showtime.screeningDate} />
                  {showtime.cinema || showtime.festival ? `, ${showtime.cinema ?? showtime.festival}` : null}
                </div>
              </div>
            </Wrapper>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Screening;
