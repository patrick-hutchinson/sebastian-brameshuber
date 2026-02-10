import { useState } from "react";

import Carousel from "@/components/Carousel/Carousel";

const FilmGallery = ({ film }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!film.gallery || film.gallery.length === 0) return undefined;
  return (
    <>
      <Carousel array={film.gallery} onIndexChange={setCurrentIndex} />
      <div typo="display">
        {currentIndex + 1}/{film.gallery.length}
      </div>
    </>
  );
};

export default FilmGallery;
