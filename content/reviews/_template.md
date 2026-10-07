---
# Review template — copy this file into content/reviews/<year>/<month>/<slug>.md
# Files whose name starts with "_" (like this one) are ignored by the loader.
#
# <year>  = e.g. 2026
# <month> = e.g. 10-october (numeric prefix keeps months ordered)
# <slug>  = kebab-case, becomes the URL at /reviews/<slug>

# Display title. If omitted, the loader falls back to the first "# " heading,
# then to a title derived from the slug.
title: "Review Title"

# Short one-line summary shown on cards and in listings.
description: "A concise summary of what is being reviewed."

# ISO date (YYYY-MM-DD) the review was published.
date: "2026-10-01"

# What is being reviewed (product, tool, library, etc.).
subject: "Product or tool name"

# Optional rating out of 5.
rating: 4.5

# Free-form tags for filtering.
tags:
  - tooling
  - review

# Set true to hide from listings without deleting the file.
draft: false
---

# Review Title

Write the full review body here in Markdown. This content is rendered to
HTML on the review's detail page (/reviews/<slug>).
