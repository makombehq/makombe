import type { NewsArticle } from "@/lib/news";
import { NewsCard } from "./news-card";

type NewsRelatedProps = {
  articles: NewsArticle[];
  heading: string;
};

export function NewsRelated({ articles, heading }: NewsRelatedProps) {
  if (articles.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
