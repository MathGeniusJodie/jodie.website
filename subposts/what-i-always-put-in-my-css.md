---
date: 2026-04-07
categories: [life]
parent: inkhaven
---
## What I Always Put in my CSS

I like when websites look like websites. Blue links that turn purple after you've clicked them, serif fonts for body text, text that doesn't have a seizure as the page is loading. But I'm not a _barbarian_. Even I have a few beefs with the default browser styles.

### Absolute Unit Line Height

No matter the font size you use for different elements, the line height stays consistent. You don't break the baseline grid unless you explicitly decide to.

<pre><code>html {
  line-height: 23px;
}
</code></pre>

### Default Border Color

I don't have to manually set the border color on each individual element. I can just set the border width and it gets a default color.

<pre><code>* {
  border: solid 0;
  border-color: inherit;
}</code></pre>

### Disabled Dingbats

If I use text as decoration, like decorative bullets or separators. I make sure that selecting and copying the text doesn't include the decorations.

<pre><code>[aria-hidden="true"] {
  user-select: none;
}</code></pre>

### Never Abandon the Orphans

<pre><code>h1, h2, h3, h4, h5, h6 {
  text-wrap-style: balance;
}
p {
  text-wrap-style: pretty;
}</code></pre>

### Good Helvetica

I prefer serif fonts for copy, and I use `system-ui` for web apps, as one should. But if I want to use a sans-serif font, I _never_ use `sans-serif`. `sans-serif` exposes your visitors to the horrors of Helvetica and Arial.

Luckily, most platforms have a font designed specifically to be a good version of Helvetica. Apple devices have Helvetica Neue, Google devices have Roboto, desktop Linux has Noto. Windows has... well, it has Segoe UI, which you get via `system-ui`.

<pre><code>font-family: 'Helvetica Neue', Roboto, 'Noto Sans', system-ui, sans-serif</code></pre>

### Make Wide Elements Scrollable

To prevent them being cut-off on smaller screens

<pre><code>pre, table {
  overflow-x: auto;
  max-width: 100%;
}</code></pre>

<div role="separator" class="⁂"></div>

Support dark and light mode with a single line of code. No need to make custom styles!

<pre><code>html {
  color-scheme: light dark;
}</code></pre>

Make margins match the line height.

<pre><code>p, ol, ul, h1, h2, h3, h4, h5, h6, blockquote {
  margin-block: 1lh;
}</code></pre>

Prevent `<sub>` and `<sup>` from messing with the line height.

<pre><code>sub, sup {
  line-height: 0;
}</code></pre>

Automatically keep aspect ratio when you change the width.

<pre><code>img, video {
  height: unset
}</code></pre>

Flexbox items have `min-width:auto`, which means items refuse to shrink below their content size. `0` is a much better default.

<pre><code>* {
  min-width: 0;
  min-height: 0;
}</code></pre>
