import ScreeningsPage from "./ScreeningsPage";

import { getScreenings } from "@/lib/sanity/fetch";

export default async function Page() {
  const [screenings] = await Promise.all([getScreenings()]);

  return <ScreeningsPage screenings={screenings} />;
}
