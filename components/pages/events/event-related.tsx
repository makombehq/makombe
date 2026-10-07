import type { Event } from "@/lib/events";
import { EventCard } from "./event-card";

type EventRelatedProps = {
  events: Event[];
  heading: string;
};

export function EventRelated({ events, heading }: EventRelatedProps) {
  if (events.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  );
}
