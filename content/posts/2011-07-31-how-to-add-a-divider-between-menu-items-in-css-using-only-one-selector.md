---
title: "How to add a divider between menu items in css using only one selector"
date: 2011-07-31
permalink: "/2011/07/31/how-to-add-a-divider-between-menu-items-in-css-using-only-one-selector/"
wp_id: 166
categories: ["Web Development"]
post_tags: ["css"]
description: "A popular way for dividing between menu items, or elements in general is the single border. The problem with doing that is how do you not have the border after the last element? One solution is to add a border to all of the list-items then remove it from the last one: But this solution […]"
layout: post
---

A popular way for dividing between menu items, or elements in general is the single border.

li { border-right: 1px solid #000000; }

The problem with doing that is how do you *not* have the border after the last element?

<figure class="wp-block-image size-large is-resized"><a href="/assets/images/menu-broken-6be387a5.png"><img loading="lazy" data-attachment-id="167" data-permalink="/menu-broken-2/" data-orig-file="/assets/images/menu-broken-6be387a5.png" data-orig-size="392,72" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="menu-broken" data-image-description="" data-image-caption="" data-large-file="/assets/images/menu-broken-6be387a5.png" src="/assets/images/menu-broken-6be387a5.png" alt="" class="wp-image-167" width="573" height="105" title="menu-broken" sizes="auto, (max-width: 573px) 100vw, 573px"></a></figure>

One solution is to add a border to all of the list-items then remove it from the last one:

li:last { border-right: none }

But this solution is not elegant. It get’s the job done, but it adds an extra line of code. So what can we do?

This is where the CSS [Adjacent Sibling Combinator](https://www.w3.org/TR/css3-selectors/#adjacent-sibling-combinators) (a.k.a. the plus sign) or the CSS [General Sibling Combinator](https://www.w3.org/TR/css3-selectors/#general-sibling-combinators) (a.k.a. the title) come in handy.

## The CSS Adjacent Sibling Combinator

This will target a specified element that is adjacent, in the DOM tree, to another specified element as long as they share the same parent and first sequence immediately precedes the second one.

For example, if you would like to style every h3 element that is adjacent to an h1 element white you’d do this:

The HTML markup would be:

# Title

### Tagline

The CSS to target the h3 tag would be:

h1+h3 { color: white; }

Though, if you tried targeting the h1 tag like this:

h3+h1 { color: white; }

It wouldn’t work because the h3 tag does not precede the h1 tag in the HTML markup.

Or if you had an h2 tag in between the two elements, the style also would not be applied to the h3 tag…

# Title

## Secondary Title

### Tagline

because the tags are not adjacent to each other.

## The CSS General Sibling Combinator

Now let’s say you DO want the style to apply in the example above?

The General Sibling Combinator will target a specified element that is a sibling under the *same parent element* of another specified element even if they are not next to each other as long as the first specified element precedes the second one.

Meaning that in the second html example we could apply a style to the h3 tag using the following code:

h1~h3 { color: white; }

Even thought the h1 and h3 are not adjacent to each other, since they are still siblings, the style would be applied to the h3 element.

However if you tried the following:

h3~h1 { color: white; }

The style would not be applied.

## Using the Sibling Combinators to Solve Our Problem

Back to the menu problem. How do we add a border in between each menu-item, but only use one line of code to style it?

li+li { border-left: 1px solid #000000 }

i.e. Every list-item that comes right after another list-item should have a border to it’s left.

Or you could do this:

li~li { border-left: 1px solid #000000 }

Which basically means that every list-item that has somewhere, under the same parent, another list-item before it, that list-item should get a border to it’s left.

Voilà! There you have it!

## Gaming the Sibling Combinators

Lea Verou uses this technique used to create an actual [game of Tic-Tac-Toe in pure CSS](http://lea.verou.me/2011/06/pure-css-tic-tac-toe/). The only Javascript used to make the game functional is for setting up the board. Aside from that, the conditions used to monitor the game use the Sibling Combinators. When I first saw this I printed out the stylesheet to read on the bus home. It’s a brilliant use of CSS and I have to admit that I’m jealous that I didn’t think of it first.
