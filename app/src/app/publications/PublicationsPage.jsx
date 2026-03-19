import PublicationDisplay from "./components/PublicationDisplay";
import Section from "@/components/Structure/Section";

import styles from "./PublicationsPage.module.css";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const PublicationsPage = ({ publications }) => {
  const sortedPublications = [...publications].sort((a, b) => {
    const aDate = a?.releaseDate ? new Date(a.releaseDate).getTime() : Number.NEGATIVE_INFINITY;
    const bDate = b?.releaseDate ? new Date(b.releaseDate).getTime() : Number.NEGATIVE_INFINITY;
    return bDate - aDate; // newest first
  });

  return (
    <main>
      <Section>
        <div className={styles.publicationsContainer}>
          {sortedPublications.map((publication, index) => {
            return <PublicationDisplay key={publication._id ?? publication._key ?? index} publication={publication} />;
          })}
        </div>
      </Section>
    </main>
  );
};

export default PublicationsPage;
