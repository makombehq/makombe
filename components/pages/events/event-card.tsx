import type { Event } from "@/lib/events";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const date = event.startDate ? formatRange(event) : null;

  return (
    <Card className="h-full rounded-none border-0 border-b border-border bg-transparent pb-6 shadow-none ring-0 transition-colors">
      <Link href={`/events/${event.slug}`} className="group flex h-full flex-col">
        <CardHeader>
          <CardTitle className="line-clamp-2 min-h-[2.75rem] underline decoration-border underline-offset-4 transition-colors group-hover:text-primary group-hover:decoration-primary">
            {event.title}
          </CardTitle>
          <p className="line-clamp-1 min-h-[1rem] text-xs text-muted-foreground">
            {date}
          </p>
          <CardDescription className="line-clamp-3 min-h-[3.75rem]">
            {event.description}
          </CardDescription>
        </CardHeader>
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
    <Card className="h-full rounded-none border-0 border-b border-border bg-transparent pb-6 shadow-none ring-0">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
    </Card>
  );
}
