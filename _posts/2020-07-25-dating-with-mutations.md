I noticed while revisiting [this dusty marvel](https://passage.atmanaut.us/) that the date being displayed was obscenely wrong. The month was two months off, the hours were several time zones away, and the date was always less than seven. And here I thought we had left it stable, at least worthy of v1.

Time for some ungloving and debugging. All you need is *glove*, doo duh dooda doo 🎺 💘 🧤

---

Thankfully we left ourselves some treats, like debug logging switches, and a
clever cross-module emitter that reports its behavior dutifully. After
wrestling with some seriously strange output, I tapped the root of the
issue: [the ECMAScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) or rather my rudimentary misunderstanding of said object.

## The Key to Dating Mutations is Cloning

You see, I don't have a lot experience with dating mutations. If you would
have asked me a year ago what I thought about mutating dates, I would have
laughed in your face. Date mutants?! That'll get messy on the quick.

But with a little spritz of immutability, I was able to hack through the
underbrush, and escape from this barekly tolerable quagmire. And now look.
I get to write about it too! Here's what we learned. Hope it helps someone.

Simply put, when we ask the browser for a JavaScript Date (object), it will
graciously oblige. But unless we are very clear about our boundaries, that
date will go on and on. You may find yourself days, months, years later still
on the same Date. Or you may discover that what you thought was a second or
third Date was STILL THE SAME DATE!

As it turns out, the crux was object mutation or immutability which was
seemingly the word of the day. Earlier as I was [brushing up on some React]()
we were reminded of this principle that dictates React's architecture.
Isn't it funny-not-funny how the Universe seems to contain only enough to keep
us engaged, just enough novelty to keep us believing the world of forms and
images is real?

Metaphysics aside, [the Date object in JavaScript is a tricky little mink])(https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/).
If you ask the browser to generate a Date object and assign it to a variable
name, then assign that to any other variable, the same Date object underlies
both. So then if you were to `set` the Date object in any fashion,
[the mutation will show up everywhere that Date object is referenced](https://unspecified.wordpress.com/2013/08/02/why-you-should-never-mutate-a-javascript-date/).
To avoid this confusion, we can create new instances of the Date object like so:

```javascript
let newDate = new Date(2020, 07, 31);
let anotherNewDate = new Date(newDate);
newDate.setDate(22); // 2020-07-22
anotherNewDate.getDate() !== 22; // 2020-07-31
```

This conundrum is one React seeks to help us avoid. By preferring and enforcing [strict, deep
immutability, (as scary as that sounds)](https://alistapart.com/article/why-mutation-can-be-scary/)
of data objects, React allows us to jump forward and back among
states of the application as though time is more than one-dimensional and more
than one-directional. Pro tip: it is.

To fix this crazy clock, we had to become more comfortable with dating mutations.
We now create a few instances of the Date object, and the awkwardness is all
but gone. Now the the old Passage clock is humming along like a hummingbird in
a humvee with Humphrey Bogart.

Thanks for showing up. Showing up is key. Oh dear, look at the time…
