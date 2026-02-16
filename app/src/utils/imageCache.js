// utils/imageCache.js
const loadedImages = new Set();

export const markImageLoaded = (src) => {
  loadedImages.add(src);
};

export const isImageLoaded = (src) => {
  return loadedImages.has(src);
};

export const preloadImage = (src) =>
  new Promise((resolve, reject) => {
    if (loadedImages.has(src)) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      loadedImages.add(src);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
