---
pagination:
  data: collections.allTags
  size: 1
  alias: tag
permalink: "/tags/{{ tag | slugify }}/"
layout: "tags.njk" # Optional: Use your base layout
eleventyExcludeFromCollections: true
---

<h1>Posts Tagged with "{{ tag }}"</h1>

