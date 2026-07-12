---
title: "Why Automattic Doesn’t Need to Buy App.net"
date: 2012-11-21
permalink: "/2012/11/21/why-automattic-doesnt-need-to-buy-app-net/"
wp_id: 233
categories: ["Musings"]
post_tags: ["WordPress", "wpapi"]
description: "… It looks like they have their own social API out there already. Several months ago I suggested that Automattic purchase Path. Sadly it turns out that it would probably be too expensive (see comments). But the idea behind the post is still oh so true. I still want to own my own content. I […]"
layout: post
---

… It looks like they have their own social API out there already.

Several months ago I suggested that [Automattic purchase Path](https://www.jackreichert.com/2012/05/25/why-automattic-should-buy-path/). Sadly it turns out that it would probably be too expensive (see comments). But the idea behind the post is still oh so true.

I *still* want to own my own content. I *still* want to know that I can hide it, take it down, delete it, do whatever the fuck I want with it, *when* I want… because my life is MINE. And I don’t want anyone else owning it, using it in ads, selling it, without my explicit knowledge and control. I **STILL** don’t want my privacy settings changed behind my back and if I wanted my picture to be posted in ads all over the place I would have become a model. And once someone says that they are interested in seeing updates about my life and thoughts I don’t want to have to *pay* for them to see it.

At the end of October, the wildly popular Automattic plugin [Jetpack](http://jetpack.me/) added to version 1.9 including a fantastic [JSON api](https://developer.wordpress.com/docs/api/) providing access to WordPress.com user info. The idea is that it will provide a tool for developers to build apps on top of the Jetpack framework and interface with the WordPress.com platform.

> “Instead of just building for the WordPress.com platform, you can build awesome applications that interact with WordPress in general. Any applications built using the API for WordPress.com will automatically work with Jetpack-enabled sites running Jetpack 1.9 or higher.”

This is the beginning of an app.net-esque approach to the social issue. Twitter’s growth exploded in its early days largely due to the developer community building upon their api. App.net has built an api upon which developers can build. Now it’s pretty much a pay-for Twitter, but without constraints. I imagine that developers will very quickly expand past that functionality and redefine social for us all over again.

The only real problem I see right now with app.net is adoption. How many of you really want to invest in building up your social network from the ground all over again?

I wouldn’t feel to good about yet another social network promising you a garden with your own key. But after hearing an interview with [Dalton Caldwell on TWiST](http://thisweekin.com/thisweekin-startups/dalton-caldwell-of-app-net-twist-306/)… and reading their [core values](https://app.net/about/) I trust that their heart is in the right place. Right back to that quote at the beginning pertaining who is paying for the service…

I really wish app.net all the best luck. I think their goals are certainly noble. But with each of these new attempts at another user-guided social network, I come back to the same thought: “Why not WordPress?” Yes, I’m a WordPress fanboy. [https://platform.twitter.com/embed/index.html?creatorScreenName=jackreichert&dnt=false&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=271387092951654400&lang=en&origin=https%3A%2F%2Fwww.jackreichert.com%2F2012%2F11%2Fwhy-automattic-doesnt-need-to-buy-app-net%2F&siteScreenName=jackreichert&theme=light&widgetsVersion=ed20a2b%3A1601588405575&width=550px](https://platform.twitter.com/embed/index.html?creatorScreenName=jackreichert&dnt=false&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=271387092951654400&lang=en&origin=https%3A%2F%2Fwww.jackreichert.com%2F2012%2F11%2Fwhy-automattic-doesnt-need-to-buy-app-net%2F&siteScreenName=jackreichert&theme=light&widgetsVersion=ed20a2b%3A1601588405575&width=550px)

But that aside, [WordPress is the most distributed web platform online today](https://en.wordpress.com/stats/). Their core values are the same as app.net values: anyone can host, install, and change their own WordPress installation. And with Jetpack, it is all now connected. So the network is already in place.

The only thing it’s missing to become that social network alternative is one more call in the Jetpack user api.

*Current User Status*

But that’s not actually really necessary. There’s the “meta” call under the user call [GET /me](https://developer.wordpress.com/docs/api/1/get/me/)… A plugin would only need to leverage the [`update_user_meta($user->ID,'status','Hello World')`](https://codex.wordpress.org/Function_Reference/update_user_meta) function and that plugin could shoot for the moon! (May I suggest we keep it simple, current user status should be simply ‘status’ in user meta.)

## Calling all developers…

WordPress, with the launch of their Jetpack API has now opened up their platform for a potential browser agnostic social network. Come one, come all. It’s self-hosted, it’s free to use. You can install it on any domain. An app.net-esk API is now available for WordPress.

Sadly, until they add POST / me this will only work on self-hosted sites. Still. Something to hope for…
