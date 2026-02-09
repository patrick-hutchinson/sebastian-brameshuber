import { getFilms } from "@/lib/sanity/fetch";
import FilmsPage from "./FilmsPage";

export default async function Page() {
  const films = await getFilms();

  return <FilmsPage site={site} films={films} />;
}
