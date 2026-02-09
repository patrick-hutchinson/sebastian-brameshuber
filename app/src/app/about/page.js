import { getAbout } from "@/lib/sanity/fetch";
import AboutPage from "./AboutPage";

export default async function Page() {
  const about = await getAbout();

  return <AboutPage about={about} />;
}
