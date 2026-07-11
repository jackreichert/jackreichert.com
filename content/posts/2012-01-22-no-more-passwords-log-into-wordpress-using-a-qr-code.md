---
title: "No More Passwords* – Log into WordPress using a QR Code"
date: 2012-01-22
permalink: "/2012/01/22/no-more-passwords-log-into-wordpress-using-a-qr-code/"
wp_id: 188
categories: ["Web Development"]
post_tags: ["javascript", "long polling", "passwords", "security"]
description: "A short while ago I stumbled upon an interesting Hacker News conversation… Intrigued by the challenge, I decided to implement the theory as a WordPress plugin for all to use. So here’s the gory details… The Flow User visits Login page Login page Generates unique hash, saves hash to the database Logi"
layout: post
---

*A short while ago I stumbled upon an interesting [Hacker News](https://news.ycombinator.com/item?id=3399781) conversation…*

Intrigued by the challenge, I decided to implement the theory as a WordPress plugin for all to use. So here’s the gory details…

## The Flow

1.  **User** visits **Login page**
2.  **Login page** Generates unique hash, saves hash to the database
3.  **Login page** Creates QR code of a link that GET posts hash to the **Plugin’s admin page**
4.  Via long polling \*\*Login page \*\*waits for a username to be inserted into the row in the database that has the page’s active hash
5.  **User** scans QR code with mobile device and which is sent to **Plugin’s admin page** on mobile with along with the active hash posted via GET
6.  In WordPress, the **User** must be logged in to reach **Plugin admin page** by definition
7.  The **Plugin admin page** records the username to active hash in the database (the GET posted hash)
8.  The **Login page** sees a change in active hash’s row of the database and reloads the page with a GET post of the active hash
9.  Using the WordPress action init the page receives the hash, finds row of active hash in the database and pulls the username, it then removes the hash from database so it can’t be reused
10.  The page then logs in the **User** using the username pulled and redirects the **User** to the WordPress Dashboard

<figure class="wp-block-image size-large"><a href="/assets/images/qrlogin1-2e35822e.png"><img loading="lazy" width="1024" height="636" data-attachment-id="189" data-permalink="/qrlogin1/" data-orig-file="/assets/images/qrlogin1-2e35822e.png" data-orig-size="1076,669" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="QrLogin1" data-image-description="" data-image-caption="" data-large-file="/assets/images/qrlogin1-2e35822e.png?w=1076" src="/assets/images/qrlogin1-2e35822e.png" alt="" class="wp-image-189" title="QrLogin" sizes="auto, (max-width: 1024px) 100vw, 1024px"></a></figure>

## Notes

Alone, this isn’t a solution to never having to remember your passwords again. Your mobile browser has to have the logged-in cookies for it to work completely without password.

**Why is it still useful?** Well, everyone goes everywhere with their cellphones now, but with today’s mobility it means that you’re likely to find yourself with an urgent idea to post to your blog, and not wanting to type it out with your thumbs on your mobile. So, borrow Aunt Sally’s computer – that by all chance has thousands of suspicious apps, key loggers and, by the way, is running Vista – and to log in just scan away!

Ideally, it would work great with an app built to complement it that would scan the qr code, save your passwords, and log you in automatically if the local cookie had expired… Perhaps that app is in the works… Comment below if you’d like it and I may be swayed to create such a monster. Perhaps [tiqr](https://tiqr.org/) might want to gang up…

**Is it secure?** I’ve put several checks in place to make sure it is.

1.  Username/password are never passed back and forth, only the unique hash.
2.  Hash is removed from the database once it’s used, old hashes that haven’t been used can’t be unless the database is hacked, but then you have bigger issues.
3.  All database queries of the hash have been escaped to prevent XSS attacks.
4.  nonce added to ajax call.
5.  nonce and confirmation added to on mobile end to prevent CSRF attack.

I’m pretty sure that covers security. Anything else needed?

Suggestions? Comments? You know where that goes…

## Special thanks to…

-   [5 tips for using AJAX in WordPress](http://www.garyc40.com/2010/03/5-tips-for-using-ajax-in-wordpress/)
-   [PHP jQuery AJAX Javascript Long Polling](http://blog.perplexedlabs.com/2009/05/04/php-jquery-ajax-javascript-long-polling/) – although the long polling solution I worked out with WordPress’ AJAX isn’t perfect yet.
-   And of course *[@PeterLegierski](https://twitter.com/#!/peterlegierski)* for the original post on HN.

[View the plugin](https://wordpress.org/plugins/wp-qr-code-login/)
