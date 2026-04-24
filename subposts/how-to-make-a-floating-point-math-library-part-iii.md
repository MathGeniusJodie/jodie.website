---
date: 2026-04-17
categories: [life]
parent: inkhaven
---
## How to Make a Floating Point Math Library, Part III

In Parts I and II we built approximations for `exp2`, `log2`, `sqrt`, `rsqrt`, `cbrt`, and `rcp`. They get the order of magnitude right, which is crucial for floating point, but they're off by a few percent, which is useless for most things.

The next few installments are about [numerical analysis](https://en.wikipedia.org/wiki/Numerical_analysis), a field of math dedicated to approximating transcendental functions with elementary functions (which have CPU instructions). I'm skipping past most of the theory and focusing on software tools that do the math for us.

#### Numerical Analysis Part I: Iterative Refinement

Back to the Quake III reciprocal square root. We're looking at the part after the bit hacking.

<pre><code class="language-c">float Q_rsqrt( float number )
{
  long i;
  float x2, y;
  const float threehalfs = 1.5F;

  x2 = number * 0.5F;
  y  = number;
  i  = * ( long * ) &amp;y;
  // evil floating&nbsp;point bit level hacking
  i  = 0x5f3759df - ( i &gt;&gt; 1 );
  // what the fuck?
  y  = * ( float * ) &amp;i;
  y  = y * ( threehalfs - ( x2 * y * y ) );
  // 1st iteration
//  y  = y * ( threehalfs - ( x2 * y * y ) );
  // 2nd iteration, this can be removed

  return y;
}</code></pre>

The idea: you have a cheap, bad guess at `f(x)`. You also have a formula that turns that guess into a better one. Apply the formula until the guess is accurate enough.

If you stare at the math, you can kinda tell what it's doing. `x2 * y * y` is `0.5 * x / sqrt(x) / sqrt(x)`, and `x / sqrt(x) / sqrt(x) == 1`. Because we only have a bad approximation of `1/sqrt(x)`, our `1` is the error between the true value and the approximate value. The rest of the formula scales it, since the error we have is on the _square_ of `f(x)`, not `f(x)` itself. We can't get the error of `f(x)` directly without knowing the ground truth, which is what we're trying to compute in the first place, so this is also an approximation. Hence the iterations.

There's a systematic way to derive the iteration formula: [Newton's method](https://en.wikipedia.org/wiki/Newton%27s_method).

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" style="margin-bottom:1lh">
  <msub><mi>x</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></msub>
  <mo>=</mo>
  <msub><mi>x</mi><mi>n</mi></msub>
  <mo>+</mo>
  <mfrac>
    <mrow>
      <mo>(</mo><mn>1</mn><mo>/</mo><mi>f</mi><mo>)</mo>
      <mo>(</mo><msub><mi>x</mi><mi>n</mi></msub><mo>)</mo>
    </mrow>
    <mrow>
      <mo>(</mo><mn>1</mn><mo>/</mo><mi>f</mi><msup><mo>)</mo><mo>′</mo></msup>
      <mo>(</mo><msub><mi>x</mi><mi>n</mi></msub><mo>)</mo>
    </mrow>
  </mfrac>
</math>

Here `(1/f)(x)` means `1/f(x)`, and `′` means the derivative of the function.

You can see it takes the guess and steps in the direction of the derivative until it hits zero.

For `y = 1/sqrt(x)`, the function whose zero we want is `1/((1/y)^2-x)`, with derivative `(2 y)/(x y^2 - 1)^2`. Putting it together gives a giant mess that thankfully simplifies to `y' = y * ( 3/2 - ( x/2 * y * y ) )`, the exact formula from `Q_rsqrt`.

Newton's method is part of a family called [Householder's method](https://en.wikipedia.org/wiki/Householder%27s_method), which uses higher-order derivatives (derivatives of derivatives) in the numerator and denominator. Using a second order derivative is also called Halley's method. Higher-order derivatives give a better guess per iteration, so you need fewer, but each iteration costs more. Which one to use depends. Trial and error.

Deriving these by hand is a pain, so let the computer do it using [WolframScript](https://www.wolfram.com/wolframscript/), the language behind Wolfram Alpha and Mathematica.

<pre><code class="language-mathematica">(* Define your function eg. CubeRoot[x] *)
g[x_] := CubeRoot[x]

inv[x_] := FullSimplify[InverseFunction[g][x], Assumptions -&gt; x &gt; 0]

f[y_] := 1/(inv[y]-x)

Print["       Newton: ", FullSimplify[y+f[y]/f'[y]]]
Print["       Halley: ", FullSimplify[y+2*f'[y]/f''[y]]]
Print["Householder 3: ", FullSimplify[y+3*f''[y]/f'''[y]]]
Print["Householder 4: ", FullSimplify[y+4*f'''[y]/f''''[y]]]</code></pre>

In **Part IV** we will implement the other function and show error plots.
