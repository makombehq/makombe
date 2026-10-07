import type { Review } from "@/lib/reviews";
import { ReviewCard } from "./review-card";

type ReviewRelatedProps = {
  reviews: Review[];
};

export function ReviewRelated({ reviews }: ReviewRelatedProps) {
  if (reviews.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.slug} review={review} />
        ))}
      </div>
    </section>
  );
}
