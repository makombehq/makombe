import type { Review } from "@/lib/reviews";
import { ReviewCard, ReviewCardSkeleton } from "./review-card";

type ReviewGridProps = {
  reviews: Review[];
};

export function ReviewGrid({ reviews }: ReviewGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <ReviewCard key={review.slug} review={review} />
      ))}
    </div>
  );
}

export function ReviewGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ReviewCardSkeleton key={i} />
      ))}
    </div>
  );
}
