---
date: 2026-04-19
categories: [life]
parent: inkhaven
---
## How to Make a Floating Point Math Library, Part IV

Square roots have a CPU instruction, so let's skip them and go straight to cube roots. Running our wolframscript gives:

<pre><code>$ wolframscript -file getnewton.wls
Newton: (x + 2*y^3)/(3*y^2)
Halley: (2*x*y + y^4)/(x + 2*y^3)</code></pre>

Combined with the approximation we made in Part II:

<pre><code>fn cbrt_halley(x: f32) -&gt; f32 {
  let y = f32::from_bits(0x2a5063f7 + (x.to_bits() / 3));
  (2.*x*y + (y*y)*(y*y)) / (x + 2.*(y*y)*y)
}
fn cbrt_newton(x: f32) -&gt; f32 {
  let y = f32::from_bits(0x2a5063f7 + (x.to_bits() / 3));
  (x + 2.*(y*y)*y) / (3.*(y*y))
}</code></pre>

Let's look at the accuracy.

<figure>
          <figcaption>Approximation</figcaption>
          <img loading="lazy" src="https://static2.mtlws.ca/cbrt_approx_error.png" class="img-adapt-dark" alt="" width="480" height="480">
        </figure>

<figure>
          <figcaption>Newton</figcaption>
          <img loading="lazy" src="https://static2.mtlws.ca/cbrt_newton_error.png" class="img-adapt-dark" alt="" width="480" height="480">
        </figure>

<figure>
          <figcaption>Halley</figcaption>
          <img loading="lazy" src="https://static2.mtlws.ca/cbrt_halley_error.png" class="img-adapt-dark" alt="" width="480" height="480">
        </figure>

Orders of magnitude better, but still not enough. Another iteration:

<pre><code>fn cbrt_approx(x: f32) -&gt; f32 {
	let y = f32::from_bits(0x2a509849u32 + (x.to_bits() / 3));
	// newton iteration
	let y = (x + 2.*(y*y)*y) / (3.*(y*y));
	// halley iteration
	(2.*x*y + (y*y)*(y*y))/(x + 2.*(y*y)*y)
}</code></pre>

<figure>
          <figcaption>Newton and Halley</figcaption>
          <img loading="lazy" src="https://static2.mtlws.ca/cbrt_newton_halley_error.png" class="img-adapt-dark" alt="" width="480" height="480">
        </figure>

Perfect! Our average error is under one bit. Good enough for a standard library. Now let's try with `log2`.

<pre><code>g[x_] := Log[x,2]

$ wolframscript -file getnewton.wls
Newton: (y*(y - (x*y)/2^y^(-1) + Log[2]))/Log[2]</code></pre>

Oh no! The iteration needs `2^y` which is `exp2`. Let's try `exp2` then:

<pre><code>g[x_] := 2^x

jodiemath-rs $ wolframscript -file getnewton.wls
Newton: y*(1 + x*Log[2] - Log[y])</code></pre>

And `exp2` needs `log2`. We have a bootstrapping problem. We need a different strategy: approximation theory.

In **Part V** we'll learn non-iterative approximation methods to implement exponentials and logarithms.
