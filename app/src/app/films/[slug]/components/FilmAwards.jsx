import styles from "../FilmPage.module.css";

const FilmAwards = ({ film }) => {
  let awards = film.awards;

  if (!awards || awards.length === 0) return undefined;

  return (
    <div className={styles.filmAwards} typo="fineprint">
      <div className={styles.filmAwardTitle}>Awards</div>

      {awards.map((award, index) => (
        <div key={`${index}`}>{award}</div>
      ))}
    </div>
  );
};

export default FilmAwards;
