---
# Event template — copy this file into content/events/<year>/<month>/<slug>.md
# Files whose name starts with "_" (like this one) are ignored by the loader.
#
# <year>  = e.g. 2026
# <month> = e.g. 10-october (numeric prefix keeps months ordered)
# <slug>  = kebab-case, becomes the URL at /events/<slug>

# Display title. If omitted, the loader falls back to the first "# " heading,
# then to a title derived from the slug.
title: "Event Title"

# Short one-line summary shown on cards and in listings.
description: "A concise summary of what this event is about."

# ISO date (YYYY-MM-DD). Start and optional end for multi-day events.
startDate: "2026-10-01"
endDate: "2026-10-03"

# City / venue or "Virtual".
location: "City, Country"

# Free-form tags for filtering.
tags:
  - conference
  - open-source

# External link to the event's own page.
url: "https://example.com"

# Set true to hide from listings without deleting the file.
draft: false
---

# Event Title

Write the full event description here in Markdown. This body is rendered to
HTML on the event's detail page (/events/<slug>).
