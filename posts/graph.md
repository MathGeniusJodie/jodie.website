---
date: 2024-06-16
categories: [math]
---
## Bit Arrays for Fast Graph Search

One common flaw in [HNSW](https://en.wikipedia.org/wiki/Hierarchical_navigable_small_world) implementations is using ordered sets to track visited neighbors. This causes a huge performance overhead.

Using a bit array to keep track of visited neighbors is much faster.

<p>For a code example, see <a href="https://github.com/MathGeniusJodie/joann" target="_blank">Joann</a>, my <abbr>HNSW</abbr> implementation.</p>
