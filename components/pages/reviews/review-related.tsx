import type { Review } from "@/lib/reviews";
import { ReviewCard } from "./review-card";

type ReviewRelatedProps = {
  reviews: Review[];
  heading: string;
};

export function ReviewRelated({ reviews, heading }: ReviewRelatedProps) {
  if (reviews.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.slug} review={review} />
        ))}
      </div>
    </section>
  );
}
