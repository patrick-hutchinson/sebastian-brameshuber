import styles from "../FilmPage.module.css";

const FilmCredits = ({ film }) => {
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

export default FilmCredits;
