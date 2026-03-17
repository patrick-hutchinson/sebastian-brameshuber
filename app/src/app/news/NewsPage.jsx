import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import NewsItem from "./components/NewsItem/NewsItem";

import styles from "./NewsPage.module.css";
import Section from "../../components/Structure/Section";

const NewsPage = ({ news }) => {
  const sortedNews = [...news].sort((a, b) => {
    // Convert DD.MM.YYYY → YYYY-MM-DD for proper Date parsing
    const parseDate = (d) => {
      if (!d) return new Date(0); // fallback if date missing
      const [day, month, year] = d.split(".");
      return new Date(`${year}-${month}-${day}`);
    };
    return parseDate(b.date) - parseDate(a.date);
  });

  return (
    <main>
      <Section>
        <div className={styles.newsContainer}>
          {sortedNews.map((newsItem, index) => {
            return <NewsItem key={newsItem._id ?? newsItem._key ?? index} newsItem={newsItem} staggerIndex={index} />;
          })}
        </div>
      </Section>
      <ScrollToTop />
    </main>
  );
};

export default NewsPage;
