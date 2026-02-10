import { getNews } from "@/lib/sanity/fetch";
import NewsPage from "./NewsPage";

export default async function Page() {
  const news = await getNews();

  return <NewsPage news={news} />;
}
