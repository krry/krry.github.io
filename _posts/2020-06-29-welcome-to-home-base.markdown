---
layout: post
title: Welcome to Home Base
---

Here goes nothing.

I've languished and avoided making a portfolio of my work for going on my
entire life. And having finally nearly completed that feat of absurd torture,
I want to take a short break to thank everyone.

Gratitude to all the developers and writers and such that have come before me,
that have generously shared their struggles and learnings and insights and
expertise. I have learned volumes from you, and yet I still know practically
nothing. For example, on this Jekyll blog, we must name our posts according to
the following scheme, `YEAR-MONTH-DAY-title.MARKUP`, for example
`2000-05-05-Prom-Drama.md`. Didn't know that, but I'm guessing that helps
Jekyll parse the posts and keep them in order. We can also use front matter to
organize the metadata above each post.

Right before going this direction, I was getting pretty excited about iframes.
Yes, `<iframe></iframe>`s. Turns out I can't use them to form includeable
partials without javascript or a web server. But for a minute I thought I
could. The crux came in two forms: (1) loading the contents of the `<head>` tag
inside of a self-destructing iframe did not mesh well with the old DOM load,
and (2) these magic iframes take their sweet time loading and
self-destructing, so page load got irretrievably spotty and sluggish right
away. Here is a snippet of the magic iframe approach to vanilla HTML templating, in case you care to try it out:

{% highlight html %}
  <iframe src="./inc/head.html" onload="this.before((this.contentDocument.body||this.contentDocument).children[0]);this.remove()"></iframe>
{% endhighlight %}

With the gritty nits out of the way, I had better get back to porting that
lovely little custom job I was tinkering with into this Jekyll framework. It
might work. Seriously. It might.
