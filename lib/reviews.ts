// Data access for the Reviews section.
// Implementations will be added later (e.g. reading from content/reviews).

export type Review = {
  slug: string;
  title: string;
};

export async function getReviews(): Promise<Review[]> {
  return [];
}

export async function getReview(slug: string): Promise<Review | null> {
  void slug;
  return null;
}
