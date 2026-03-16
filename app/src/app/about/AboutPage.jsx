"use client";

import Text from "@/components/Text/Text";
import Section from "@/components/Structure/Section";

import styles from "./AboutPage.module.css";

import FeaturedAwards from "./components/FeaturedAwards";
import FeaturedScreenings from "./components/FeaturedScreenings";
import Teaching from "./components/Teaching";

const AboutPage = ({ about }) => {
  return (
    <main className={styles.aboutPage}>
      <Section className={styles.aboutText}>
        <div typo="longcopy">Biography</div>
        <Text text={about.aboutText} typo="longcopy" />
      </Section>
      <div className={styles.sectionWrapper}>
        <Section className={styles.featuredScreenings}>
          <div className={styles.featuredScreenings_Header} typo="longcopy">
            Filmography
          </div>
          <FeaturedScreenings featuredScreenings={about.featuredScreenings} />
        </Section>

        <Section>
          <FeaturedAwards awards={about.awards} />
        </Section>

        <Section className={styles.teachingSection}>
          <div typo="longcopy" className={styles.teachingSection_Header}>
            Teaching
          </div>
          <Teaching teaching={about.teaching} />
        </Section>
      </div>
    </main>
  );
};

export default AboutPage;
