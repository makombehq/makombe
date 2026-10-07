import type { Review } from "@/lib/reviews";
import { ReviewCard } from "./review-card";

type ReviewListProps = {
  reviews: Review[];
};

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <li key={review.slug}>
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}
