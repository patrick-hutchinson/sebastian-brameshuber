import { loadNextFilm } from "../utils/loadNextFilm";

import AnimationLink from "@/components/Animation/AnimationLink";

import styles from "../FilmPage.module.css";

const LoadNextFilm = ({ films, film }) => {
  return (
    <AnimationLink path={loadNextFilm(films, film)}>
      <div className={styles.loadNext} typo="display">
        Load Next
      </div>
    </AnimationLink>
  );
};

export default LoadNextFilm;
