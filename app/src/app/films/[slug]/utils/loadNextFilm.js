export const loadNextFilm = (films, film) => {
  const currentIndex = films.findIndex((f) => f.slug.current === film.slug.current);

  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + 1) % films.length;
  const nextFilm = films[nextIndex];

  console.log(nextIndex, "next index");

  return `/films/${nextFilm.slug.current}`;
};
