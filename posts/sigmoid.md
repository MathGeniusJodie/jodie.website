---
date: 2024-12-07
categories: [math]
---
## Fast Sigmoid (Updated)

[https://godbolt.org/z/djTqa5x7K](https://godbolt.org/z/djTqa5x7K)

<pre>    <code>
static float garbage_sigmoid(float x){
  return utf(
      ~ftu(
          utf(~ftu(x))-
          utf(ftu(4.f)|ftu(x)&amp;ftu(-0.f))
      )
  );
}
    </code>
  </pre>
