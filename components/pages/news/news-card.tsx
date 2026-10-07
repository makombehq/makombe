import type { NewsArticle } from "@/lib/news";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type NewsCardProps = {
  article: NewsArticle;
};

export function NewsCard({ article }: NewsCardProps) {
  const date = article.date ? formatDate(article.date) : null;

  return (
    <Card className="h-full transition-colors hover:border-primary/40">
      <Link href={`/news/${article.slug}`} className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
          {date ? (
            <p className="text-xs text-muted-foreground">{date}</p>
          ) : null}
          {article.description ? (
            <CardDescription className="line-clamp-3">
              {article.description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent />
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

export function NewsCardSkeleton() {
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
