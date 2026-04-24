---
date: 2025-03-23
categories: [math]
---
<h2>Fast Approximate <span aria-hidden="true">|</span>Length<span aria-hidden="true">|</span> and Squaring<span aria-hidden="true">²</span></h2>

<p>Shifting a float by 1 approximately squares or square-roots it very quickly. This is probably useful for <abbr>rms</abbr> error calculation or getting the length of a vector.</p>

<pre><code>static float garbage_len(float a, float b){
  return utf(ftu(
      utf(ftu(a)&lt;&lt;1u)
      +utf(ftu(b)&lt;&lt;1u)
  )&gt;&gt;1u);
}</code></pre>
