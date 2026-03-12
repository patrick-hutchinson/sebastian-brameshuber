"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import AnimationLink from "../Animation/AnimationLink";

import SplitMask from "../Animation/SplitMask";

import ScreeningDate from "@/components/Screenings/components/ScreeningDate";

import styles from "./Screening.module.css";

const Screening = ({ screening }) => {
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
    <SplitMask>
      <motion.div>
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
    </SplitMask>
  );
};

export default Screening;
