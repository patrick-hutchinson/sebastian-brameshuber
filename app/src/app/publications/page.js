import { getPublications } from "@/lib/sanity/fetch";
import PublicationsPage from "./PublicationsPage";

export default async function Page() {
  const publications = await getPublications();

  return <PublicationsPage publications={publications} />;
}
