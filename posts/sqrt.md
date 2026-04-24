---
date: 2025-07-09
categories: [math]
---
## Fast Square Root

Possibly the fastest (decently) accurate square root yet. 5x less latency and 7x throughput! (on some hardware)

[https://godbolt.org/z/6dnW6dKW3](https://godbolt.org/z/6dnW6dKW3)

<pre><code>static float decent_sqrt(float x){
    unsigned int b = ftu(x) &gt;&gt; 1;
    float s = utf(0x1fbf8ddb + b);
    float r = utf(0x5eaf6eaf - b);
    return fmaf(fmaf(-s, s, x), r, s);
}</code></pre>

<figure>
    <img loading="lazy" src="https://static2.mtlws.ca/decent_sqrt_error.png" class="img-adapt-dark" alt="The function has a maximum relative error of 0.0003" width="800" height="600">
    <figcaption>Relative Error Plot</figcaption>
  </figure>
