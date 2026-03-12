import { loadNextFilm } from "../utils/loadNextFilm";

import AnimationLink from "@/components/Animation/AnimationLink";

import styles from "../FilmPage.module.css";

const LoadNextFilm = ({ films, film }) => {
  const sortedFilms = films.filter((film) => film.showOnHomePage);

  return (
    <AnimationLink path={loadNextFilm(sortedFilms, film)}>
      <div className={styles.loadNext} typo="display">
        <button>Load Next Film</button>
      </div>
    </AnimationLink>
  );
};

export default LoadNextFilm;
