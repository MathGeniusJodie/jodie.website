---
date: 2025-02-07
categories: [web]
---
## Modern Color Utility Classes

<style>
    .swatches{
      display:flex;
      flex-direction:column;
      gap:10px;
      margin-top:1lh;
      margin-bottom: 1lh;
    }
    .swatch-group{
      display:flex;
      gap:10px;
    }

    .swatch{
      padding:10px;
      background:oklch(from var(--base) var(--l) c h );
    }

    .l-20{--l:0.2}
    .l-40{--l:0.4}
    .l-60{--l:0.6}
    .l-80{--l:0.8}
    .l-100{--l:1.0}

    .powderblue{--base: powderblue}
    .crimson   {--base: crimson}
    .goldenrod {--base: goldenrod}
    .indigo    {--base: indigo}
  </style>

<div class="swatches">
    <div class="swatch-group">
      <div class="swatch powderblue l-20"></div>
      <div class="swatch powderblue l-40"></div>
      <div class="swatch powderblue l-60"></div>
      <div class="swatch powderblue l-80"></div>
      <div class="swatch powderblue l-100"></div>
    </div>
    <div class="swatch-group">
      <div class="swatch crimson l-20"></div>
      <div class="swatch crimson l-40"></div>
      <div class="swatch crimson l-60"></div>
      <div class="swatch crimson l-80"></div>
      <div class="swatch crimson l-100"></div>
    </div>
      <div class="swatch-group">
      <div class="swatch goldenrod l-20"></div>
      <div class="swatch goldenrod l-40"></div>
      <div class="swatch goldenrod l-60"></div>
      <div class="swatch goldenrod l-80"></div>
      <div class="swatch goldenrod l-100"></div>
    </div>
      <div class="swatch-group">
      <div class="swatch indigo l-20"></div>
      <div class="swatch indigo l-40"></div>
      <div class="swatch indigo l-60"></div>
      <div class="swatch indigo l-80"></div>
      <div class="swatch indigo l-100"></div>
    </div>
  </div>

[Relative colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors)
  and Oklch in <abbr>css</abbr> enable this clean, composable pattern.
    With one class for the base color and one for the lightness.
    You can play around with the code on this [codepen](https://codepen.io/Jodie-themathgenius/pen/VYZJrYE).

<pre>    <code>
.swatch{
  background: oklch(from var(--base) var(--l) c h );
}

.l-20{--l:0.2}
.l-40{--l:0.4}
.l-60{--l:0.6}
.l-80{--l:0.8}
.l-100{--l:1.0}

.aquamarine{--base: aquamarine}
.crimson   {--base: crimson}
.goldenrod {--base: goldenrod}
.indigo    {--base: indigo}
    </code>
  </pre>
