import { getFilms } from "@/lib/sanity/fetch";
import HomePage from "./HomePage";

export default async function Page() {
  const films = await getFilms();

  return <HomePage films={films} />;
}
