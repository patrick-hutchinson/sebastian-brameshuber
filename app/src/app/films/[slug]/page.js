import { getFilms } from "@/lib/sanity/fetch";
import FilmPage from "./FilmPage";

export default async function Page({ params }) {
  const { slug } = await params;

  const films = await getFilms();
  const film = films.find((p) => p.slug.current === slug);

  return <FilmPage films={films} film={film} />;
}
