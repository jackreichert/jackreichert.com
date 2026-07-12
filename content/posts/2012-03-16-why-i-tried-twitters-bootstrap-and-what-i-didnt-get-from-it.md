---
title: "Why I tried Twitter’s Bootstrap and What I Didn’t Get from It"
date: 2012-03-16
permalink: "/2012/03/16/why-i-tried-twitters-bootstrap-and-what-i-didnt-get-from-it/"
wp_id: 194
categories: ["Web Development"]
post_tags: ["Bootstrap", "Web Design"]
description: "**Edit: **Now that Bootstrap has been around a while I’ve updated my thoughts. ~=~=~=~=~ The inspiration for Twitter’s Bootstrap is pretty awesome – a predefined reusable modules for building beautiful, elegant sites. Who wouldn’t want that? There are so many common design patterns we front-end deve"
layout: post
---

\*\*Edit: \*\*Now that Bootstrap has been around a while I’ve [updated my thoughts](https://www.jackreichert.com/2014/05/why-i-use-bootstrap-and-what-i-get-from-it/).

~=~=~=~=~

The inspiration for [Twitter’s Bootstrap](https://twitter.github.com/bootstrap/) is pretty awesome – a predefined reusable modules for building beautiful, elegant sites. Who wouldn’t want that? There are so many common design patterns we front-end developers use throughout our work, why not put them all into one place?

That was what I was looking for when I decided to build my next site using bootstrap… and it *did* save time, initially. I decided to use the LessCSS version, I LOVE mixins, and within a couple hours I had 95% of the site styled and laid out. The Bootstrap framework *is* truly powerful.

Bootstrap does for UI what jQuery does for UX… Potentially.

Until you hit a bump in the road.

The CSS includes for Bootstrap are similar to jQuery in the sense that it doesn’t give you anything you couldn’t do yourself, but it gives you a LOT that you couldn’t do *simply* yourself. As the jQuery tagline goes: “[Write Less Do More](https://jquery.com/)”.

Inevitably, when styling a site I come across cross-browser inconsistencies. Usually it’s a simple matter of tweaking to fix the bug. The problem with Bootstrap is that it adds so much extra CSS into the mix that finding that conflict becomes practically impossible. CSS was designed to be more forgiving than Javascript. If there is a conflict, it cascades. CSS was designed to work that way, on purpose.

But in order to work with a CSS framework the way you’d work with jQuery you’d have to know – cold – every module in the framework in order to be able to properly troubleshoot the conflicts. When something breaks in jQuery you know immediately; however with CSS, if the inconsistency is not in the browser you’re developing in you’ll only find it later and then good luck finding it.

**Example:** I was styling a typical list of blogpost excerpts for a category archive page – article tags surrounding a title + excerpt, etc. On the right of each article I had *floating* a “more” button (position: absolute; top: 1em; right: 1em; with a position relative on the article tag).

The “more” button would *float* perfectly in webkit browsers and in IE (even IE7) but for some reason it is ignoring the position relative on the article element in Mozilla so they all piled up on top of each other at the top of the page.

I had a a different issue with an absolute positioned input tag with IE7 that just disappeared completely from the DOM.

Normally I’d be able to find the conflict easily. Normally I KNOW every inch of CSS that I code. But with Bootstrap I wasted hours hunting down the conflict, which was buried in a completely unrelated module… Due to this volatility I had to drop Bootstrap for the project.

Back in the days of “webmasters” when WYSIWYG editors began to appear, the people making a living from coding sites were concerned that these editors would take their jobs. But the editors spat out spaghetti code, unformatted and crude. Which worked fine in the browser you were designing your site for. But once there was a cross-browser inconsistency, you needed a pro to sacrifice a day to fix it. Sadly, Bootstrap isn’t much different.

I plan to continue to use Bootstrap, but not as a full design framework, as it was designed to be; rather, as a library that I can take pieces from. The reset and mixins are a shoe-in to use. It’s not that it’s too buggy to use; more, that the nature of CSS makes frameworks difficult to implement as a full robust solution.

**TLDR:** Bootstrap is like WYSIWYG editors in the sense that it makes your life easier, until you have to troubleshoot a bug… Then it’s a nightmare.

Have YOU used Bootstrap? What are your thoughts?
