---
layout: post
title: Porting to Jekyll, and iframes as Partials? Blasphemy!
date: 2020-06-29 19:24:00 -0700
---

Here goes nothing. An inaugural post ought to be haphazard, right?

Gratitude to all the developers and writers and such that have come before me,
that have generously shared their struggles and learnings and insights and
expertise. I have learned volumes from you, and yet I still know practically
nothing. For example, on this Jekyll blog, I must name my posts according to
the following scheme, `YEAR-MONTH-DAY-title.MARKUP`, for example
`2000-05-05-Prom-Drama.md`. Didn't know that, but I'm guessing that helps
Jekyll parse the posts and keep them in order. One can also use front matter to
organize the metadata above each post.

Before going this direction, I was getting pretty excited about iframes.
Yes, &larr;iframe&rarr;s. But turns out one cannot use them to form includeable
partials without javascript or a web server, which, on a static site like this, is a no-go. For a minute (okay, twenty minutes) I thought I could.

The crux came in two forms: (1) loading the contents of the `<head>` tag
inside of a self-destructing iframe did not mesh well with the old DOM load,
and (2) these magic iframes take their sweet time loading and
self-destructing, so page load got irretrievably spotty and sluggish right
away. Here is a snippet of the magic iframe approach to vanilla HTML templating, in case you care to try it out:

{% highlight html %}
  <iframe src="./inc/head.html" onload="this.before((this.contentDocument.body||this.contentDocument).children[0]);this.remove()"></iframe>
{% endhighlight %}

With the gritty nits out of the way, I had better get back to porting into Jekyll that
lovely little custom job I was tinkering with. It might fly. Seriously. It might.

I applaud your patience and fortitude for reaching this point in the story. The end 🥰
