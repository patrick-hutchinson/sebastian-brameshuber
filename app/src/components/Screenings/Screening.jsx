"use client";

import ScreeningDate from "@/components/Screenings/ScreeningDate";
import styles from "./Screening.module.css";

import { motion } from "framer-motion";

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
        , {screening.location?.city && <span>{screening.location.city}, </span>}
        {screening.location?.country && <span>{screening.location.country}</span>}
      </span>
    );
  };

  const ScreeningAnnotation = () => {
    if (!screening.annotation) return;

    return <span>, {screening.annotation}</span>;
  };

  return (
    <motion.div layout>
      <div className={styles.screening} typo="h4">
        <div className={styles.screeningHeader}>
          {screening.film.title}
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
      {extraScreenings?.map((showtime) => {
        return (
          <div key={showtime._id} className={styles.screening}>
            <div className={styles.screeningBody} typo="h2">
              <ScreeningDate date={showtime.screeningDate} />
              {showtime.cinema || showtime.festival ? `, ${showtime.cinema ?? showtime.festival}` : null}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Screening;
