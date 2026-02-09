import Text from "@/components/Text/Text";
import Section from "@/components/Structure/Section";

import styles from "./AboutPage.module.css";

const AboutPage = ({ about }) => {
  return (
    <div>
      <Section>
        <Text text={about.aboutText} className={styles.aboutText} typo="longcopy" />
      </Section>
    </div>
  );
};

export default AboutPage;
