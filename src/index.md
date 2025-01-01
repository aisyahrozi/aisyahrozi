---
title: Handcrafted 11ty Site
layout: base.njk
tag: home-page
templateEngineOverride: njk,md

---

## My Title Index Here

<ul>
{%- for post in collections.all -%}
  <li><a href="{{ post.url }}">{{ post.url }}</a></li>
{%- endfor -%}
</ul>

{% include 'category.njk' %}
