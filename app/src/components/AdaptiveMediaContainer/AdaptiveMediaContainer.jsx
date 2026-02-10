import { useState, useEffect, useMemo } from "react";

const AdaptiveMediaContainer = ({ children, container, medium }) => {
  // if (!container.current) return;

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Update container size whenever the container ref or window resizes
  useEffect(() => {
    if (!container.current) return;

    let timeout;
    const updateSize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const rect = container.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }, 100); // adjust delay as needed
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [container]);

  const { width: containerWidth, height: containerHeight } = containerSize;

  const factor = 0.8;

  const isImage = medium.type === "image";
  const isVideo = medium.type === "video";

  let aspectRatio;

  if (isImage) aspectRatio = medium.width / medium.height;

  if (isVideo) {
    const [aspectWidth, aspectHeight] = medium.aspect_ratio.split(":");
    aspectRatio = aspectWidth / aspectHeight;
  }

  const maxMediaWidth = containerWidth * factor;
  const maxMediaHeight = containerHeight * factor;

  // let mediaWidth, mediaHeight;

  const { mediaWidth, mediaHeight } = useMemo(() => {
    if (!aspectRatio) return { mediaWidth: 0, mediaHeight: 0 };

    const naturalWidth = aspectRatio > 1 ? 1 : aspectRatio;
    const naturalHeight = aspectRatio > 1 ? 1 / aspectRatio : 1;

    const scale = Math.min(maxMediaWidth / naturalWidth, maxMediaHeight / naturalHeight);

    return { mediaWidth: naturalWidth * scale, mediaHeight: naturalHeight * scale };
  }, [aspectRatio, maxMediaWidth, maxMediaHeight]);

  return <div style={{ width: mediaWidth, height: mediaHeight }}>{children}</div>;
};

export default AdaptiveMediaContainer;
