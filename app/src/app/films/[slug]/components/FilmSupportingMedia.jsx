import { useStickyPositioning } from "@/components/Media/hooks/useStickyPositioning";

import Media from "@/components/Media/Media";

import styles from "../FilmPage.module.css";

const FilmSupportingMedia = ({ film }) => {
  if (!film.supportingMedia) return undefined;

  const { containerRef, top } = useStickyPositioning();

  return (
    <div className={styles.filmSupportingMedia} ref={containerRef} style={{ top }}>
      <div className={styles.filmSupportingMedia_inner}>
        {film.supportingMedia.map((item) => (
          <Media key={item._id} medium={item.medium} />
        ))}
      </div>
      {film.platform && film.purchaseLink && (
        <div typo="fineprint" style={{ marginTop: "var(--margin-page)" }}>
          <a href={film.purchaseLink} target="_blank">
            Buy on {film.platform}
          </a>
        </div>
      )}
    </div>
  );
};

export default FilmSupportingMedia;
