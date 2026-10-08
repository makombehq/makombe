import { notFound } from "next/navigation";

// Any path under a locale that doesn't match a known route renders
// the not-found page.
export default function CatchAllPage() {
  notFound();
}
