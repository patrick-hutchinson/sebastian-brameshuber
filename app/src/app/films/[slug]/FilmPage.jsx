"use client";

import { loadNextFilm } from "./utils/loadNextFilm";

import Media from "@/components/Media/Media";
import Text from "@/components/Text/Text";
import Section from "@/components/Structure/Section";
import AnimationLink from "@/components/Animation/AnimationLink";
import Screening from "@/components/Screenings/Screening";
import Interview from "@/components/Text/Interview/Interview";

import styles from "./FilmPage.module.css";
import Carousel from "@/components/Carousel/Carousel";
import ScreeningContainer from "@/components/Screenings/ScreeningConainer";

const FilmPage = ({ films, film }) => {
  console.log(film, "film");

  const CoverMedia = () => {
    if (!film.coverMedia) return undefined;

    return (
      <div className={styles.coverMedia}>
        <Media medium={film.coverMedia.medium} />
      </div>
    );
  };

  const FilmCredits = () => {
    if (!film.credits) return undefined;

    return (
      <div className={styles.filmCredits} typo="fineprint">
        {film.credits.map((credit) => (
          <div key={credit._id} className={styles.filmCredit}>
            <div className={styles.role}>{credit.role}</div>
            <div className={styles.people}>
              {credit.people.map((person) => (
                <div key={person._id}>{person}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const FilmComments = () => {
    if (!film.comments) return undefined;

    return (
      <div className={styles.filmComments} typo="longcopy">
        {film.comments?.map((comment) => (
          <div key={comment._id} className={styles.filmComment}>
            <Text text={comment.title} />
            <Text text={comment.text} className={styles.text} />
            <div className={styles.commentInformation} typo="fineprint">
              <div className={styles.CommentSource}>
                <div>{comment.source}</div>
                <div>{comment.author}</div>
              </div>
              <div className={styles.readMore}>
                <AnimationLink link={comment.link}>Read More</AnimationLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const FilmSupportingMedia = () => {
    if (!film.supportingMedia) return undefined;

    return (
      <div className={styles.filmSupportingMedia}>
        {film.supportingMedia.map((item) => (
          <Media key={item._id} medium={item.medium} />
        ))}
      </div>
    );
  };

  const FilmInterview = () => {
    if (!film.interview) return undefined;

    const interview = film.interview;
    return (
      <div className={styles.filmInterview}>
        <div typo="display" className={styles.interviewHeading}>
          <div className={styles.interviewTitle}>{interview.title}</div>
          <div className={styles.interviewSubtitle}>{interview.subtitle}</div>
        </div>
        <Interview className={styles.interviewText} text={film.interview.interviewText} />
      </div>
    );
  };

  const FilmReviews = () => {
    if (!film.reviews) return undefined;

    return (
      <div className={styles.filmReviews} typo="fineprint">
        {film.reviews.map((review) => (
          <div key={review._id} className={styles.filmReview}>
            <Text text={review.text} />
            <div className={styles.filmReview_credit}>{`${review.author}, ${review.publication}`}</div>
          </div>
        ))}
      </div>
    );
  };

  const FilmScreenings = () => {
    if (!film.screenings) return undefined;

    return (
      <ScreeningContainer>
        {film.screenings.map((screening) => (
          <Screening key={screening._id} screening={screening} />
        ))}
      </ScreeningContainer>
    );
  };

  const LoadNextFilm = () => {
    return (
      <AnimationLink path={loadNextFilm(films, film)}>
        <div className={styles.loadNext} typo="display">
          Load Next
        </div>
      </AnimationLink>
    );
  };

  return (
    <div>
      <Section>
        <CoverMedia />
        <Text className={styles.filmTitle} typo="display" text={film.fullTitle ?? film.title} />
        <Text className={styles.filmDescription} typo="display" text={film.description} />
      </Section>

      <Section>
        <FilmCredits />
      </Section>

      <div className={`${styles.sectionWrapper} ${styles.commentsAndMedia}`}>
        <Section>
          <FilmComments />
        </Section>

        <Section>
          <FilmSupportingMedia />
        </Section>
      </div>

      <Section>
        <Carousel array={film.gallery} />
      </Section>

      <div className={`${styles.sectionWrapper} ${styles.interviewAndReviews}`}>
        <Section>
          <FilmInterview />
        </Section>

        <Section>
          <FilmReviews />
        </Section>
      </div>

      <Section>
        <FilmScreenings />
      </Section>

      <LoadNextFilm />
    </div>
  );
};

export default FilmPage;
