import Media from "@/components/Media/Media";

import styles from "../FilmPage.module.css";

const FilmSupportingMedia = ({ film }) => {
  if (!film.supportingMedia) return undefined;

  return (
    <div className={styles.filmSupportingMedia}>
      {film.supportingMedia.map((item) => (
        <Media key={item._id} medium={item.medium} />
      ))}
    </div>
  );
};

export default FilmSupportingMedia;
