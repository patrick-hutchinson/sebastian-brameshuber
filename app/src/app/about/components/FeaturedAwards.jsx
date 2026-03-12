import styles from "../AboutPage.module.css";
import AnimationLink from "@/components/Animation/AnimationLink";

const FeaturedAwards = ({ awards }) => {
  if (!awards || awards.length === 0) return null;

  const canLinkFilm = (film) => film?.showOnHomePage === true && Boolean(film?.slug?.current);

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

export default FeaturedAwards;
