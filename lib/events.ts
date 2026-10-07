// Data access for the Events section.
// Implementations will be added later (e.g. reading from content/events).

export type Event = {
  slug: string;
  title: string;
};

export async function getEvents(): Promise<Event[]> {
  return [];
}

export async function getEvent(slug: string): Promise<Event | null> {
  void slug;
  return null;
}
