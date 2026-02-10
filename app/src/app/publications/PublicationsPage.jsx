import PublicationDisplay from "./components/PublicationDisplay";
import Section from "@/components/Structure/Section";

import styles from "./PublicationsPage.module.css";

const PublicationsPage = ({ publications }) => {
  return (
    <main>
      <Section>
        <div className={styles.publicationsContainer}>
          {publications.map((publication) => {
            return <PublicationDisplay publication={publication} />;
          })}
        </div>
      </Section>
    </main>
  );
};

export default PublicationsPage;
