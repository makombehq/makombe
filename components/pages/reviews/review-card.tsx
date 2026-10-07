import type { Review } from "@/lib/reviews";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="h-full transition-colors hover:border-primary/40">
      <Link href={`/reviews/${review.slug}`} className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="line-clamp-2">{review.title}</CardTitle>
        </CardHeader>
        <CardContent />
      </Link>
    </Card>
  );
}

export function ReviewCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </CardHeader>
    </Card>
  );
}
