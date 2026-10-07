---
# News template — copy this file into content/news/<year>/<month>/<slug>.md
# Files whose name starts with "_" (like this one) are ignored by the loader.
#
# <year>  = e.g. 2026
# <month> = e.g. 10-october (numeric prefix keeps months ordered)
# <slug>  = kebab-case, becomes the URL at /news/<slug>

# Display title. If omitted, the loader falls back to the first "# " heading,
# then to a title derived from the slug.
title: "Article Title"

# Short one-line summary shown on cards and in listings.
description: "A concise summary of this news article."

# ISO date (YYYY-MM-DD) the article was published.
date: "2026-10-01"

# Free-form tags for filtering.
tags:
  - open-source
  - release

# Optional external source link.
url: "https://example.com"

# Set true to hide from listings without deleting the file.
draft: false
---

# Article Title

Write the full article body here in Markdown. This content is rendered to
HTML on the article's detail page (/news/<slug>).
