import type { BlogPost } from "@/lib/blog";
import { BlogCard } from "./blog-card";

type BlogRelatedProps = {
  posts: BlogPost[];
};

export function BlogRelated({ posts }: BlogRelatedProps) {
  if (posts.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
