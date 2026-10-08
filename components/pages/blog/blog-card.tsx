import type { BlogPost } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const date = post.date ? formatDate(post.date) : null;

  return (
    <Card className="h-full rounded-none border-0 border-b border-border bg-transparent pb-6 shadow-none ring-0 transition-colors">
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
        <CardHeader>
          <CardTitle className="line-clamp-1 underline decoration-border underline-offset-4 transition-colors group-hover:text-primary group-hover:decoration-primary">
            {post.title}
          </CardTitle>
          <p className="line-clamp-1 min-h-[1rem] text-xs text-muted-foreground">
            {date}
          </p>
          <CardDescription className="line-clamp-3 min-h-[3.75rem]">
            {post.description}
          </CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogCardSkeleton() {
  return (
    <Card className="h-full rounded-none border-0 border-b border-border bg-transparent pb-6 shadow-none ring-0">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
    </Card>
  );
}
