---
layout: post
title: Porting to Jekyll, and iframes as Partials? Blasphemy!
date: 2020-06-29 19:24:00 -0700
---

Here goes nothing. An inaugural post ought to be haphazard, right?

Gratitude to all the developers and writers and such that have come before us,
that have generously shared their struggles and learnings and insights and
expertise. We have learned volumes from you, and yet we still know practically
nothing. For example, on this Jekyll blog, we must name our posts according to
the following scheme, `YEAR-MONTH-DAY-title.MARKUP`, for example
`2000-05-05-Prom-Drama.md`. Didn't know that, but we're guessing that helps
Jekyll parse the posts and keep them in order. We can also use front matter to
organize the metadata above each post.

Right before going this direction, we were getting pretty excited about iframes.
Yes, `<iframe></iframe>`s. Turns out we can't use them to form includeable
partials without javascript or a web server. But for a minute we thought we
could. The crux came in two forms: (1) loading the contents of the `<head>` tag
inside of a self-destructing iframe did not mesh well with the old DOM load,
and (2) these magic iframes take their sweet time loading and
self-destructing, so page load got irretrievably spotty and sluggish right
away. Here is a snippet of the magic iframe approach to vanilla HTML templating, in case you care to try it out:

{% highlight html %}
  <iframe src="./inc/head.html" onload="this.before((this.contentDocument.body||this.contentDocument).children[0]);this.remove()"></iframe>
{% endhighlight %}

With the gritty nits out of the way, we had better get back to porting that
lovely little custom job we was tinkering with into this Jekyll framework. It
might work. Seriously. It might.

We're so glad you're here 🥰
