---
categories: [life]
parent: inkhaven
---
## How to Make a Floating Point Math Library, Part II

With only what we've learned in part I, you could figure out reciprocals, cube roots, and square roots on your own. So I'll leave those for the end and start with the less obvious exp2 and log2.

If we could get the mantissa bits into the exponent, we'd get exp2 for free. But how would we actually do that? We want the number 1 to map to the number 2, 2 -> 4, and so on. Let's look at the bit representation.

<pre><code>┌value┬─exponent──┬exp val┐
│  1  │ 0111 1111 │  127  │
│  2  │ 1000 0000 │  128  │
│  4  │ 1000 0001 │  129  │
│  8  │ 1000 0010 │  130  │
│ 16  │ 1000 0011 │  131  │
└─────┴───────────┴───────┘
</code></pre>

So we want the first 8 bits of the mantissa to be the input number + 127. For this we need to be at the order of magnitude where changing the 8th mantissa bit moves the value of the float by 1. That order of magnitude is 256. Then we need to add 127, which gets us 383.

Let's try adding 383 to our input and shifting left by 8 bits, making sure to negate the number because we just shifted a bit into the sign of our float.

<pre><code>fn exp2_approx(x: f32) -&gt; f32 {
  -f32::from_bits((x + 383.).to_bits() &lt;&lt; 8)
}</code></pre>

![](https://static2.mtlws.ca/exp2_approx.png)

It works!

To do log2 we just do the reverse: shift the exponent into the mantissa, set the order of magnitude to 256 and then subtract 383.

<pre><code>fn log2_approx(x: f32) -&gt; f32 {
	f32::from_bits((x).to_bits() &gt;&gt; 8 | 256_f32.to_bits()) - 383.
}</code></pre>

![](https://static2.mtlws.ca/log2_approx.png)

Boom! Easy as that.

For completeness here's the remaining functions we've talked about:

<pre><code>fn cbrt_approx(x: f32) -&gt; f32 {
	f32::from_bits(0x2a4ddef1 + (x.to_bits() / 3))
}

fn sqrt_approx(x: f32) -&gt; f32 {
	f32::from_bits(0x1FBD22DF + (x.to_bits() &gt;&gt; 1))
}

fn rcp_approx(x: f32) -&gt; f32 {
	f32::from_bits(0x7EEF370B - x.to_bits())
}

fn rsqrt_approx(x: f32) -&gt; f32 {
	f32::from_bits(0x5F33E79F - (x.to_bits() &gt;&gt; 1))
}</code></pre>

<figure>
          <figcaption>Approximate Cube Root</figcaption>
          <img loading="lazy" src="https://static2.mtlws.ca/cbrt_approx.png" class="img-adapt-dark" alt="" width="480" height="480">
        </figure>

<figure>
          <figcaption>Approximate Square Root</figcaption>
          <img loading="lazy" src="https://static2.mtlws.ca/sqrt_approx.png" class="img-adapt-dark" alt="" width="480" height="480">
        </figure>

<figure>
          <figcaption>Approximate Reciprocal</figcaption>
          <img loading="lazy" src="https://static2.mtlws.ca/rcp_approx.png" class="img-adapt-dark" alt="" width="480" height="480">
        </figure>

<figure>
          <figcaption>Approximate Reciprocal Square Root</figcaption>
          <img loading="lazy" src="https://static2.mtlws.ca/rsqrt_approx.png" class="img-adapt-dark" alt="" width="480" height="480">
        </figure>

In **Part III**, we're learning how to make these crude approximations usably accurate!
