---
date: 2025-05-15
categories: [math]
---
## Graphics Optimization is Information Theory

I've been working on an image compression format lately (coming soon!). This led me down the rabbit hole of [information theory](https://en.wikipedia.org/wiki/Information_theory), and it's made me see graphics programming with a fresh perspective.

Information theory is too often overlooked in the context of graphics optimization. It’s not just adjacent to what we do. It's the whole darn [map](https://en.wikipedia.org/wiki/Map%E2%80%93territory_relation)!

### Compute Generates Data

Redundancy can be compressed. This principle applies to compute, not just storage.

### Less Data Also Matters

<p>Low-end hardware is usually bottlenecked by memory bandwidth, not compute. Phones and <abbr>igpu</abbr> powered laptops also tend to have less vram!</p>

Making data smaller also makes space for something else, like lookup tables or acceleration structures that would be unviable otherwise

### Where?

<ul>
    <li><strong>Temporal Redundancy:</strong> The current frame is often similar to the previous one. Reprojection, <abbr>taa</abbr>, and impostors exploit this to reduce work.</li>
    <li><strong>Derived Data:</strong> Don’t store what you can calculate. Like normals and positions from depth.</li>
    <li><strong>Spatial Redundancy:</strong> Adjacent pixels are often the same material and are similarly lit.</li>
    <li><strong>Impossible States:</strong> If the camera can’t possibly see it. Cull it.</li>
  </ul>

### Human Perception has a Limited Bitrate

If there's more of one type of information, you can perceive less of another.

-   **High Frequency, High Contrast Detail:** Allows for lower bit depth especially for chroma.
-   **High Motion:** Lower resolution is fine.
-   **Low Motion:** More temporal redundancy.
-   **More Pixels and More Frames:** Temporal tricks and dithering shine at high framerate and resolution.
-   **Blur:** Rough reflections and depth of field need more rays or more texture samples, but you can use a lower resolution for raytracing and texture lookups.

### Some Quick Tips

<ul>
    <li>One texture + different vertex colors = many looks.</li>
    <li>If your floating&nbsp;point data is only positive, put data in the sign bit.</li>
    <li>If float data is always &lt; 1, there's a free bit in the exponent.</li>
    <li>The least significant bit of a float probably doesn't matter. Yolo.</li>
    <li>Float precision issues are often skill issues. Use <a href="https://herbie.uwplse.org/">Herbie</a> and floatfloat methods before giving up and using larger types.</li>
    <li>Decouple framerates. Shadows, <abbr>gi</abbr>, terrain and entities don't all need to update at the same frequency.</li>
    <li>Quantize vertex positions</li>
    <li>Paletting</li>
    <li>Checkerboarded chroma</li>
    <li>Lower <abbr>lod</abbr>s = fewer animation frames needed</li>
    <li>Velocity buffers: 2D and a low bitrate are often enough</li>
    <li>Normalized vectors can be stored in 2D</li>
    <li>Only impostors facing the camera need to be loaded. (Overpowered)</li>
    <li>Learn about sparse bit octrees/contrees</li>
  </ul>
