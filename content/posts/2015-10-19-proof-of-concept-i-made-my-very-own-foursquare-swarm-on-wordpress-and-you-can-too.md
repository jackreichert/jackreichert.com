---
title: "Proof of Concept: I made my very own Foursquare (Swarm) on WordPress… and you can too"
date: 2015-10-19
permalink: "/2015/10/19/proof-of-concept-i-made-my-very-own-foursquare-swarm-on-wordpress-and-you-can-too/"
wp_id: 546
categories: ["Web Development"]
post_tags: ["Foursquare", "geotagging", "Plugins", "WordCamp"]
description: "I’ve always loved the concept of Foursquare. Sharing locations is awesome, although somewhat creepy. How do you leverage the awesomeness while avoiding the creepy factor? Sadly today it’s basically impossible to protect yourself against being tracked, if you have a mobile phone. But I’m not going to"
featured_image: "/assets/images/ocean-7ee190f8.jpeg"
layout: post
---

I’ve always loved the concept of Foursquare. Sharing locations is awesome, [although somewhat creepy](https://en.wikipedia.org/wiki/Foursquare#Privacy).

How do you leverage the awesomeness while avoiding the creepy factor?

Sadly today it’s [basically impossible to protect yourself against being tracked](https://ssd.eff.org/en/module/problem-mobile-phones), [if you have a mobile phone](https://www.eff.org/issues/cell-tracking). But I’m not going to give away my apartment key to everyone around, just because it’s possible to pick the lock.

My biggest gripe against Foursquare is that it’s all real-time, so I couldn’t control when I was posting my location. If I used the app, I *had* to broadcast where I was *then*, or not at all.

What if you were in control of your data? Your World Your Data, right?

> How would you opt to display and use your location data if you were in control over it? What sort of plugins could be built around this data?

So I thought I’d see what I could do, with little or no coding, and create a proof-of-concept.

One of the cool things about smartphones is that when you take photos, it saves the location of the photo in the photo metadata. You can prevent that from happening, and many services strip that data to prevent liability, but let’s try and leverage that.

I did a [quick search in the WordPress plugin directory](https://wordpress.org/plugins/search.php?q=map+image) and came up with [Map Images](https://wordpress.org/plugins/map-images/). It’s not pretty, and hasn’t been updated in 11 months, but I’m using my dev site for this project, so let’s give it a shot. If I like it, I’ll rebuild the plugin and make it beautiful.

<figure class="aligncenter size-large"><a href="/assets/images/map-images-24463794.png"><img loading="lazy" width="1024" height="836" data-attachment-id="552" data-permalink="/2015/10/19/proof-of-concept-i-made-my-very-own-foursquare-swarm-on-wordpress-and-you-can-too/map-images/" data-orig-file="/assets/images/map-images-24463794.png" data-orig-size="1232,1007" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="map-images" data-image-description="" data-image-caption="" data-large-file="/assets/images/map-images-24463794.png?w=1232" src="/assets/images/map-images-24463794.png" alt="" class="wp-image-552" sizes="auto, (max-width: 1024px) 100vw, 1024px"></a></figure>

It wasn’t too hard to to get the plugin up and running, on activating you need to get a free [api key for Google maps](https://developers.google.com/maps/documentation/javascript/tutorial). The key allows up to 25k calls per day, which let’s be honest, if you “check in” more than 25k times a day, your biggest problem isn’t your API limit.

Once I got the plugin set up, I tried with my phone. I took a picture and uploaded it via the app. Sadly, the app stripped out the location metadata by default. Even when I took a picture outside of the WordPress app, then uploaded *that* photo, the app *still* stripped out the geodata.

Then I found the following settings in the app site settings:

<figure class="wp-block-gallery aligncenter columns-2 is-cropped wp-block-gallery-4 is-layout-flex wp-block-gallery-is-layout-flex"><ul class="blocks-gallery-grid"><li class="blocks-gallery-item"><figure><a href="/assets/images/wordpress-app-f0244851.jpg"><img loading="lazy" width="576" height="1024" data-attachment-id="550" data-permalink="/2015/10/19/proof-of-concept-i-made-my-very-own-foursquare-swarm-on-wordpress-and-you-can-too/wordpress-app/" data-orig-file="/assets/images/wordpress-app-f0244851.jpg" data-orig-size="576,1024" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"1445177382","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"1"}" data-image-title="wordpress-app" data-image-description="" data-image-caption="" data-large-file="/assets/images/wordpress-app-f0244851.jpg" src="/assets/images/wordpress-app-f0244851.jpg" alt="" data-id="550" class="wp-image-550" sizes="auto, (max-width: 576px) 100vw, 576px"></a></figure></li><li class="blocks-gallery-item"><figure><a href="/assets/images/wordpress-app1-f91b1c04.jpg"><img loading="lazy" width="576" height="1024" data-attachment-id="549" data-permalink="/2015/10/19/proof-of-concept-i-made-my-very-own-foursquare-swarm-on-wordpress-and-you-can-too/wordpress-app1/" data-orig-file="/assets/images/wordpress-app1-f91b1c04.jpg" data-orig-size="576,1024" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"1445177395","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"1"}" data-image-title="wordpress-app1" data-image-description="" data-image-caption="" data-large-file="/assets/images/wordpress-app1-f91b1c04.jpg" src="/assets/images/wordpress-app1-f91b1c04.jpg" alt="" data-id="549" class="wp-image-549" sizes="auto, (max-width: 576px) 100vw, 576px"></a></figure></li></ul></figure>

Boo yeah! Geotagging…

Once switched on the app stopped stripping out the geodata from photos. One caveat, if I took a picture with the app, it still would remove the data, but if I take a picture with the phone first, *then* upload it with the app, the geodata remains. When you save the post, the plugin does its magic and BOOM, I have my proof of concept.

<figure class="alignright size-large"><a href="/assets/images/dancing-streets-dc8dbf6e.png"><img loading="lazy" width="783" height="1008" data-attachment-id="548" data-permalink="/2015/10/19/proof-of-concept-i-made-my-very-own-foursquare-swarm-on-wordpress-and-you-can-too/dancing-streets/" data-orig-file="/assets/images/dancing-streets-dc8dbf6e.png" data-orig-size="783,1008" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="dancing-streets" data-image-description="" data-image-caption="" data-large-file="/assets/images/dancing-streets-dc8dbf6e.png" src="/assets/images/dancing-streets-dc8dbf6e.png" alt="" class="wp-image-548" sizes="auto, (max-width: 783px) 100vw, 783px"></a></figure>

It’s not beautiful, I can worry about that later, but it works!

I’m not releasing my location feed yet. I have a few things to work out first…

### TO DO:

-   It’s not pretty, the plugin should format things more elegantly.
-   I don’t want my location posts to go into the main feed. I think location should be its own post-type, and a separate feed.

I plan to do two things to correct this:

1.  Make a version of the plugin that is more elegant, and that moves the post-types into a post-type of \`location\`.
2.  The app has some great basic functionality, keeping the hack above in mind, it would be great to be able to pair the app with server-side post-processing. I’m working on a plugin called “*If Post Then That (IFPTT).”* Inspired by [IFTTT](https://ifttt.com/recipes) it will let you do post-processing of a post, so you can add a tag to the post, and it will move it to an existing post-type. Or the like. Keep your eyes peeled, more news to come.

Once this is polished I think it would be the ideal companion for travel/food/photo bloggers, or just anyone that likes to share cool places, or remember where they saw something (there *are* private posts for that).

Check back, I’ll post when the above is done and you’ll be able to follow me on my journeys.

### What I need from you:

-   What are your impressions of this proof-of-concept?
-   What site-hacks would you do? Not just location, if you could save stuff to your site on-the-go with an app, then have your site post-process, what would you do?

Anyone can do hacks like these. You don’t need to know how to code. I *do* recommend having a separate site for playing around on, but that’s easy enough. I wanted to do this with zero coding as a proof of what creativity can be accomplished leveraging the WordPress plugin ecosystem.
