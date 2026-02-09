import { getFilms, getSite } from "@/lib/sanity/fetch";
import FilmPage from "./FilmPage";

export default async function Page({ params }) {
  const { slug } = await params;

  const site = await getSite();
  const films = await getFilms();
  const film = films.find((p) => p.slug.current === slug);

  return <FilmPage site={site} films={films} film={film} />;
}
