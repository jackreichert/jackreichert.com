---
title: "The Many Facets of Content Pertaining to Responsive Web Design and Object Oriented CSS"
date: 2011-08-07
permalink: "/2011/08/07/the-many-facets-of-content-pertaining-responsive-web-design-and-object-oriented-css/"
wp_id: 170
categories: ["Web Development"]
post_tags: ["css"]
description: "I recently stumbled across Ethan Marcotte’s article on A List Apart about Responsive Web Design and immediately bought the book, then ate it up. Reading the following two sentences were the Ah-HA experience of the book for me: “Rather than creating disconnected designs, each tailored to a particular"
layout: post
---

I recently stumbled across Ethan Marcotte’s article on *A List Apart* about [Responsive Web Design](http://www.alistapart.com/articles/responsive-web-design/) and immediately bought the book, then ate it up.

Reading the following two sentences were the Ah-HA experience of the book for me:

> “Rather than creating disconnected designs, each tailored to a particular device or browser, we should instead treat them as facets of the same experience. In other words, we can craft sites that are not only more flexible, but that can adapt to the media that renders them.”

I remember when working with one of my previous clients I was asked to redo one of their pages and I was surprised to see how much duplicate code a previous Front-end developer had used on the page. One example, there were several tabs on the page I was working on and some of the content in the tabs overlapped. But instead of using the same content and simply changing the style to match each tab my predecessor had loaded up the DOM with duplicate content – overloading the browser memory and slowing down page load. In addition, the content was filled via a query to their database, so that makes *two* queries for every time the page was loaded.

In contrast, the last place I worked put a strong emphasis on implementing Object Oriented philosophies in Front-end functionality. I’ve been known to implement OOP from time to time – just like the next guy – but there is a conceptual jump between its application in the visual realm vs. the world in which it developed – server side, heavy lifting.

When you need to do visual work it doesn’t necessarily come intuitively to abstract the code pieces so that you can reuse them elsewhere in different circumstances. But when making AJAXed content pages, once I took the extra time at the beginning to map it out it saved a lot time with future pages and, of course, ran *much more efficiently*. (We’re talking about a reduction of *30 seconds* in load time…)

### Object Oriented CSS

The application of Object Oriented concepts to front-end projects doesn’t stop with Javascript. The main two principals upon which [Object Oriented CSS](https://github.com/stubbornella/oocss/wiki) is built on are:

1.  Separate structure and skin.
2.  Separate container and content.

This abstraction allows for the creation of reusable modules a.k.a. classes that can be applied across your site. If you want the same feel – that would be a skin class. If you want to keep similar paddings / layouts – you’d use a container class. The term “*class”* is pertinent here. I’m not sure I’d use the framework that the project has put together. It’s not bad, it’s just *another* framework to work with… But the systematic approach they apply *did* helped me flesh out techniques I had already been implementing (said content page with duplicate content above).

### Object Oriented Web Design

Reading about Ethan Marcotte’s Responsive Web Design was familiar to me because it is essentially another application of principals above. But here, the skins are restyled to fit the media upon which the content is viewed. The model is the same, it’s the view that needs to be optimized per device… and our media queries work as a wonderful controller.

Abstracting the content from container is extremely powerful. Having played with responsive design for a bit now, I don’t see why I *wouldn’t* build my webapp to work equally well in mobile AND computer browser – and no need for that pesky mobile subdomain everyone is using these days. Since native apps mean that your user will have your icon sitting there on their mobile desktop, I don’t think that responsively designed webapps would replace native apps – not to mention the power you can only truly tap into when developing natively.

That being said, a startup can get their concept out there much quicker with much less funding up-front using a service like phonegap, and only having to invest in web developers to get off the ground. It’s all just different facets of the same beautiful web.
