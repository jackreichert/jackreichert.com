---
title: "Responsive Web Design – Solving the Pitfalls of `Display: None`"
date: 2012-04-27
permalink: "/2012/04/27/responsive-web-design-solving-the-pitfalls-of-display-none/"
wp_id: 205
categories: ["Web Development"]
post_tags: ["css", "Responsive Web Design"]
description: "One of the biggest complaints I’ve heard about Responsive Web Design is that sites built to be responsive take too long to load. We may have reached the age of broadband with our desktops but with bandwidth throttling and pay-per-byte mobile plans we really need to consider every pixel and every bit"
layout: post
---

One of the biggest complaints I’ve heard about Responsive Web Design is that sites built to be responsive take too long to load.

We may have reached the age of broadband with our desktops but with bandwidth throttling and pay-per-byte mobile plans we really need to consider every pixel and every bit of code we send to our users… If we expect them to frequent our sites that is.

One popular approach to building a responsive website is to take an already designed theme, then hide each element that doesn’t look good on a mobile until a minimalist theme remains. While that technique may leave you with a decent looking site it will wreak havoc on your users’ experience.

The ideal is to plan a minimum viable product — focus on your user’s needs, design for your content — and you’ll have the perfect mobile-friendly site. Just add a few media queries and you’re good to go.

But sometimes you NEED that awesomely cool heavy animation loading on your desktop theme, but want to spare your mobile users. Or you’d like to add some extra navigation, which just doesn’t work with the mobile experience.

What do you do then?

### Introducing: php-mobile-detect

Let’s say you have a WordPress theme that you’re adapting to be Responsive…

Download the [php-mobile-detect](https://code.google.com/p/php-mobile-detect/) script and upload it to your theme folder.

Require it in your functions.php file.

require\_once('Mobile\_Detect.php');
$detect = new Mobile\_Detect();

Then when you have to urge to apply a “Display: none;” in your stylesheet for something that is particularly heavy.

global $detect;
if ($detect->isMobile() && !$detect->isTablet()) {
    // code for mobile only
} elseif ($detect->isTablet()) {
    // tablet browsers
} else {
    // everything else
}

Voilà!

### But User Agent Sniffing is BAD?!

Browser Detection is a double edged sword. [Here’s a great summary why you shouldn’t do this.](https://css-tricks.com/browser-detection-is-bad/) But this solution, while technically IS browser detection, is more in the spirit of capability detection. We’re not singling out all iPhones and building a special theme for them, we’re finding all mobile devices that aren’t tablets and hiding/showing elements consequently. This is more akin to the media queries we so dearly love and rely upon for our responsive site.

Disagree? Please share your thoughts!

Kudos [@victorstanciu](https://twitter.com/#!/victorstanciu) for a great job on the php-mobile-detect script!
