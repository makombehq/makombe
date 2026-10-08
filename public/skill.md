# makombe Skill

A description of what the makombe platform does and how an AI assistant or agent can work with it.

## Overview

makombe is the intelligence behind technology — a platform aggregating technology news, research, open-source knowledge, events, reviews, insights, and data into one localized experience (English and Malayalam).

## Capabilities

- **Browse news**: Technology news articles at `/news`, individual articles at `/news/<slug>`.
- **Browse reviews**: Product and technology reviews at `/reviews`, individual reviews at `/reviews/<slug>`.
- **Browse events**: Technology conferences and events at `/events`, individual events at `/events/<slug>`.
- **Read the blog**: Company, research, and product posts at `/blog`, individual posts at `/blog/<slug>`.
- **Search, sort, filter, and switch views** within each section (grid or list).
- **Switch language** between English (default, root) and Malayalam (`/ml`).
- **Switch theme** between light, dark, and system.

## Content model

Content lives as Markdown files under `content/<section>/`.

- News, Reviews, Events: `content/<section>/<year>/<month>/<slug>.md` (month is numeric-prefixed, e.g. `09-september`).
- Blog: `content/blog/<category>/<slug>.md` (categories: company, research, product).
- Each file has frontmatter: `title`, `description`, `date` (or `startDate`/`endDate` and `location` for events), `author`, `tags`, and `draft`.
- Files or folders prefixed with `_` (e.g. `_template.md`) are ignored by the loader. A `_template.md` in each section documents the expected frontmatter.

## Links

- Source: https://github.com/makombehq/makombe
- Feedback: https://github.com/makombehq/makombe/discussions/new/choose
- Support: https://github.com/makombehq/makombe/issues/new
- Contact: legal@makombe.app
