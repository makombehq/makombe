import type { Event } from "@/lib/events";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const meta = [event.startDate ? formatRange(event) : null, event.location]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <Card className="h-full transition-colors hover:border-primary/40">
      <Link href={`/events/${event.slug}`} className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="line-clamp-2">{event.title}</CardTitle>
          {meta ? (
            <p className="text-xs text-muted-foreground">{meta}</p>
          ) : null}
          {event.description ? (
            <CardDescription className="line-clamp-3">
              {event.description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent />
      </Link>
    </Card>
  );
}

// Format "Oct 5–7, 2026" style range from ISO dates.
function formatRange(event: Event): string {
  if (!event.startDate) return "";
  const start = new Date(event.startDate);
  const end = event.endDate ? new Date(event.endDate) : null;
  const month = start.toLocaleString("en-US", { month: "short" });
  const year = start.getFullYear();

  if (end && end.getTime() !== start.getTime()) {
    const sameMonth = end.getMonth() === start.getMonth();
    const endPart = sameMonth
      ? `${end.getDate()}`
      : `${end.toLocaleString("en-US", { month: "short" })} ${end.getDate()}`;
    return `${month} ${start.getDate()}\u2013${endPart}, ${year}`;
  }
  return `${month} ${start.getDate()}, ${year}`;
}

export function EventCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
    </Card>
  );
}
