import Media from "@/components/Media/Media";

import styles from "./CoverMedia.module.css";

const CoverMedia = ({ medium }) => {
  if (!medium) return undefined;

  return (
    <div className={styles.coverMedia}>
      <Media medium={medium} />
    </div>
  );
};

export default CoverMedia;
