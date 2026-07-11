---
title: "LessCSS and CSS3"
date: 2011-08-28
permalink: "/2011/08/28/lesscss-and-css3/"
wp_id: 174
categories: ["Web Development"]
post_tags: ["css", "lesscss"]
description: "The Gist: Use mixins.less for easy implementation of CSS3 properties. It is on GitHub available to all. Background: Read the other day about Twitter announced Bootstrap from Twitter. Immediately I dug in, like I do whenever I see something cool, to see how it works. (I am excited to start playing wi"
layout: post
---

**The Gist:** Use [mixins.less](https://github.com/dancrew32/lesslib/blob/master/mixins.less) for easy implementation of CSS3 properties. It is on GitHub available to all.

**Background:** Read the other day about Twitter announced [Bootstrap from Twitter](https://dev.twitter.com/blog/bootstrap-twitter). Immediately I dug in, like I do whenever I see something cool, to see how it works. (I am excited to start playing with it and will blog about it soon.)

When first landing on their Github page I saw:

> **Nerd alert:** Bootstrap is [built with Less](https://twitter.github.com/bootstrap/#less) and was designed to work out of the gate with modern browsers in mind.

It’s always exciting for me to discover new tools. If there’s a better way to do something, I want to know damnit! Even if it gives me brain-freeze trying to wrap my noggin around it.

So I dived into Less, and I’m loving it.

## LessCSS

First impressions?

**IT COMPLETELY CHANGES THE CSS3 GAME.** How? When using the new properties we know and love from CSS3 like border-radius or linear-gradient one of the most annoying factors is having to use so much duplicate code to manage.

A bit of history: CSS3 collects features that different browsers added over the past few years with the hope of creating a standard. In order to access these features in each of the different browsers you need to add the browser specific prefix to access the functionality.

For example, if you would like rounded corners, you need to do this:

 border-radius: 5px;  -webkit-border-radius: 5px;  -moz-border-radius:5px; 

Eventually it will all merge into the single property “border-radius” but with the speed that browser upgrades go we’ll be seeing these prefixes for awhile.

Unfortunately that can be annoying to develop with. If you’re like me, and you’re trying to get the exact right border radius, you’ll try a few before settling in on what you like the best. That means changing the value in several different places each time you change your mind. It’s reminiscent of the days before css when we had to change the style values on each html page to make global stylistic changes. Not as bad, but c’mon!

And that’s one place where LessCSS really is fun – **Mixins!** Or in other words, variables/closures.

The border radius above in LessCSS can look like this:

Now every place you want rounded corners you can just pop in:

 #header { .rounded-corners; }

or

 #footer { .rounded-corners(10px); } 

([Examples shamelessly stolen straight from LessCSS.org](http://lesscss.org/), more on site.) You don’t like how the radius came out? Change it one place. Change it everywhere! So my first thoughts were to create a template that included all the CSS3 special features with the correct mixins. I did this for a bit, and got to play with some of the fun inner workings of LessCSS. It got a little complicated once I started adding in the MS filters. MS filters aren’t actually CSS, but can achieve some of the functionality of CSS3 in Internet Explorer browsers 6-8. Since they aren’t actually CSS, you have to escape them in LessCSS to compile the files properly, but they still can use variables. So a vertical gradient for IE6-8 would look like in the last two lines below:

Then you can just pop in the mixin anywhere. { .gradient; }

## mixins.less

Most of the conversion was pretty straightforward; however, when looking for solutions on [stackoverflow](https://stackoverflow.com/questions/5971045/how-to-calculate-sine-cosine-in-less) for sin/cosine conversions in LessCSS JavaScript evaluations I came across the complete job done.

[mixins.less](https://github.com/dancrew32/lesslib/blob/master/mixins.less) is on GitHub available to all. It covers, as far as I can see, pretty much any CSS3 property
