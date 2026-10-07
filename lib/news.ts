// Data access for the News section.
// Implementations will be added later (e.g. reading from content/news).

export type NewsArticle = {
  slug: string;
  title: string;
};

export async function getNewsArticles(): Promise<NewsArticle[]> {
  return [];
}

export async function getNewsArticle(
  slug: string
): Promise<NewsArticle | null> {
  void slug;
  return null;
}
