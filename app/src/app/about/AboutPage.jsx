import Text from "@/components/Text/Text";
import Section from "@/components/Structure/Section";

import styles from "./AboutPage.module.css";

const AboutPage = ({ about }) => {
  const FeaturedScreenings = ({ featuredScreenings }) => {
    if (!featuredScreenings || featuredScreenings.length === 0) return null;

    const groupByFilm = (screenings) => {
      return screenings.reduce((acc, screening) => {
        const filmTitle = screening.film?.fullTitle ?? screening.film?.title;
        if (!acc[filmTitle]) acc[filmTitle] = [];
        acc[filmTitle].push({
          festival: screening.festival,
          cinema: screening.cinema,
        });
        return acc;
      }, {});
    };

    const screeningsByFilm = groupByFilm(featuredScreenings);

    return (
      <ul typo="longcopy">
        {Object.entries(screeningsByFilm)
          .sort(([a], [b]) => a.localeCompare(b)) // optional: sort film titles
          .map(([filmTitle, screenings]) => (
            <li key={filmTitle}>
              <div className={styles.filmTitle}>{filmTitle}</div>
              <div>
                Festivals (selection):
                {screenings.map((s, idx) => (
                  <span key={idx}>{s.festival && s.cinema}</span>
                ))}
              </div>
            </li>
          ))}
      </ul>
    );
  };

  const Awards = ({ awards }) => {
    if (!awards || awards.length === 0) return null;

    const groupAwards = (awards) => {
      // Returns an object grouped by year -> film -> array of awards
      return awards.reduce((acc, award) => {
        const year = award.year ?? "Unknown Year";
        const filmTitle = award.film?.fullTitle ?? award.film?.title;

        if (!acc[year]) acc[year] = {};
        if (!acc[year][filmTitle]) acc[year][filmTitle] = [];

        acc[year][filmTitle].push(award);
        return acc;
      }, {});
    };

    const grouped = groupAwards(awards);

    // Sort years descending (latest first)
    const sortedYears = Object.keys(grouped).sort((a, b) => b - a);

    return (
      <ul className={styles.awards} typo="longcopy">
        {sortedYears.map((year) => {
          const films = grouped[year];
          // Sort film titles alphabetically
          const sortedFilmTitles = Object.keys(films).sort((a, b) => a.localeCompare(b));

          return (
            <li key={year} className={styles.awardYearContainer}>
              <div className={styles.awardYear}>{year}</div>
              <ul className={styles.awardFilmContainer}>
                {sortedFilmTitles.map((filmTitle) => (
                  <li key={filmTitle} className={styles.awardFilm}>
                    <div className={styles.filmTitle}>{filmTitle}</div>
                    <ul>
                      {films[filmTitle].map((awardItem, idx) => (
                        <li key={idx} className={styles.award}>
                          {awardItem.award}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <main className={styles.aboutPage}>
      <Section className={styles.aboutText}>
        <Text text={about.aboutText} typo="longcopy" />
      </Section>
      <div className={styles.sectionWrapper}>
        <Section className={styles.featuredScreenings}>
          <FeaturedScreenings featuredScreenings={about.featuredScreenings} />
        </Section>
        <Section>
          <Awards awards={about.awards} />
        </Section>
      </div>
    </main>
  );
};

export default AboutPage;
