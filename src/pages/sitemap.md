---
title: Sitemap
tag: page-sitemap
---

# Sitemap

<ul>
{%- for post in collections.all -%}
  <li><a href="{{ post.url }}">{{ post.url }}</a></li>
{%- endfor -%}
</ul>