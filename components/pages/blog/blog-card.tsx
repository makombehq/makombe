import type { BlogPost } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const date = post.date ? formatDate(post.date) : null;

  return (
    <Card className="h-full transition-colors hover:border-primary/40">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="line-clamp-2 min-h-[2.75rem]">
            {post.title}
          </CardTitle>
          <p className="line-clamp-1 min-h-[1rem] text-xs text-muted-foreground">
            {date}
          </p>
          <CardDescription className="line-clamp-3 min-h-[3.75rem]">
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xs text-muted-foreground">
            {post.author}  ·  {post.readingTime} min read
          </p>
        </CardContent>
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
    <Card className="h-full">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
    </Card>
  );
}
