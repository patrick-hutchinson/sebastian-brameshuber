import { useStickyPositioning } from "@/components/Media/hooks/useStickyPositioning";

import Media from "@/components/Media/Media";

import styles from "../FilmPage.module.css";

const FilmSupportingMedia = ({ film }) => {
  if (!film.supportingMedia) return undefined;

  const { containerRef, top } = useStickyPositioning();

  return (
    <div className={styles.filmSupportingMedia} ref={containerRef} style={{ top }}>
      {film.supportingMedia.map((item) => (
        <Media key={item._id} medium={item.medium} />
      ))}
    </div>
  );
};

export default FilmSupportingMedia;
