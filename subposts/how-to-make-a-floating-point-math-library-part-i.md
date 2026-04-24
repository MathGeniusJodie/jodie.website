---
date: 2026-04-04
categories: [life]
parent: inkhaven
---
## How to Make a Floating Point Math Library, Part I

You might have seen [the fast inverse square root](https://en.wikipedia.org/wiki/Fast_inverse_square_root). The one with the magic hex constant `0x5F3759DF` and the comment _"what the fuck?"_ from the Quake III source. After reading this series, you'll understand how it works, and how to apply its arcane trickery to compute any transcendental function.

But first: what _is_ a float?

<p>
          <a target="_blank" href="https://en.wikipedia.org/wiki/Scientific_notation">Scientific notation</a>
          writes a number as a power of ten, multiplied by a value between 1 and 10 called the
          <em>significand</em> (or <em>mantissa</em>). Floats do the same thing in base&nbsp;2: the
          <em>exponent</em> stores ⌊log<sub>2</sub>(<em>x</em>)⌋, and the mantissa is between 1 and 2.
        </p>

<pre><code>┌sign┬─exponent──┬─mantissa─────────────────────┐
│ 0  │ 0000 0000 │ 000 0000 0000 0000 0000 0000 │
└────┴───────────┴──────────────────────────────┘
</code></pre>

[This calculator](https://www.h-schmidt.net/FloatConverter/IEEE754.html) lets you flip individual bits and watch the value change. You'll get a feel for how different numbers are represented.

### Manipulating Floats with Integer Operations

The upper bits of a float are proportional to the logarithm of its value. So integer math on the raw bits becomes log-domain arithmetic on the number itself.

<pre><code>log(<em>a</em> · <em>b</em>)     = log <em>a</em> + log <em>b</em>
log(<em>a</em> / <em>b</em>)     = log <em>a</em> − log <em>b</em>
log(<em>a</em><sup><em>b</em></sup>)        = <em>b</em> · log <em>a</em>
log(√<em>a</em>)        = log(<em>a</em>) / 2
log(1/<em>a</em>)       = −log(<em>a</em>)
log(1/√<em>a</em>)      = −log(<em>a</em>) / 2</code></pre>

Addition becomes multiplication. Subtraction becomes division. A right-shift by one becomes a square root… Wait… those last two are the inverse square root!

<p>
          The exponent of a number can be negative (for numbers smaller than&nbsp;1). 
          Floats handle this by storing the exponent as <code>exponent + 127</code>. The "magic" constant 
          <code>0x5F3759DF</code> is just 2<sup>127/2</sup>. The integer subtract combines the
          reciprocal and the multiplication by 2<sup>127/2</sup>. Two birds, one <code>SUB</code>.
        </p>

In **Part II**, we'll use this knowledge to implement other transcendental functions in code!
