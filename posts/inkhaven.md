---
date: 2026-04-01
categories: [life]
---
## We Have Inkhaven at Home

A friend of mine is going to this big fancy retreat called [Inkhaven](https://www.inkhaven.blog/) where you write one blog post a day. And I was like "I can't do that, but I'll sure as hell try!". I don't want to spam this blog, so I'll link my daily posts down here and I'll add the best ones to the main feed later after some polish.

<ul class="linklist">
    <li>April 1<sup>st</sup> - <strong><a href="https://morewrong.jodie.website/#how-to-leverage-effective-altruists-to-fix-housing" target="_blank">How to Leverage Effective Altruists to Fix Housing Prices in the Bay Area</a></strong> - MoreWrong</li>
    <li><details>
      <summary>April 2<sup>nd</sup> - <strong>Animal Welfare is a Culinary Problem</strong></summary>
      <article>
        <h2>Animal Welfare is a Culinary Problem</h2>
        <p>I agree with the vegans. Factory farming is horrific. I don't need another documentary. I'm convinced.</p>
        <h3>I had chicken last week.</h3>
        <p>Not because I watched it get its beak cut off and felt nothing, but because I was sick with the man flu and I wanted a comforting microwave meal, and butter chicken was all I could find.</p>
        <p>Most restaurants have one vegetarian option that only exists so they can say they tried. If you're a normal person who wants to eat with friends, well fuck you, you're eating fries.</p>
        <p>I cook a real meal once a day. Sometimes zero. I drink a premade protein shake instead. These shakes are load-bearing to my quality of life.</p>
        <h3>My body hates the obvious solution</h3>
        <p>The first thing anyone suggests when you try to eat less meat is legumes. Cheap, nutritious, available.</p>
        <p>They also make me fart.</p>
        <p>I've tried soaking them overnight. I've tried "just push through it, your gut adapts." My gut did not adapt. I also tried soylent, the only decent vegan meal replacement shake. Similar results. Worse than the beans actually.</p>
        <h3>Next time someone tells you they could never go vegan, send them a recipe.</h3>
        <p>The greatest impact I've had on animal welfare is telling people that <abbr>msg</abbr> makes tofu taste good. The person who's influenced me the most isn't an activist,
          it's <a href="https://www.youtube.com/@SauceStache/videos">this guy on YouTube who figured out how to make vegan bacon out of rice paper</a>.</p>
        <p>Animal welfare organizations should take a cut of their budget and put it into food science. Vegan food needs to compete with "regular" food, not be a niche specialty product. Fix the food and you get the ethics for free.</p>
      </article>
    </details></li>
    <li><details>
      <summary>April 3<sup>rd</sup> - <strong>Dust</strong></summary>
      <article>
        <h2>Dust</h2>
        <p>the ground under your feet<br>
        built from what ceased to be</p>

        <p>each grain of sand<br>
        a graveyard of forgotten stars</p>

        <p>your body only borrows<br>
        what the earth will reclaim</p>

        <p>the dust will call you home<br>
        the ground under a stranger's feet</p>
      </article>
    </details></li>
    <li><details>
      <summary>April 4<sup>th</sup> - <strong>How to Make a Floating&nbsp;Point Math Library, Part&nbsp;I</strong></summary>
      <article>
        <h2>How to Make a Floating&nbsp;Point Math Library, Part&nbsp;I</h2>
        <p>You might have seen <a target="_blank" href="https://en.wikipedia.org/wiki/Fast_inverse_square_root">the fast 
          inverse square root</a>. The one with the magic hex constant&nbsp;<code>0x5F3759DF</code>&nbsp;and the
          comment <em>"what the fuck?"</em> from the Quake&nbsp;III source. 
          After reading this series, you'll understand how it works, and how to apply its arcane trickery
          to compute any transcendental function.
        </p>

        <p>But first: what <em>is</em> a float?</p>

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
        <p>
          <a target="_blank" href="https://www.h-schmidt.net/FloatConverter/IEEE754.html">This calculator</a>
          lets you flip individual bits and watch the value change. You'll get a feel for how
          different numbers are represented.
        </p>
        <h3>Manipulating Floats with Integer Operations</h3>

        <p>
         The upper bits of a float are proportional to the logarithm of its value.
         So integer math on the raw bits becomes log-domain arithmetic on the number itself. 
        </p>
<pre><code>log(<em>a</em> · <em>b</em>)     = log <em>a</em> + log <em>b</em>
log(<em>a</em> / <em>b</em>)     = log <em>a</em> − log <em>b</em>
log(<em>a</em><sup><em>b</em></sup>)        = <em>b</em> · log <em>a</em>
log(√<em>a</em>)        = log(<em>a</em>) / 2
log(1/<em>a</em>)       = −log(<em>a</em>)
log(1/√<em>a</em>)      = −log(<em>a</em>) / 2</code></pre>

        <p>
          Addition becomes multiplication. Subtraction becomes division. A right-shift
          by one becomes a square root… Wait… those last two are the inverse square root!
        </p>
        <p>
          The exponent of a number can be negative (for numbers smaller than&nbsp;1). 
          Floats handle this by storing the exponent as <code>exponent + 127</code>. The "magic" constant 
          <code>0x5F3759DF</code> is just 2<sup>127/2</sup>. The integer subtract combines the
          reciprocal and the multiplication by 2<sup>127/2</sup>. Two birds, one <code>SUB</code>.
        </p>
        <p>In <strong>Part&nbsp;II</strong>, we'll use this knowledge to implement other transcendental functions in code!</p>

      </article>
    </details></li>
    <li><details>
      <summary>April 5<sup>th</sup> - <strong>Use Your Phone Less by Making It <em>More</em> Fun</strong></summary>
      <article>
        <h2>Use Your Phone Less by Making It <em>More</em> Fun</h2>
        <p>Digital minimalism advice is usually about making your phone worse. Add friction.
          Greyscale the screen. Buy a flip phone. 
        </p>
        <p>You don't have to make your phone miserable to use. The terminal goal isn't
          "use your phone less." The goal is doing the things you actually want to do. 
          You can read books on your phone, text your friends, write, navigate somewhere new. 
          None of that is the problem. When your phone only has those there's no void to fill by scrolling.
        </p>
        <h3>Remove Your Browser</h3>
        <p>
          Most things you'd use a mobile browser for have an app. Single purpose, no distractions.
          To look something up, AI chatbots and Wikipedia search are usually better tools.
        </p>

        <p>For the rare case you <em>need</em> a browser, there's 
          <a href="https://www.mozilla.org/en-CA/firefox/browsers/mobile/focus/">Firefox Focus</a>.
          When you close it, it wipes everything. No start page, no autocomplete, no history. 
          You can only go on websites intentionally. It doesn't keep you logged in either. 
          Every addictive platform requires a login. No login, no slop.
        </p> 

        <h3>And it Works?</h3>

        <p>Now when I pick up my phone reflexively to fill time, there's nothing to scroll.
          I put it down. Or I text a friend, read a book, write a blog post.
          No willpower. No discomfort. I never regret being on my phone.
        </p>
      </article>
    </details></li>
    <li><details>
      <summary>April 6<sup>th</sup> - <strong>How to Make a Floating&nbsp;Point Math Library, Part&nbsp;II</strong></summary>
      <article>
        <h2>How to Make a Floating&nbsp;Point Math Library, Part&nbsp;II</h2> 
        <p>With only what we've learned in part&nbsp;I, you could figure out reciprocals,
        cube roots, and square roots on your own. So I'll leave those for the end and 
        start with the less obvious exp2 and log2.
        </p>

        <p>If we could get the mantissa bits into the exponent, we'd get exp2 for free.
          But how would we actually do that? We want the number 1 to map to the number 2, 2 -&gt; 4, 
          and so on. Let's look at the bit representation.
        </p>
<pre><code>┌value┬─exponent──┬exp val┐
│  1  │ 0111 1111 │  127  │
│  2  │ 1000 0000 │  128  │
│  4  │ 1000 0001 │  129  │
│  8  │ 1000 0010 │  130  │
│ 16  │ 1000 0011 │  131  │
└─────┴───────────┴───────┘
</code></pre>

        <p>So we want the first 8 bits of the mantissa to be the input number + 127.
        For this we need to be at the order of magnitude where changing the 8th mantissa
        bit moves the value of the float by 1. That order of magnitude is 256.
        Then we need to add 127, which gets us 383.</p>

        <p>Let's try adding 383 to our input and shifting left by 8 bits, making sure
          to negate the number because we just shifted a bit into the sign of our float.</p>
<pre><code>fn exp2_approx(x: f32) -&gt; f32 {
  -f32::from_bits((x + 383.).to_bits() &lt;&lt; 8)
}</code></pre>

        <img loading="lazy" src="https://static2.mtlws.ca/exp2_approx.png" class="img-adapt-dark" alt="" width="480" height="480">

        <p>It works!</p>

        <p>To do log2 we just do the reverse: shift the exponent into the mantissa,
          set the order of magnitude to 256 and then subtract 383.
          </p>
<pre><code>fn log2_approx(x: f32) -&gt; f32 {
	f32::from_bits((x).to_bits() &gt;&gt; 8 | 256_f32.to_bits()) - 383.
}</code></pre>

        <img loading="lazy" src="https://static2.mtlws.ca/log2_approx.png" class="img-adapt-dark" alt="" width="480" height="480">

        <p>Boom! Easy as that.</p>

        <p></p>For completeness here's the remaining functions we've talked about:<p></p>

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
        <p>In <strong>Part&nbsp;III</strong>, we're learning how to make these crude approximations usably accurate!</p>
      </article>
    </details></li>
    <li><details>
      <summary>April 7<sup>th</sup> - <strong>What I Always Put in my CSS</strong></summary>
      <article>
        <h2>What I Always Put in my CSS</h2> 
        <p>I like when websites look like websites. Blue links that turn purple after you've clicked them, 
          serif fonts for body text, text that doesn't have a seizure as the page is loading. But I'm not a 
          <em>barbarian</em>. Even I have a few beefs with the default browser styles.</p>
        <h3>Absolute Unit Line Height</h3>
        <p>No matter the font size you use for different elements, the line height stays consistent.
          You don't break the baseline grid unless you explicitly decide to.
        </p>
<pre><code>html {
  line-height: 23px;
}
</code></pre>
        <h3>Default Border Color</h3>
        <p>I don't have to manually set the border color on each individual element.
          I can just set the border width and it gets a default color.
        </p>
<pre><code>* {
  border: solid 0;
  border-color: inherit;
}</code></pre>
        <h3>Disabled Dingbats</h3>
        <p>If I use text as decoration, like decorative bullets or separators.
          I make sure that selecting and copying the text doesn't include the decorations.
        </p>
<pre><code>[aria-hidden="true"] {
  user-select: none;
}</code></pre>
        <h3>Never Abandon the Orphans</h3>
<pre><code>h1, h2, h3, h4, h5, h6 {
  text-wrap-style: balance;
}
p {
  text-wrap-style: pretty;
}</code></pre>
        <h3>Good Helvetica</h3>
        <p>I prefer serif fonts for copy, and I use <code>system-ui</code> for web apps,
          as one should. But if I want to use a sans-serif font, I <em>never</em> use
          <code>sans-serif</code>. <code>sans-serif</code> exposes your visitors to the
           horrors of Helvetica and Arial.
        </p>
        <p>Luckily, most platforms have a font designed specifically to be a good version of Helvetica.
          Apple devices have Helvetica Neue, Google devices have Roboto, desktop Linux has Noto.
          Windows has... well, it has Segoe UI, which you get via <code>system-ui</code>.</p>
<pre><code>font-family: 'Helvetica Neue', Roboto, 'Noto Sans', system-ui, sans-serif</code></pre>

        <h3>Make Wide Elements Scrollable</h3>
        <p>To prevent them being cut-off on smaller screens</p>
<pre><code>pre, table {
  overflow-x: auto;
  max-width: 100%;
}</code></pre>
        <div role="separator" class="⁂"></div>
        <p>Support dark and light mode with a single line of code. No need to make custom styles!</p>
<pre><code>html {
  color-scheme: light dark;
}</code></pre>
        <p>Make margins match the line height.</p>
<pre><code>p, ol, ul, h1, h2, h3, h4, h5, h6, blockquote {
  margin-block: 1lh;
}</code></pre>
        <p>Prevent <code>&lt;sub&gt;</code> and <code>&lt;sup&gt;</code> from messing with the line height.</p>
<pre><code>sub, sup {
  line-height: 0;
}</code></pre>

        <p>Automatically keep aspect ratio when you change the width.</p>
<pre><code>img, video {
  height: unset
}</code></pre>
        <p>Flexbox items have <code>min-width:auto</code>, which means items
          refuse to shrink below their content size. <code>0</code> is a much better default.</p>
<pre><code>* {
  min-width: 0;
  min-height: 0;
}</code></pre>
      </article>
    </details></li>
  </ul>

<ul class="linklist">
    <li><details>
      <summary>April 8<sup>th</sup> - <strong>Sleepmaxxing</strong></summary>
      <article>
        <h2>Sleepmaxxing</h2>
        
        <p>I used to think that all I needed to maximize my sleep was widely
          known and on the first page of google, but now I've gotten to the
          point where obscure and original methods probably contributed to my
          sleep quality more than the obvious ones.
        </p>

        <h3>The Obvious</h3>
        <p>Sleeping at the same time every night, even weekends, is non-negotiable.
          Winding down before bed is also important. Not eating before bed also helps
          (I have my last meal 4 hours before). Exercise makes me sleep a bit better
          but it isn't load-bearing. Other sleep tips haven't helped me enough to
          rule out placebo: avoiding blue light, melatonin, white noise.
        </p>

        <h3>Blackout Curtains ++</h3>
        <p>Regular blackout curtains leave a gap and light bounces between the wall
          and the curtain, leaking light into the room. Dark colored curtains aren't
          enough, as the light bounce is
          <a href="https://en.wikipedia.org/wiki/Specular_reflection" target="_blank">specular</a>.
          You want velvet, or <a href="https://www.musoublack.com/collections/fabrics" target="_blank">Musou&nbsp;Black fabric</a>, if you're fancy.
          You also want to make a flexible gasket at the
          bottom of the window frame, again with black felt, unless your curtains
          go all the way to the floor, that's the key.
        </p>

        <h3>Mobility</h3>
        <p>I've been moving every single joint in my body through its entire range of
          motion every single day. Just moving them, no holding stretches.
          Since then, I never feel achy, I'm more flexible, more agile. I can
          confidently do novel physical things without warming up and I never
          get hurt doing a weird movement (especially when I sleep). The best
          thing I ever did for my fitness in general, better than stretching and
          lifting weights.
        </p>

        <p>The biggest surprise was the effect on sleep! Holy shit! More significant
          improvement than even the blackout curtains. It takes about 10 minutes,
          and since doing it daily, I spend 30 minutes less in bed from sleeping better.
          It's free! This bit deserves its own dedicated article which I will post soon.
        </p>

        <h3>Less Could Be More</h3>
        <p><a href="https://pubmed.ncbi.nlm.nih.gov/3563247/" target="_blank">Oversleeping is a real thing</a>.
          Spending too much time in bed makes you sleep more lightly and gives you insomnia
          because you don't have enough sleep pressure built up. Poor sleep, even lots of it,
          can lead to being more tired and feeling even more symptoms of sleep deprivation,
          convincing you that you need more sleep, and making the problem worse.
        </p>

        <p>This was probably my biggest problem. I was spending 10-12 hours in bed,
          taking naps, and had horrible insomnia and the WORST sleep. Sleeping less fixed me.
        </p>

        <h3>Firmer Mattress but with More <a href="https://knowyourmeme.com/memes/more-dakka" target="_blank">Dakka</a></h3>
        <p>Sounds silly, but try sleeping on a yoga mat or a rug. It'll take a few days to
          adapt, but you might get better sleep. I know I did, but it's weird enough that
          I don't trust it'll work on everyone.
        </p>

        <h3>Being Slightly Overweight Can be Surprisingly Bad for You</h3>
          I was only 20 pounds overweight. I didn't even think I was overweight.
          I thought I had just lost the genetic lottery and just had acid reflux
          and sleep apnea for no reason. Well, turns out losing 20 pounds fixed both.
        <p></p>

        <h3>Piss Management</h3>
        <p>I learned that drinking too <em>little</em> can also make you pee more. Urine
          that is too concentrated irritates your bladder. Try drinking more water
          if you think you have a naturally small bladder, you might not have a
          small bladder at all. I didn't. You might also just wake up in the
          middle of the night simply from habit. Just going back to sleep without
          peeing for a few days might reset you.
        </p>

        <div role="separator" class="⁂"></div>

        <p>I fixed my sleep by sleeping less, on the floor, after drinking more
          water in order to pee less. If someone told me all this two years ago
          I would've blocked them. Do not trust me. I am not a doctor.
        </p>
      </article>
    </details></li>
    <li><details>
      <summary>April 9<sup>th</sup> - <strong>The Laziest Strength Program that Works</strong></summary>
      <article>
        <h2>The Laziest Strength Program that Works</h2>
        <p>Most people who don't do strength training think that they don't have the time or energy. Well good news! Being incredibly lazy gets you 80% of the benefits of spending hours in the gym, being sore, and using willpower. With this method, there is no sacrifice, you just get stronger with no downside.</p>
        <h3>No Friction</h3>
        <p>Find exercises that require 0 equipment. Not even a clean floor. You want something you can do literally anywhere, including at work. There has to be no excuse not to do them. Everyone has a few seconds of downtime every day.</p>
        <p>You want exercises that you can do as someone completely untrained and keep doing as you get very strong with minor changes. The ultimate hack is unilateral exercises. You can assist yourself with the other side of your body and give yourself any level of resistance you need.</p>
        <h3>Leg &amp; Hip Extension</h3>
        <p>Pistol squats. Assist yourself with your other leg to make them as easy as you want when you're starting out. </p>
        <h3>Pushing</h3>
        <p>One arm wall pushup. Better than regular pushups because you can do them in public places without putting your hands on the dirty floor. You can progress slowly by helping yourself with the other hand.</p>
        <h3>Pulling</h3>
        <p>This one doesn't have a name so I'm calling it the "one-arm wall lat press". Progress by standing further from the wall.</p>
        <figure>
          <img src="https://static2.mtlws.ca/latpress.png" style="width:200px" loading="lazy" alt="" width="415" height="480">
        </figure>
        <p>Self-resisted curl: grab your thigh above your knee and curl it. You can control the resistance by flexing your hamstring/glute.</p>
        <h3>Hamstrings</h3>
        <p>While sitting, press the backs of your calves into the legs of the chair as hard as you can. That's it. You can do this during a meeting and nobody will ever know. Unless you make weird faces.</p>
        <h3>Abs</h3>
        <p>Lie on your back with your legs pointed straight at the ceiling. Raise your hips off the ground by contracting your abs, pushing your feet toward the ceiling. You can do this in bed before sleeping or after waking up. You don't even have to get up. What's lazier than that?</p>
        <h3>The Program</h3>
        <p>Do half the exercises one day and half the other day. Just do one set, you'll make progress anyway.</p>
        <p>But here's what'll actually happen: you'll want to do more, because you've removed every reason not to. No gym. No time. No willpower. Just get a little stronger every day, for free.
        </p>
      </article>
    </details></li>
    <li hidden=""><details>
      <summary>April 10<sup>th</sup> - <strong>Ordered Dithering is Useful and Good</strong></summary>
      <article>
        <h2><a href="https://en.wikipedia.org/wiki/Ordered_dithering" target="_blank">Ordered Dithering</a> is Useful and Good</h2>
        <p>Dithering is the old trick of using patterns to fake more colors than you actually have.
          If you've ever noticed the crosshatch pattern in old video games, that's ordered dithering.
          It uses a repeating grid called a Bayer Matrix. It's carefully constructed so that adjacent
          values are as far apart as possible, which maximally spreads error. Modern game
          developers, in their infinite wisdom, have decided that this mathematical perfection is
          a problem to be fixed. The regular pattern is too noticeable, they say. Instead they make
          a fancy precomputed texture that has the same properties but with no regular pattern: Blue Noise.</p>
        <p>Sure, blue noise looks great. But somewhere along the way we forgot why we're dithering in the
          first place: to save memory. If you need a texture lookup to do dithering, you're spending
          bandwidth to save bandwidth, it makes no sense. Ordered dithering is just 18 instructions
          to compute from scratch.</p>
<pre><code>float dither256x256(uvec2 fragCoord){
  uint x = fragCoord.x ^ fragCoord.y;
  uint y = fragCoord.y;
  uint z = x &lt;&lt; 16 | y;
  z |= z &lt;&lt; 12;
  z &amp;= 0xF0F0F0F0u;
  z |= z &gt;&gt; 6;
  z &amp;= 0x33333333u;
  z |= z &lt;&lt; 3;
  z &amp;= 0xaaaaaaaau;
  z  = z &gt;&gt; 9 | z &lt;&lt; 6;
  z &amp;= 0x7fffffu;
  return uintBitsToFloat(
    floatBitsToUint(1.) | z
  ) - 1.5; // or -1.0 if you want 0..1
           // instead of -0.5..0.5
}</code></pre>
        <p>
          I came up with this independently around 2016<a role="doc-noteref" href="#dither-notes">*</a>. I found recently that the general idea of
          interleaving and reversing bits was first described
          <a href="https://bisqwit.iki.fi/story/howto/dither/jy/" target="_blank">here</a><a id="#dither-noteref" role="doc-noteref" href="#dither-notes">*</a>. But I'm
          the first person to make this optimized implementation<a role="doc-noteref" href="#dither-notes">*</a>. Which is probably why it hasn't caught on yet.
        </p>
        <p>When you're doing graphics programming, fast dithering should always be in your metaphorical
          tool belt. You should <em>never</em> reach for higher bit depth without having first tried
          dithering. Here's an example of how even rgb8 is overkill. This is a comparison between
          rgb8 and rgb453. Can you tell which one is which?</p>
        <style>
          #img-bitdepth-1:not(#bitdepth-1:checked ~ #img-bitdepth-1),
          #img-bitdepth-2:not(#bitdepth-2:checked ~ #img-bitdepth-2){
            display: none;
          }
        </style>
        <figure>
          <label for="bitdepth-1">Bit Depth 1</label>
          <input type="radio" checked="" name="quantization" id="bitdepth-1">
          <label for="bitdepth-2">Bit Depth 2</label>
          <input type="radio" name="quantization" id="bitdepth-2">
          <img loading="lazy" src="https://static2.mtlws.ca/rgb453.png" alt="" id="img-bitdepth-1" width="640" height="360">
          <img loading="lazy" src="https://static2.mtlws.ca/original.png" alt="" id="img-bitdepth-2" width="640" height="360">
        </figure>
        <p>Now here's without the dithering:</p>
        <figure>
          <img loading="lazy" src="https://static2.mtlws.ca/rgb453nodither.png" alt="" width="640" height="360">
        </figure>
        <p>This is how huge the difference is!
          You're throwing away half your ram by not dithering all your buffers.</p>
        <h3>Not Just for Quantization</h3>
        <p>You can (and should) use Bayer Matrices everywhere you would use random sampling,
          like for picking ray directions for lighting.</p>
        <figure>
          <img loading="lazy" src="https://static2.mtlws.ca/ibl-1s.png" alt="" width="640" height="360">
          <figcaption>One sample per pixel<br>Noise on the left, Bayer Matrix on the right</figcaption>
        </figure>
        <p>At only one sample per pixel, you can see how the Bayer Matrix grain could 
          easily be smoothed with a light blur. The noise grain has no chance.</p>
        <figure>
          <img loading="lazy" src="https://static2.mtlws.ca/ibl-8s.png" alt="" width="640" height="360">
          <figcaption>8 samples per pixel<br>Noise on the left, Bayer Matrix on the right</figcaption>
        </figure>
        <p>At eight samples per pixel, the Bayer Matrix sampling looks smooth already
          while the noise sampling still looks rough.</p>
        <p>Blurring white noise just gets you a splotchy mess, which you have to fix
          by doing more samples, or a wider blur. Choosing to use white noise is the
          dead raccoon in the river that makes everything downstream shit itself.</p>
        <p>For temporal effects, you can also use the 1D equivalent of a bayer matrix:
          reversing the bits for the index of the current frame, which gives this pattern:</p>
        <figure>
          <img loading="lazy" src="https://static2.mtlws.ca/1d.png" alt="" width="640" height="360">
        </figure>
        <div role="separator" class="⁂"></div>
        <p>With technological progress, as pixel densities get higher and higher,
          dither patterns become harder and harder to see and vram gets more and more
          strained. Ordered dithering isn't just the past, it's the future as well!</p>
        <ul role="doc-endnotes" id="#dither-notes">
          <li><a role="doc-footnote" href="#dither-noteref">* As far as I know.</a></li>
        </ul>
      </article>
    </details></li>
    <li>April 10<sup>th</sup> - <strong><a href="https://graphics-programming.org/blog/ordered-dithering-is-useful-and-good" target="_blank">Ordered Dithering is Useful and Good</a></strong> - graphics-programming.org</li>
    <li><details>
      <summary>April 11<sup>th</sup> - <strong>Miscellaneous Quick Thoughts</strong></summary>
      <article>
        <h2>Miscellaneous Quick Thoughts</h2>
        <h3>Dailies</h3>
        <p>Being able to do something every day is mandatory for so many things to work: exercise, vitamins, brushing your teeth, learning a skill. Without a checklist, new habits don't happen. You do them for three days, forget on the fourth, and never come back. It's not a willpower issue. It's a systems issue.
        </p>
        <p>A checklist turns intention into something real. There's an empty box. You check it. Make it really real. Apps don't stare you down all day. Put a piece of paper on your wall. 
        </p>
        <h3>Self-Throttling Snacks for Pareto Optimal Delight to Weight-Loss Ratio</h3>
        <ul>
          <li><strong>pretzels:</strong> eat too many and they start tasting like dehydration</li>
          <li><strong>pineapples:</strong> they dissolve your tongue 🥰</li>
          <li><strong>jerky:</strong> makes your jaw hurt</li>
        </ul>
        <h3>Running Up the Stairs</h3>
        <p>I started running up the stairs as fast as possible, every time. I save time by
          missing the bus less. My cardio is also so much better. Free lunch.
        </p>
        <h3>Raid 1 is Underrated</h3>
        <p>Double the read speed <em>and</em> redundancy?</p>
      </article>
    </details></li>
    <li><details>
      <summary>April 12<sup>th</sup> - <strong>You aren't supposed to <em>finish</em> a todo list</strong></summary>
      <article>
        <blockquote>
          <em>Life is not a problem to be solved, but a reality to be experienced.</em>
          <br>
          ― Soren Kierkegaard
        </blockquote>
        <h2>You aren't supposed to <em>finish</em> a todo list</h2>
        <p>Humans like progress. So we get satisfaction from our todo list getting shorter. But this creates a bad incentive: adding a task makes the list longer, which feels like regression. So you stop adding things. And forget them.</p>
        <p>Cross off finished items, leaving them visible. Now the number you're optimizing is tasks done, not tasks remaining. Adding tasks becomes an opportunity instead of a burden.</p>
        <h3>Friendly Problems</h3>
        <p>Don't hesitate to add trivial tasks. Like taking a walk or making tea. Everything deserves to be on there.  You're collecting achievements, the more the better. Finishing easy tasks builds momentum. It turns chores into a fun game.</p>
      </article>
    </details></li>
    <li><details>
      <summary>April 13<sup>th</sup> - <strong>Excuses are Todos</strong></summary>
      <article>
        <blockquote>
          <em>The impediment to action advances action, what stands in the way becomes the way.</em>
          <br>
          ― Marcus Aurelius
        </blockquote>
        <h2>Excuses are Todos</h2>
        <p>An excuse is a todo item with a bad attitude.</p>
        <p>"I'd start a blog but I don't know how to set up a website." Not knowing how to set up a website isn't an immutable fact about the universe. That's a thing you can fix by learning how to set up a website. That's a todo. "I'd eat better but I don't know how to cook." Same thing. The excuse contains the solution. Todo.</p>
        <p>Now the meta-reason why you don't learn HTML and cooking is probably that you don't have the time or energy right now. That's the beauty of a todo: when you catch yourself saying "I can't because X", you write down "fix X". You have no obligation to fix X. It's just there in case you're bored or motivated one day in the future.</p>
        <p>Can't fix X because of Y? That's just another todo. Can't fix Y because of Z? Write that down too. You've turned moaning into a step-by-step plan.</p>
        <p>Found something outside your control? You've still made progress. You found out that your real reason was further down the chain. You can file the task under "impossible" and forget about it instead of filing it under "I'm too lazy" and letting it nag at you.</p>
      </article>
    </details></li>
    <li><details>
      <summary>April 14<sup>th</sup> - <strong>Flicker</strong></summary>
      <article>
        <h2>Flicker</h2>
        <p>wearing faces stitched from others<br>playing parts we barely know</p>
        <p>building walls with politeness<br>filling gaps with white noise</p>
        <p>shallow prayers rarely answered<br>arms outstretched but never touching</p>
        <p>pressing our palms to the glass<br>searching for a pulse behind the glow</p>
        <p>under the electric delirium of neon rain<br>we stand, mouths open</p>
        <p>we mistake the flicker for warmth<br>mistake the warmth for love</p>
      </article>
    </details></li>
  </ul>

<ul class="linklist">
    <li><details>
      <summary>April 15<sup>th</sup> - <strong>Everything is Awesome</strong></summary>
      <article>
          <h2>Everything is Awesome</h2>
          <p>We're so focused on not feeling bad emotions that we forget to feel good ones. Zero isn't the goal. A positive number is the goal.</p>
          <p>Nothing is too mundane to make you overjoyed. Imagine a child seeing a grocery store for the first time. Imagine them seeing a gym, which is basically a playground for adults. Hamsters run in their wheel for fun, and we're so bored by running on a treadmill that we have to watch TV. But when you stop and think about it, those things are AWESOME. Yes, <em>awesome</em>, as in, something that inspires awe.</p>
          <p>We've collectively stopped looking out the airplane window in amazement. Instead we're annoyed at the crying baby, the most miraculous thing on the plane. Complaining about the bad food, while ignoring the magic of the global supply chain that put it on our tray.</p>
          <p>Be the kind of person who shrugs off the bad things and gets genuine, childlike joy from the things everyone else finds mundane. Be the kind of person who gets so excited about the tofu in their fridge not being expired that they text their friend about it. Be the kind of person who thinks the last snow of the winter is as beautiful as the first. Look out the window. Isn't it awesome?</p>
      </article>
    </details></li>
    <li><details>
      <summary>April 16<sup>th</sup> - <strong>Price per Year</strong></summary>
      <article>
          <h2>Price per Year</h2>
          <p>Most people's spending intuitions are backwards. They'll price
            compare for $50-100 jeans, then sleepwalk into a 1k/year higher car
            payment. One of these decisions matters. It's not the jeans.</p>
          <p>When you budget, always multiply by frequency. A $5 daily coffee
            is a $1,825 annual expense. A $200 pair of boots you buy every two
            years is a $100 yearly expense. Sure, they both bring you joy.
            One of them just costs 18 times more. Daily and monthly expenses
            are where fortunes are quietly made or lost.</p>
          <p>The cheap shoes that hurt your feet? A bad mattress or a slow
            laptop that you use eight hours a day? For a $100 saving per year?
            Saving 10% on groceries and rent will save you thousands yearly.</p>
          <p>Negotiate, optimize, and shop around <em>hard</em> for frequent expenses.
            Consider big lifestyle changes. Those things will compound over
            years and improve your quality of life. And the nicer boots will too.</p>
      </article>
    </details></li>
    <li><details>
      <summary>April 17<sup>th</sup> - <strong>How to Make a Floating&nbsp;Point Math Library, Part&nbsp;III</strong> (draft)</summary>
      <article>
          <h2>How to Make a Floating&nbsp;Point Math Library, Part&nbsp;III</h2>

<p>In Parts I and II we built approximations for <code>exp2</code>, <code>log2</code>,
  <code>sqrt</code>, <code>rsqrt</code>, <code>cbrt</code>, and <code>rcp</code>. 
  They get the order of magnitude right, which is crucial for floating&nbsp;point, but
  they're off by a few percent, which is useless for most things.</p>

<p>The next few installments are about <a href="https://en.wikipedia.org/wiki/Numerical_analysis">numerical analysis</a>,
   a field of math dedicated to approximating transcendental functions with elementary functions
    (which have CPU instructions). I'm skipping past most of the theory and focusing on software
     tools that do the math for us.</p>

<h4>Numerical Analysis Part&nbsp;I: Iterative Refinement</h4>

<p>Back to the Quake III reciprocal square root. We're looking at the part after the bit hacking.</p>

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

<p>The idea: you have a cheap, bad guess at <code>f(x)</code>. You also have a 
  formula that turns that guess into a better one. Apply the formula until the 
  guess is accurate enough.</p>

<p>If you stare at the math, you can kinda tell what it's doing. <code>x2 * y * y</code>
   is <code>0.5 * x / sqrt(x) / sqrt(x)</code>, and <code>x / sqrt(x) / sqrt(x) == 1</code>. 
   Because we only have a bad approximation of <code>1/sqrt(x)</code>, our <code>1</code> 
   is the error between the true value and the approximate value. The rest of the formula 
   scales it, since the error we have is on the <em>square</em> of <code>f(x)</code>, not
    <code>f(x)</code> itself. We can't get the error of <code>f(x)</code> directly without knowing
     the ground truth, which is what we're trying to compute in the first place, so this is 
     also an approximation. Hence the iterations.</p>

<p>There's a systematic way to derive the iteration formula: 
  <a href="https://en.wikipedia.org/wiki/Newton%27s_method">Newton's method</a>.</p>

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

<p>Here <code>(1/f)(x)</code> means <code>1/f(x)</code>, and <code>′</code> 
  means the derivative of the function.</p>

<p>You can see it takes the guess and steps in the direction of the derivative until it hits zero.</p>

<p>For <code>y = 1/sqrt(x)</code>, the function whose zero we want is <code>1/((1/y)^2-x)</code>,
  with derivative <code>(2 y)/(x y^2 - 1)^2</code>. Putting it together gives a giant mess that thankfully
  simplifies to <code>y' = y * ( 3/2 - ( x/2 * y * y ) )</code>, the exact formula
  from <code>Q_rsqrt</code>.</p>

<p>Newton's method is part of a family called 
  <a href="https://en.wikipedia.org/wiki/Householder%27s_method">Householder's method</a>,
  which uses higher-order derivatives (derivatives of derivatives) in the numerator
  and denominator. Using a second order derivative is also called Halley's method. 
  Higher-order derivatives give a better guess per iteration, so you need fewer, 
  but each iteration costs more. Which one to use depends. Trial and error.</p>

<p>Deriving these by hand is a pain, so let the computer do it using
  <a href="https://www.wolfram.com/wolframscript/">WolframScript</a>,
  the language behind Wolfram Alpha and Mathematica.</p>

<pre><code class="language-mathematica">(* Define your function eg. CubeRoot[x] *)
g[x_] := CubeRoot[x]

inv[x_] := FullSimplify[InverseFunction[g][x], Assumptions -&gt; x &gt; 0]

f[y_] := 1/(inv[y]-x)

Print["       Newton: ", FullSimplify[y+f[y]/f'[y]]]
Print["       Halley: ", FullSimplify[y+2*f'[y]/f''[y]]]
Print["Householder 3: ", FullSimplify[y+3*f''[y]/f'''[y]]]
Print["Householder 4: ", FullSimplify[y+4*f'''[y]/f''''[y]]]</code></pre>

<p>In <strong>Part&nbsp;IV</strong> we will implement the other function and show error plots.</p>

      </article>
    </details></li>
    <li><details>
      <summary>April 18<sup>th</sup> - <strong>Minimum Viable Inkhaven (Movie Recommendations)</strong></summary>
      <article>
        <p>Sometimes showing up is what matters most.</p>
        <h2>Underrated Movies you should (re)Watch</h2>
        <ul>
          <li><strong>The Matrix Resurrections</strong> - Refreshingly hope-punk, especially for something set in one of the most depressing scifi universes. Genuinely my favorite Matrix movie.</li>
          <li><strong>Star Wars: The Last Jedi</strong> - Ok, I agree with the consensus. Episode V is the best Star Wars movie, but The Last Jedi is my second favorite.</li>
          <li><strong>Nimona</strong> - Watching this movie changed me. It explores a particular theme (no spoilers) like no other movie does.</li>
          <li><strong>Snatch</strong> - Fun! Quotable! Badass!</li>
        </ul>
      </article>
    </details></li>
    <li><details>
      <summary>April 19<sup>th</sup> - <strong>How to Make a Floating&nbsp;Point Math Library, Part&nbsp;IV</strong></summary>
      <article>
        <h2>How to Make a Floating&nbsp;Point Math Library, Part&nbsp;IV</h2>
        <p>Square roots have a CPU instruction, so let's skip them and go straight to cube roots.
            Running our wolframscript gives:</p>
          
<pre><code>$ wolframscript -file getnewton.wls
Newton: (x + 2*y^3)/(3*y^2)
Halley: (2*x*y + y^4)/(x + 2*y^3)</code></pre>

        <p>Combined with the approximation we made in Part&nbsp;II:</p>
<pre><code>fn cbrt_halley(x: f32) -&gt; f32 {
  let y = f32::from_bits(0x2a5063f7 + (x.to_bits() / 3));
  (2.*x*y + (y*y)*(y*y)) / (x + 2.*(y*y)*y)
}
fn cbrt_newton(x: f32) -&gt; f32 {
  let y = f32::from_bits(0x2a5063f7 + (x.to_bits() / 3));
  (x + 2.*(y*y)*y) / (3.*(y*y))
}</code></pre>
        <p>Let's look at the accuracy.</p>
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
        <p>Orders of magnitude better, but still not enough. Another iteration:</p>
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

        <p>Perfect! Our average error is under one bit. Good enough for a standard library. Now let's try with <code>log2</code>.</p>

<pre><code>g[x_] := Log[x,2]

$ wolframscript -file getnewton.wls
Newton: (y*(y - (x*y)/2^y^(-1) + Log[2]))/Log[2]</code></pre>

        <p>Oh no! The iteration needs <code>2^y</code> which is <code>exp2</code>. Let's try <code>exp2</code> then:</p>
<pre><code>g[x_] := 2^x

jodiemath-rs $ wolframscript -file getnewton.wls
Newton: y*(1 + x*Log[2] - Log[y])</code></pre>
        <p>And <code>exp2</code> needs <code>log2</code>. We have a bootstrapping problem. We need a different strategy:
          approximation theory.
        </p>

        <p>In <strong>Part V</strong> we'll learn non-iterative approximation methods to implement exponentials and logarithms.</p>

      </article>
    </details></li>
    <li><details>
      <summary>April 20<sup>th</sup> - <strong>Thinking is Expensive, Doing is Cheap</strong></summary>
      <article>
        <h2>Thinking is Expensive, Doing is Cheap</h2>

<p>What's more draining? Doing the thing you don't want to do, or deliberating for hours about whether to keep procrastinating?</p>
<p>When you design systems for yourself (lists, calendars, flowcharts), which bottleneck are you actually relieving?</p>
<p>All my clothes fitting together isn't about resisting bad outfits, it's about not having to pick. Having protein shakes around as a default meal isn't willpower against junk food. It's about not having to decide what to eat.</p>
<p>The idea that willpower is finite <a href="https://en.wikipedia.org/wiki/Ego_depletion">got popular</a>. But <a href="https://pubmed.ncbi.nlm.nih.gov/26076043/">nobody's measured enough of an effect to conclude that it matters at all</a>. What <em>is</em> real is that <a href="https://www.cell.com/current-biology/fulltext/S0960-9822(22)01111-3">thinking is tiring</a>.</p>
<h3>Discipline is Just a Plan</h3>
<p>If you want to reduce a behavior, have a plan. Have a hard rule that you follow by default. No cigarettes unless you get offered one, no dessert on weekdays, no tiktok before 5pm.</p>
<p>Following the plan keeps you in heuristic/execution mode. No thinking, you're just <em>doing</em>. The aversion to doing the thing is real but overriding it doesn't deplete your energy.</p>
<p>Not following the plan puts you in deliberation mode. Is this a legitimate reason to deviate? What will I do instead? Is "instead" better or am I just lying to myself? Will I regret this? And then you have to live with the decision, which means thinking about if it was right, which is more deliberation. You've converted a cheap execution task into an expensive meta-task about whether to execute.</p>
<h3>Grindset Considered Harmful</h3>
<p>Undisciplined people work <em>harder</em>. They're <em>more</em> exhausted. </p>
<p>They spend their thinking budget on negotiating with themselves and have little left for actual work. The prevailing idea that discipline is "grinding" and "sacrifice" is harmful and just <em>wrong</em>. People who are exhausted assume they can't do it and don't try.</p>
<p>Moral judgements about lack of discipline make the exhaustion even worse through guilt. <em>Replacing Guilt</em> by Nate Soares was one of the most influential books on my life. Without guilt, I can work hard indefinitely. Guilt is so tiring that it was my bottleneck.</p>
<p>Disciplined people don't have some mysterious extra capacity. They just skip the cost of meta-decisions and guilt-processing. A disciplined person runs in heuristic-mode all day and has their thinking budget available for real problems.</p>
<h3>Grayshirting</h3>
<p>The Mark Zuckerberg gray t-shirt is the tip of a giant grey iceberg, the most visible part of an entire lifestyle.</p>
<p>Grayshirting isn't about sameness. Zuckerberg could hire a stylist. It's about reserving thinking for what matters.</p>
<p>Grayshirt the grayshirtable. Make checklists, calendars and flowcharts for everything. Make routine routine and make the correct thing the easy thing.</p>
<h3>Even Planning can be Doing</h3>
<p>The common productivity advice of breaking big tasks into smaller chunks isn't just about small tasks feeling less daunting. Decomposition and planning <em>is</em> the hard part, once it's done the execution is often trivial.</p>
<p>The planning can also be systematic. What kind of task is this?
  What's the standard shape of the solution? What are the typical sub-steps?
  Hell, just get an AI to do it.</p>
<p>Use your thinking capacity for high level planning. For figuring out what's wrong and for the efficient way to fix it.</p>
<div role="separator" class="⁂"></div>
<p>The other day I bought a tally counter. I click it when I do what I'm supposed to immediately, instead of deliberating. Despite having the concept of "thinking is hard" in the front of my mind for years, I'm at 24 and it's not even noon. Microdecisions are everywhere.</p>
<p>Start noticing. The more you notice, the more "willpower" just happens. I guarantee you'll be less exhausted too.</p>

<p role="separator"></p>

<p>Further reading:</p>
<ul>
<li><a href="https://jodie.website/#happiness">https://jodie.website/#happiness</a></li>
<li><a href="https://www.speakandregret.michaelinzlicht.com/p/the-collapse-of-ego-depletion">https://www.speakandregret.michaelinzlicht.com/p/the-collapse-of-ego-depletion</a></li>
</ul>

      </article>
    </details></li>
    <li>April 21<sup>st</sup> - <strong><a href="https://morewrong.jodie.website/#how-to-signal-high-agency" target="_blank">How to Signal High Agency Without Actually Doing Anything</a></strong> - MoreWrong</li>
  </ul>

<ul class="linklist">
    <li><details>
      <summary>April 22<sup>nd</sup> - <strong>In Defense of Directionless Dabbling</strong></summary>
      <article>
        <h2>In Defense of Directionless Dabbling</h2>
        <p>A year of guitar makes you a mediocre guitarist. 12 months of 12 hobbies makes you 12 people in a trenchcoat.</p>
        <p>The case against dabbling is that you won't get good at anything. So what? You weren't going to get good at the one thing either. You were going to quit at month four when it got boring, and then feel bad about quitting.</p>
        <h3>
          The First Month Is the Best Month</h3>
        <p>Hobbies have a honeymoon. The first time you solder something that works. The first loaf of bread that tastes delicious. The first time you touch your toes. One hobby gets you one honeymoon, 40 weeks of "I should practice" and diminishing returns. 12 hobbies gets you 12 honeymoons.</p>
        <p>You'll know enough to talk to hobbyists and learn tricks from them, instead of making them explain "The Thing 101" for the thousandth time. You'll get rid of the learned helplessness of "I don't know how to do that". You'll learn the skills that generalize. After a month, guitar just teaches you more guitar.</p>
        <h3>You Find the One by Trying Twelve</h3>
        <p>People who stuck with a thing for twenty years didn't start with that thing. They tried stuff. Something clicked, and they kept going because they wanted to. The one thing you'll get good at is the thing you can't stop doing.</p>
        <p>The goal shouldn't be to become The Bread Guy. It's finding out what being The Bread Guy feels like, and seeing if it feels like you.</p>
      </article>
    </details></li>
    <li><details>
      <summary>April 23<sup>rd</sup> - <strong>Static</strong></summary>
      <article>
        <h2>Static</h2>
<p>
in the silence between words<br>
waiting for you to listen<br>
a language older than language<br>
the heartbeat, the first music
</p>
<p>
from the static, whispers<br>
from the whispers, a god
</p>
<p>
dreaming on a blank page<br>
calling it scripture<br>
hiding the obvious<br>
in plain view
</p>
<p><a href="https://inv.thepixora.com/embed/J4A3U75qzg8?t=6" target="_blank" style="text-decoration: none;">⣀⠄⢠⣤⠐⢀⣠⠖⠂⣀⠠⣠⡀⢀⠄⣠⠂<br>
⡠⣀⠐⠄⣀⠠⣤⠂⢀⠠⣠⠐⠁⡀⣀⠄⢀⣠<br>
⢀⠂⣠⠠⣀⠐⢠⣀⠄⣠⠂⡀⣠⠐⠄⢀⡠⠂</a></p>
      </article>
    </details></li>
    <li>April 24<sup>th</sup> - <strong><a href="https://morewrong.jodie.website/#rlhf-but-the-r-stands-for-rat" target="_blank">RLHF but the R Stands for Rat</a></strong> - MoreWrong</li>
  </ul>
