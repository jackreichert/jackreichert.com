---
title: "WordPress SiteHacks"
date: 2015-11-06
permalink: "/2015/11/06/wordpress-sitehacks/"
wp_id: 639
categories: ["Speaking Engagements"]
description: "Or, How to leverage WordPress to do cool stuff to your site I gave at talk at WordCamp NYC this month, so I thought I’d explore some of the ideas I touched upon in blog form. WORDPRESS, YOUR WORLD, YOUR DATA Too many companies provide social services for “free,” quite literally banking on your data."
featured_image: "/assets/images/clarion-corporatocracy-ce3c1fc8.jpg"
layout: post
---

## Or, How to leverage WordPress to do cool stuff to your site

*I gave at talk at [WordCamp NYC](https://nyc.wordcamp.org/2015/session/wordpress-your-world-your-data/) this month, so I thought I’d explore some of the ideas I touched upon in blog form.*

> **WORDPRESS, YOUR WORLD, YOUR DATA** Too many companies provide social services for “free,” quite literally banking on your data. WordPress is unique in that it charges (quite minimally) for the services it provides, and YOU own YOUR data. I will explore various tools and paradigms — existing, and in the works — to develop and leverage your WordPress site as a central hub for your social data.

**What are Site Hacks?**

WordPress has left its role as a blogging platform in the dust. It’s also far beyond just a way to build a site too.

Since the advent of custom posts and taxonomy, along with postmeta, you can store just about *any* data in your site. Whether you’re just playing with an idea, or are building a prototype for a startup, you can dump just about anything in there.

Along with [Redis object caching](https://www.digitalocean.com/community/tutorials/how-to-configure-redis-caching-to-speed-up-wordpress-on-ubuntu-14-04), you can get pretty far proving a prototype or plain out implementing a concept built on top of your WordPress installation, and still scale. Given all the features built-in and actively improved upon by the WordPress contributors –like user management, security, plugins, and themes – it’s an ideal platform to build things on.

There are a lot of great services out there. Many are free. We all know that if you’re not paying for it with money, you’re paying for the service by providing your information. [Some of these services are worth that payment](https://www.jackreichert.com/2015/10/27/are-online-services-evil/), as they provide value to you, *because you give them that data,* like Facebook and Twitter whose social graphs are augmented by the data you provide.

But even with these beneficial services, you’d be devastated if you lost that data. As for the services that don’t provide extra value, why not replace them altogether?

In my talk I explored three different examples for how you can implement a service on your site. Either to augment the service by backing it up and providing extra functionality, or by replacing the service.

In future blogposts I’ll go more in depth but here’s the run-down:

1.  **Twitter** – I’m not about to delete my account, but wouldn’t I wouldn’t want to lose the [thousands of witticisms I’ve tweeted over the years](https://twitter.com/jackreichert), if it shut down. Also, can \_you \_search your Twitter history? I can.
2.  **File sharing** – At work we were having firewall issues with an enterprise file sharing solution. I built a clone of the service on top of WordPress. No more issues. By the way, I released it as a plugin too, so enjoy my [*WordPress Assets Manager*](https://wordpress.org/plugins/assets-manager/).
3.  **Location** – I felt that Foursquare (now Swarmapp) never reached its potential, whether because of the [creepy side of things](http://pleaserobme.com), or because their API was never leveraged to its potential… I’ll show here how I leveraged the WordPress mobile app to implement my own version.
