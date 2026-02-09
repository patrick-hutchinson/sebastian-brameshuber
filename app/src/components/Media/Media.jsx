"use client";

import ImageCompose from "./components/Image/ImageCompose";
import VideoCompose from "./components/Video/VideoCompose";

const Media = ({ medium }) => {
  if (!medium || (!medium.url && !medium.playbackId)) return undefined;

  switch (medium.type) {
    case "image":
      return <ImageCompose medium={medium} />;
    case "video":
      return <VideoCompose medium={medium} />;
    default:
      return null;
  }
};

Media.displayName = "Media";
export default Media;
