"use client";

import Text from "@/components/Text/Text";
import Section from "@/components/Structure/Section";

import styles from "./AboutPage.module.css";
import AnimationLink from "@/components/Animation/AnimationLink";

const AboutPage = ({ about }) => {
  const canLinkFilm = (film) => film?.showOnHomePage === true && Boolean(film?.slug?.current);

  const FeaturedScreenings = ({ featuredScreenings }) => {
    if (!featuredScreenings || featuredScreenings.length === 0) return null;

    return (
      <ul typo="longcopy">
        <div>Filmography</div>
        {featuredScreenings.map((screening, index) => (
          <li key={screening._key ?? screening._id ?? `${screening.film?.slug?.current ?? "screening"}-${index}`}>
            {canLinkFilm(screening.film) ? (
              <AnimationLink path={`/films/${screening.film.slug.current}`}>
                <div className={styles.filmTitle}>{screening.film?.fullTitle ?? screening.film?.title}</div>
              </AnimationLink>
            ) : (
              <div className={styles.filmTitle}>{screening.film?.fullTitle ?? screening.film?.title}</div>
            )}
            <Text text={screening.festivals} />
          </li>
        ))}
      </ul>
    );
  };

  const Awards = ({ awards }) => {
    if (!awards || awards.length === 0) return null;

    const groupAwards = (awards) => {
      // Returns an object grouped by year -> array of { film, items }
      return awards.reduce((acc, award) => {
        const year = award.year ?? "Unknown Year";
        const film = award.film ?? null;
        const filmKey = film?.slug?.current ?? film?.title ?? "untitled";

        if (!acc[year]) acc[year] = [];

        const existingFilmGroup = acc[year].find((entry) => {
          const entryKey = entry.film?.slug?.current ?? entry.film?.title ?? "untitled";
          return entryKey === filmKey;
        });

        if (existingFilmGroup) {
          existingFilmGroup.items.push(award);
        } else {
          acc[year].push({ film, items: [award] });
        }

        return acc;
      }, {});
    };

    const grouped = groupAwards(awards);

    // Sort years descending (latest first)
    const sortedYears = Object.keys(grouped).sort((a, b) => b - a);

    return (
      <ul className={styles.awards} typo="longcopy">
        {sortedYears.map((year) => {
          const films = grouped[year].sort((a, b) => (a.film?.title ?? "").localeCompare(b.film?.title ?? ""));

          return (
            <li key={year} className={styles.awardYearContainer}>
              <div className={styles.awardYear}>{year}</div>
              <ul className={styles.awardFilmContainer}>
                {films.map((filmEntry, filmIndex) => (
                  <li
                    key={`${filmEntry.film?.slug?.current ?? filmEntry.film?.title ?? "untitled"}-${filmIndex}`}
                    className={styles.awardFilm}
                  >
                    {canLinkFilm(filmEntry.film) ? (
                      <AnimationLink path={`/films/${filmEntry.film.slug.current}`}>
                        <div className={styles.filmTitle}>{filmEntry.film?.fullTitle ?? filmEntry.film?.title}</div>
                      </AnimationLink>
                    ) : (
                      <div className={styles.filmTitle}>{filmEntry.film?.fullTitle ?? filmEntry.film?.title}</div>
                    )}
                    <ul>
                      {filmEntry.items.map((awardItem, idx) => (
                        <>
                          <li key={idx} className={styles.award}>
                            {awardItem.award}
                          </li>
                          <br />
                        </>
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
        <div typo="longcopy">Biography</div>
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
