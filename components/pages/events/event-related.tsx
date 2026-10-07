import type { Event } from "@/lib/events";
import { EventCard } from "./event-card";

type EventRelatedProps = {
  events: Event[];
};

export function EventRelated({ events }: EventRelatedProps) {
  if (events.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  );
}
