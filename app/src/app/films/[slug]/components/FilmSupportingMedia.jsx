import Media from "@/components/Media/Media";

import styles from "../FilmPage.module.css";
import { useEffect, useRef, useState } from "react";

const FilmSupportingMedia = ({ film }) => {
  if (!film.supportingMedia) return undefined;

  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    setContainerHeight(containerRef.current.getBoundingClientRect().height);
  }, []);

  return (
    <div className={styles.filmSupportingMedia} ref={containerRef} style={{ top: `calc(50% - ${containerHeight / 2}px)` }}>
      {film.supportingMedia.map((item) => (
        <Media key={item._id} medium={item.medium} />
      ))}
    </div>
  );
};

export default FilmSupportingMedia;
