export const loadNextFilm = (films, film) => {
  if (!films?.length || !film) return;

  const currentIndex = films.findIndex((f) => f.slug.current === film.slug.current);

  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + 1) % films.length;
  const nextFilm = films[nextIndex];

  return `/films/${nextFilm.slug.current}`;
};
