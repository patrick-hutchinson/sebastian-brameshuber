import styles from "../FilmPage.module.css";

const FilmFestivals = ({ film }) => {
  if (!film.festivals || film.festivals.length === 0) return undefined;

  return (
    <div className={styles.filmFestivals} typo="fineprint">
      <div className={styles.filmFestivalTitle}>Festivals</div>
      {film.festivals?.map((festival, index) => (
        <div key={index}>{festival}</div>
      ))}
    </div>
  );
};

export default FilmFestivals;
