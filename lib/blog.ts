// Data access for the Blog section.
// Implementations will be added later (e.g. reading from content/blog).

export type BlogPost = {
  slug: string;
  title: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  return [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  void slug;
  return null;
}
