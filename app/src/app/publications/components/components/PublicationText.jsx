import Interview from "@/components/Text/Interview/Interview";
import Text from "@/components/Text/Text";
import { motion } from "framer-motion";

import styles from "../PublicationDisplay.module.css";

const PublicationText = ({ publication, expanded = false }) => {
  if (!publication) return;

  const excerpts = publication.excerpts;

  console.log(excerpts, "excerpt");

  return (
    <div className={styles.publicationText}>
      <Text className={styles.introduction} text={publication.text} />

      {excerpts && excerpts.length > 0 && (
        <motion.div
          className={styles.publicationExcerptsWrapper}
          initial={false}
          animate={{ height: expanded ? "auto" : 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <motion.div
            className={styles.publicationExcerpts}
            initial={false}
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut", delay: expanded ? 0.5 : 0 }}
          >
            {excerpts.map((excerpt, index) => (
              <div className={styles.excerptWrapper} key={excerpt?._id ?? excerpt?._key ?? index}>
                <div className={styles.excerptTitle}>{excerpt.title}</div>
                <Interview text={excerpt.text} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PublicationText;
