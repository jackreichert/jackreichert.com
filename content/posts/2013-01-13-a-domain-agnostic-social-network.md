---
title: "A Domain-Agnostic Social Network"
date: 2013-01-13
permalink: "/2013/01/13/a-domain-agnostic-social-network/"
wp_id: 236
categories: ["Musings"]
post_tags: ["social network", "WordPress"]
description: "Ever since the guys at Diaspora raised 200k on Kickstarter I’ve had an itch I am trying to scratch. I wrote a little bit about this already but thought it would be good to flesh out the idea a bit more and put it out there for the sake of “the conversation.” As users of […]"
layout: post
---

Ever since the guys at Diaspora raised 200k on Kickstarter I’ve had an itch I am trying to scratch. I [wrote a little bit about this already](/2012/11/21/why-automattic-doesnt-need-to-buy-app-net/) but thought it would be good to flesh out the idea a bit more and put it out there for the sake of “the conversation.”

As users of social networks it’s not ideal that less than a handful of companies have a monopoly over all of our social interactions, and none of these companies are compatible with each other.

Facebook keeps devising new ways to circumvent our privacy settings. If they didn’t, they couldn’t share information about you and subsequently make money off you. Twitter is now blocking their API from the creative people who made Twitter what it is. Since Instagram was acquired it’s been hemorrhaging users …and there’s very little reason to believe that this story will be different with the next rising social sharing star.

Social networks should work off a single protocol the same way email does with SMTP, rather than working as exclusive services onto themselves. What do I mean by this? In an ideal world, if i don’t like Facebook I should be able to move to a competing service; but to a service that interacts back with Facebook so I can still keep all my friends and don’t have to switch them over. But of course, why would Facebook agree to this?

Google tried to create a Social Media Transfer Protocol, a.k.a. “Google Wave,” but they neglected to make it backwards compatible – you couldn’t contact someone via Wave who hadn’t signed up for the service. So after the initial excitement everyone forgot about Google Wave and mass adoption never happened (the Google+ notification bar on every Google page was built to solve this same problem.) Nonetheless, when Google created Wave, they opened up to the public protocols that defined how to engage with Wave if you wanted to make a competing service. Sadly, Google+ doesn’t have this.

App.net is really cool. I really think that they are on the right track but ultimately they don’t solve the problem because you still don’t actually own your content. You’re renting their service and they’re pledging to you that they won’t f\*\*\* around with the content you provide. The concept behind App.net is pretty close to what I describe above as the ideal, but I think they’re still missing the point. They need to be building the pipes, not another database that they own and let you use.

The thing is, that that social framework I’m describing almost exists already and it’s called WordPress.

Aside from it’s flexibility, I love WordPress for its portability. They make it very clear that they are a framework for you to build upon. You can get a beautiful, quick, simple site up and running on WordPress.com and as soon as you feel that you can’t do any more there, with the click of a button you can export your site and self-host. You have full control, your site is yours, and your content is yours. WordPress is a well thought out data management framework that can be the foundation for just about anything. The proof is in the pudding. They say they want to democratize publishing. That’s exactly what they’ve done.

* * *

There are two essential elements to sharing in a social network. The first is what you are sharing, a.k.a. the status. Attached to that status typically is meta information about that status. This meta information can be location or an attachment like a link or image. WordPress has the infrastructure to hold whatever data you would like to share; between custom post types and post metadata, your only limitation is your own creativity. With a simple plugin, an entire new social layer can be added to any WordPress-powered site with zero effect on the current functionality of the site.

The second essential element of a social network is who you are sharing with, the actual network. On Twitter, for instance, your stati can be public, private, or a direct message. This element is the key difference between what a blog post is and what is status is and from the social network perspective this is the one major difference, IMHO, between WordPress and App.net. However, using the [global variable $current\_user](https://codex.wordpress.org/Function_Reference/wp_get_current_user) and/or the Jetpack WordPress.com [REST API: “GET /me”](https://developer.wordpress.com/docs/api/1/get/me/) call adding this layer to WordPress should be very doable.

* * *

With such a large user base as WordPress has, I think that it should be a relatively small hurdle to create an overlying social layer connecting all WordPress users whether through Jetpack or via a peer to peer network. The benefits of this over over existing social networks would be total ownership and control over your content. From your own domain, your own personal site, you could run your personal social profile connecting with the entire network.

This is not a idea for a startup, I’m not particularly interested in outwardly trying to butt heads with ALL the internet juggernauts at once. If this is a viable idea I see it being grassroots.

Tl;dr: App.net is cool, but why reinvent the wheel? The functionality already exists in WordPress.
