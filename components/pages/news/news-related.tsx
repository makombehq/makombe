import type { NewsArticle } from "@/lib/news";
import { NewsCard } from "./news-card";

type NewsRelatedProps = {
  articles: NewsArticle[];
};

export function NewsRelated({ articles }: NewsRelatedProps) {
  if (articles.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
