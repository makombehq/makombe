import type { BlogPost } from "@/lib/blog";
import { BlogCard } from "./blog-card";

type BlogRelatedProps = {
  posts: BlogPost[];
  heading: string;
};

export function BlogRelated({ posts, heading }: BlogRelatedProps) {
  if (posts.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
