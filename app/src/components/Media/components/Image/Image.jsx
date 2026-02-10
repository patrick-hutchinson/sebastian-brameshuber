import { useImageResolution } from "../../hooks/useImageResolution";

import NextImage from "next/image";

const Image = ({ medium, setIsLoaded }) => {
  const imageSource = useImageResolution(medium);

  const resolutionWidth = medium.width;
  const resolutionHeight = medium.height;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: resolutionWidth / resolutionHeight,
        position: "relative",
      }}
    >
      <NextImage
        src={imageSource}
        alt="image"
        unoptimized
        width={resolutionWidth}
        height={resolutionHeight}
        loading="lazy"
        decoding="sync"
        draggable={false}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default Image;
