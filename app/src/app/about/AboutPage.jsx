"use client";

import Text from "@/components/Text/Text";
import Section from "@/components/Structure/Section";

import styles from "./AboutPage.module.css";

import FeaturedAwards from "./components/FeaturedAwards";
import FeaturedScreenings from "./components/FeaturedScreenings";

const AboutPage = ({ about }) => {
  return (
    <main className={styles.aboutPage}>
      <Section className={styles.aboutText}>
        <div typo="longcopy">Biography</div>
        <Text text={about.aboutText} typo="longcopy" />
      </Section>
      <div className={styles.sectionWrapper}>
        <Section className={styles.featuredScreenings}>
          <FeaturedScreenings featuredScreenings={about.featuredScreenings} />
        </Section>
        <Section>
          <FeaturedAwards awards={about.awards} />
        </Section>
      </div>
    </main>
  );
};

export default AboutPage;
