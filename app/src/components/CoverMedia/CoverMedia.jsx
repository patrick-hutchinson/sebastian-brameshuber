import Media from "@/components/Media/Media";
import { useRef, useEffect } from "react";
import styles from "./CoverMedia.module.css";

import { useViewport } from "@/context/ViewportContext";
import { useContext } from "react";

import { DeviceContext } from "@/context/DeviceContext";

const CoverMedia = ({ medium }) => {
  if (!medium) return undefined;

  const { viewportHeight } = useViewport();
  const { isMobile } = useContext(DeviceContext);

  const aspectRatio = medium.width / medium.height;

  const containerRef = useRef(null);

  useEffect(() => {
    if (isMobile && containerRef.current) {
      const container = containerRef.current;

      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2; // scroll to half the scrollable width
    }
  }, [isMobile]);

  return (
    <div
      className={styles.coverMedia}
      style={{ overflowX: isMobile ? "scroll" : undefined }}
      ref={containerRef}
      {...(isMobile ? { "data-lenis-prevent": true } : {})}
    >
      <div className={styles.coverMedia_inner} style={{ height: "100%", width: viewportHeight * aspectRatio }}>
        <Media medium={medium} />
      </div>
    </div>
  );
};

export default CoverMedia;
