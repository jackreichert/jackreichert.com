---
title: "If you feel that this site is running snappier, you’re probably right."
date: 2015-04-24
permalink: "/2015/04/24/if-you-feel-that-this-site-is-running-snappier-youre-probably-right/"
wp_id: 392
categories: ["Web Development"]
post_tags: ["digital ocean", "LEMP", "Performance"]
description: "I went to 3 meetups this week: Codepen.io, WPNYC, and Web Performance NY. At two of them people mentioned Percona. So I thought I’d check it out. Digital Ocean has a great tutorial if you’d like to check it out: How To Install a Fresh Percona Server or Replace MySQL. I got stuck for a […]"
featured_image: "/assets/images/img_0054-3096446230-e1669838451338-24c092b2.jpg"
layout: post
---

I went to 3 meetups this week: [Codepen.io](https://blog.codepen.io/meetups/), [WPNYC](http://wpnyc.org/), and [Web Performance NY](https://www.meetup.com/Web-Performance-NY).

At two of them people mentioned [Percona](http://www.percona.com/). So I thought I’d check it out. Digital Ocean has a great tutorial if you’d like to check it out: [How To Install a Fresh Percona Server or Replace MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-a-fresh-percona-server-or-replace-mysql). I got stuck for a bit, but found a solution deep in the comments of a [StackOverflow answer](https://stackoverflow.com/questions/11450990/your-php-installation-appears-to-be-missing-the-mysql-extension-which-is-require). It turns out that when I removed MySQL to install Percona it removed the `php5-mysql` module.

Before installing it commando on my personal site, I tried it first in my dev box at work and got a 5x improvement in speed.

This is not a scientific experiment, I implemented two other improvements as well:

-   Switched from W3 Total Cache to WP Super Cache.
-   Expanded my Digital Ocean instance as Percona recommends 1GB RAM.

Hope this helps you’re reading experience at my digital home.

Cheers!
