import type { NewsArticle } from "@/lib/news";
import { NewsCard } from "./news-card";

type NewsListProps = {
  articles: NewsArticle[];
};

export function NewsList({ articles }: NewsListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {articles.map((article) => (
        <li key={article.slug}>
          <NewsCard article={article} />
        </li>
      ))}
    </ul>
  );
}
