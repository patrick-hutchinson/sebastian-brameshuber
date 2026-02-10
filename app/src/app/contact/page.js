import { getSite } from "@/lib/sanity/fetch";
import ContactPage from "./ContactPage";

export default async function Page() {
  const site = await getSite();

  return <ContactPage site={site} />;
}
