---
date: 2025-07-19
categories: [math]
---
<style>
    .bright-adjust {
      filter: brightness(50%);
    }
    @media (prefers-color-scheme: dark){
      .bright-adjust {
        filter: brightness(160%);
      }
    }
  </style>

<h2 class="bright-adjust"><span style="color:rgb(254, 57, 0)">Ra</span><span style="color:rgb(214, 103, 0)">ti</span><span style="color:rgb(182, 121, 63)">on</span><span style="color:rgb(161, 128, 96)">al</span> <span style="color:rgb(149, 131, 116)">Bl</span><span style="color:rgb(141, 133, 130)">ac</span><span style="color:rgb(135, 134, 140)">k-</span><span style="color:rgb(130, 134, 148)">bo</span><span style="color:rgb(127, 134, 153)">dy</span></h2>

<iframe loading="lazy" src="blackbody.html" style="width: 100%; height: 186px; margin: -18px; border: none; margin-bottom: 1lh;"></iframe>

I made this dead-simple rational approximation of the [black-body](https://en.wikipedia.org/wiki/Black-body_radiation) radiation formula.

<pre><code>vec3 blackbody(float t){
    vec3 a = vec3(2.59734600e-07,4.72510121e-07,1.47450666e-07);
    vec3 b = vec3(9.63147451e-04,6.61403216e-04,-2.61032012e-04);
    vec3 c = vec3(8.43099559e+00,-8.07987659e-01,-4.90914001e-02);
    vec3 d = vec3(4.15314246e-07,4.77927333e-07,6.80670967e-08);
    vec3 e = vec3(9.26918288e-04,4.08475977e-04,7.59001852e-05);
    return max(vec3(0), ((a*t+b)*t+c) / ((d*t+e)*t+1.));
}</code></pre>

Here's a demo on [Shadertoy](https://www.shadertoy.com/view/lslBWl).

Unlike most approximations, this one keeps luma at 1, so you can tweak lighting color without messing with the brightness.

<figure><img loading="lazy" src="https://static2.mtlws.ca/black_body_error.png" class="img-adapt-dark" alt="The function has a maximum relative error of 7e-5" width="1200" height="356"></figure>
