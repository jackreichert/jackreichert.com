---
title: "Why I use Bootstrap, and what I get from it"
date: 2014-05-18
permalink: "/2014/05/18/why-i-use-bootstrap-and-what-i-get-from-it/"
wp_id: 342
categories: ["Misc"]
post_tags: ["Bootstrap", "css", "Frameworks", "Frontend Development", "UI"]
description: "I previously wrote about the the Bootstrap front-end framework. In a nutshell my thoughts then were, it’s a useful tool but if something goes wrong, it’ll be a pain to troubleshoot. What I thought then still remains true, if you need to work outside their box, you’ll have a tough time. However, sinc"
layout: post
---

I previously wrote about the the [Bootstrap front-end framework](/2012/03/16/why-i-tried-twitters-bootstrap-and-what-i-didnt-get-from-it/). In a nutshell my thoughts then were, it’s a useful tool but if something goes wrong, it’ll be a pain to troubleshoot.

What I thought then still remains true, if you need to work outside their box, you’ll have a tough time. However, since I first wrote about it, it’s gotten quite a bit more polished.

## What I’d Leave

When they made the jump from version 2.3 to 3 I was not happy. It’s quite a bit more polished now and naming conventions make more sense, but one really can’t upgrade a bootstrap 2.x based site to 3 with ease.

*Note to all framework developers: if you’re planning on doing such a drastic change, please, please, **please** document your changes **carefully** so that you’re not wasting the time of the people for whom you are building your code for? Even better? Write a conversion script.*

Also, I was not happy that they dropped IE7 support. It would be nice to have some graceful degradation in place, especially since it *is* *a framework*. I work with the banking industry, who notoriously refuse to upgrade their systems. Which is plain dumb and I have a lot to say about that; but, that’s for another post.

## What I Love

Pain aside, it’s sweet to work with.

It is now flat, which is really nice for a framework. It’s not a good idea to include tons of extra code to add shading and depth to an element that you will go ahead and overwrite. Start slim, build from there.

The grid system is fully responsive, which was nicely executed. I’m also please that they moved away from the 8 column grid, 12 is much more flexible.

Version 3 moved from sprites to glyphs in font format, it’s time for sprites to die.

* * *

In today’s world it’s a no-brainer to use a framework, at *least* for prototyping. Whether, the framework is really just your own snippets you’ve collected, or it’s a framework that has a team dedicated to developing and improving it. Front-end frameworks really cut down the development time, and Bootstrap is solid.

To resolve my initial reservations with using a framework, when I’m assigning projects to my team I make sure to pepper the tasks with some vanilla CSS and JS. It’s good to keep on one’s toes.
