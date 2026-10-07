import type { Event } from "@/lib/events";
import { EventCard } from "./event-card";

type EventListProps = {
  events: Event[];
};

export function EventList({ events }: EventListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {events.map((event) => (
        <li key={event.slug}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}
