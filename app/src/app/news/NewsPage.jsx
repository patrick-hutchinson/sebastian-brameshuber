import NewsItem from "./components/NewsItem/NewsItem";

import styles from "./NewsPage.module.css";

const NewsPage = ({ news }) => {
  return (
    <main>
      {news.map((newsItem) => {
        return <NewsItem key={newsItem._key} newsItem={newsItem} />;
      })}
    </main>
  );
};

export default NewsPage;
