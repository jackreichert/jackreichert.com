---
title: "How to Debug WordPress"
date: 2012-06-22
permalink: "/2012/06/22/how-to-debug-wordpress/"
wp_id: 216
categories: ["Web Development"]
post_tags: ["WordPress"]
description: "I recently stumbled across this nifty gem in the WordPress Codex: Debugging in WordPress. Basically, php has ways to suppressing errors, and by default WordPress will do this for you as well. Why? Well, you don’t want everyone who stumbles onto your site to see all the errors your code is making. Th"
layout: post
---

I recently stumbled across this nifty gem in the WordPress Codex: [Debugging in WordPress](https://codex.wordpress.org/Debugging_in_WordPress).

Basically, php has ways to suppressing errors, and by default WordPress will do this for you as well. Why? Well, you don’t want everyone who stumbles onto your site to see all the errors your code is making. The problem is that with these settings a less experienced developer may be lead to believe that their code is fine, when it’s not.

Usually I keep my apache error log file open when developing. But with a few basic changes to your WordPress config file you can have all the errors you life, and more, right on the page.

**NOTE:** Do NOT do this on your production site. Only on your development/local server.

Find in your config.php file the line:

define(‘WP\_DEBUG’, false);

Change the value to true.

As the codex explains

> Showing all PHP notices and warnings often results in error messages for things that don’t seem broken, but do not follow proper data validation conventions inside PHP. These warnings are easy to fix once the relevant code has been identified, and the resulting code is almost always more bug-resistant and easier to maintain.

Basically, your code may work, but if you don’t fix these errors you may run into problems.

After the debug line add the following:

define(‘WP\_DEBUG\_LOG’, true);

This is a companion to WP\_DEBUG that causes all errors to also be saved to a debug.log file inside the /wp-content/ directory.

The debug mode includes many more warnings and errors than in your apache error log, so if you care about your site working, do it.

Finally, if you don’t want the errors to display on the page, but still to be logged in the debug.log file add the following:

define(‘WP\_DEBUG\_DISPLAY’, false);

The only problem with this is that you’ll soon see many mistakes by others. I make sure to promptly send my fixes to the authors, with a kind thank you of course, but not all listen. Some even upgrade their plugin and NOT include my corrections. Their plugin, their choice. But that does mean that I need to keep a log of my own to keep track of plugin fixes for when there are upgrades.

For further reading also check out [5 Ways to Debug WordPress](https://nacin.com/2010/04/23/5-ways-to-debug-wordpress/).
