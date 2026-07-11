---
title: "Long Live the QR Code"
date: 2015-02-01
permalink: "/2015/02/01/long-live-the-qr-code/"
wp_id: 376
categories: ["Musings"]
post_tags: ["Plugins", "QR Code", "WordPress"]
description: "QR codes aren’t dead, they were just never implemented well. In the past two weeks WhatsApp and Snapchat both announced different implementations of QR codes. What’s different now? Why would these work, and nothing else before them? WhatsApp uses the code to connect a specific browser with the app s"
layout: post
---

QR codes aren’t dead, they were just never implemented well.

In the past two weeks [WhatsApp](https://blog.whatsapp.com/614/WhatsApp-Web) and [Snapchat](http://www.businessinsider.com/snapchat-qr-codes-scanme-2015-1) both announced different implementations of QR codes. What’s different now? Why would these work, and nothing else before them?

WhatsApp uses the code to connect a specific browser with the app so that WhatsApp Web can be loaded, similar to the [WordPress plugin I wrote](https://wordpress.org/plugins/wp-qr-code-login/). Snapchat added QR codes for connecting with people reducing the friction of having to remember/type in a username.

<figure class="wp-block-embed is-type-rich is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper"><span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/K-YuU7NAMZM?version=3&rel=1&showsearch=0&showinfo=1&iv_load_policy=1&fs=1&hl=en&autohide=2&wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span></div></figure>

There’s a lot of [hate](https://www.facebook.com/IHateQRCodes) and [cynicism](https://econsultancy.com/blog/64891-six-mobile-marketing-alternatives-to-qr-codes/) towards QR codes. What they’re complaining about, mostly, comes down to ridiculous implementation and unnecessary use of the codes. Frankly they sound like luddites with their complaining.

I’ve been disappointed with the overall implementation. QR codes are great tools to pass a small amount of information from the physical world to your mobile device. Unfortunately they’re mostly used as a gimmick. Think of them as an alternative to a shortened URL. If you don’t want to force someone type in a long URL, that would be an ideal use for a QR code.

[](/files/2015/01/camera-scan-e14227239392971.png)But you still probably shouldn’t use a QR code for most situations today; unfortunately, you need a special app to use them. Why? I don’t know, QR code deciphering libraries are built into the native iOS camera library. What’s really wrong with QR codes today is that they’re not easy enough to use. If the camera had a “scan” setting along side the useless auto crop tool “square” people might actually discover intelligent implementations of QR codes.

The vast majority of implementation today are ads. When I see one out in the wild I usually won’t pull out my phone because there aren’t good apps for scanning QR codes. I usually snap a picture of the ad if I’m really interested in it, then pull up the ad later when I have an extra minute.

A good, and relevant use of a QR code for an ad would integrate location. If you scan the code, and that takes you to an app or site that verifies your location you get 30% off. But that would only really work if that specific location was important. If you’re an ad agency, there’s a freebie for you. Use it for the grand opening of a new store and place a treasure hunt in a 6 block radius of the new location.

There’s very little you can do with QR codes that you can’t with NFC or iBeacons. But there *IS* a bar of technical know-how for implementing either low frequency radio powered tool, that you don’t have with QR codes. Implementing QR codes ***properly*** is really a matter of treating them as a tool, and implementing them in a way where people might actually find them useful.

Enter WhatsApp and Snapchat. Here’s what they did right:

1.  The functionality is built straight into the app, no need for a nonexistent well-designed QR code reader to use the new feature.
2.  It reduces friction by providing a less complicated way to do something that might otherwise be more complicated. They did not use the codes as a gimmicky extra step.

An added benefit is that it actually DOES have the intrigue a gimmick might have due to the fact that they actually got the implementation right. Proof, all the great press they got for it.

**P.S.** I’m currently working on a companion iOS app for the plugin I wrote. Stay tuned…
