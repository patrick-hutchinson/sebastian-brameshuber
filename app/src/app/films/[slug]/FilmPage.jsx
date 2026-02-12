"use client";

import Text from "@/components/Text/Text";
import Section from "@/components/Structure/Section";
import Footer from "@/components/Footer/Footer";

import CoverMedia from "@/components/CoverMedia/CoverMedia";

import FilmGallery from "./components/FilmGallery";
import FilmComments from "./components/FilmComments/FilmComments";
import FilmScreenings from "./components/FilmScreenings";
import FilmInterview from "./components/FilmInterview";
import FilmCredits from "./components/FilmCredits";
import FilmSupportingMedia from "./components/FilmSupportingMedia";
import FilmReviews from "./components/FilmReviews";
import LoadNextFilm from "./components/LoadNextFilm";

import styles from "./FilmPage.module.css";

const FilmPage = ({ site, films, film }) => {
  const ContentWrapper = ({ children }) => {
    return <div className={styles.contentWrapper}>{children}</div>;
  };

  return (
    <div>
      <CoverMedia medium={film.coverMedia.medium} />

      <ContentWrapper>
        <Section>
          <Text className={styles.filmTitle} typo="display" text={film.fullTitle ?? film.title} />
          <Text className={styles.filmDescription} typo="display" text={film.description} />
        </Section>

        <Section>
          <FilmCredits film={film} />
        </Section>

        <div className={`${styles.sectionWrapper} ${styles.commentsAndMedia}`}>
          <Section className={styles.filmComments_Section}>
            <FilmComments film={film} />
          </Section>
          <Section className={styles.filmSupportingMedia_Section}>
            <FilmSupportingMedia film={film} />
          </Section>
        </div>

        <Section>
          <FilmGallery film={film} />
        </Section>

        <div className={`${styles.sectionWrapper} ${styles.interviewAndReviews}`}>
          <Section className={styles.filmInterview_Section}>
            <FilmInterview film={film} />
          </Section>

          <Section className={styles.filmReview_Section}>
            <FilmReviews film={film} />
          </Section>
        </div>

        <Section>
          <FilmScreenings film={film} />
        </Section>

        <LoadNextFilm />

        <Footer site={site} />
      </ContentWrapper>
    </div>
  );
};

export default FilmPage;
