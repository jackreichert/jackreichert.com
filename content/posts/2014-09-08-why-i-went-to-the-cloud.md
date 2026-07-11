---
title: "Why I went to the cloud…"
date: 2014-09-08
permalink: "/2014/09/08/why-i-went-to-the-cloud/"
wp_id: 362
categories: ["Web Development"]
post_tags: ["Cloud", "digital ocean", "LAMP", "LEMP"]
description: "I was asked to write a blogpost about my server setup. Specifically, about “the best fixes for wrangling all of those crazy cables.” To which I responded: “Oh, I just use the cloud. Never used anything else.” Why don’t I host my own physical server? Cold hard cash. For the level of scale I need, […]"
layout: post
---

I was asked to write a blogpost about my server setup. Specifically, about “the best fixes for wrangling all of those crazy cables.” To which I responded: “Oh, I just use the cloud. Never used anything else.”

Why don’t I host my own *physical* server? Cold hard cash. For the level of scale I need, a few hundred hits a day, it would be overkill to buy my own.

That question got me thinking about why I *do* wrangle my own server, albeit in the cloud, instead of relying on hosted solutions. So here goes…

I’ve used many of the popular shared, and not shared, hosting solutions. But I’ve always come across the same issues. As my development skills improve, I find that I can only do less and less with what I have, when I rely on others for the environment in which I run my site.

Let’s say I need to increase the upload limit in your php.ini? NOPE!

Do I want to install git? Wait, I can just *install* that from the command line?! What else does my unix user have permissions to do? …or other users for that matter…

Wait, you aren’t running PHP 5? Ok, I get that it’s complicated to upgrade PHP for existing users because you don’t want to break their sites, but, c’mon! I’m a *new* user!!!

Through a mixture of horror and frustration I decided to look into alternatives. But, to be honest, I was afraid of running and configuring a server of my very own.

For my first attempt I tried SUSE linux; because that’s what was being used at the office at time. But I really couldn’t keep it running. It just kept restarting. I didn’t know enough then to be able to say even now why that happened.

But I persisted experimenting, and with some shameless begging, we switched to CentOS in the office. I took that opportunity to build my own development environment locally. Around the time I started feeling comfortable with playing around with server configuration I discovered [DigitalOcean](https://www.digitalocean.com/?refcode=d579c1d09860).

After playing with AWS for a bit, moving to DO felt like moving to Apple from Windows XP. I had to give up a few controls that I didn’t feel too strong about, in exchange I didn’t have to think too much about settings I don’t care about. The server just *worked*. No extra services were needed and I knew the cost.

So to answer the question of why I wrangle my own server?

**First**, I like understanding the technologies upon which I am relying. The more you understand, the better performance you can pull out of something – “full-stack development” should include the Linux/Apache (or Nginx) part of the stack.

**Second**, I you’re building an plugin or theme for distribution you need to make sure it will be compatible, and you can’t really rely on the masses to be running any advanced server setups. So don’t bother with anonymous PHP functions. But if you’re building something for yourself, you should be able to enjoy the benefits of PHP 5.5 and more.

I’m currently working on version 3 of my server. I just moved from CentOS with a traditional Apache, PHP setup to Ubuntu with Nginx and PHP-FPM.

Why?

Well, first of all, all the cool kids are doing it.

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper"><a href="https://twitter.com/JackReichert/status/510930273564110848" rel="nofollow">https://twitter.com/JackReichert/status/510930273564110848</a></div></figure>

More importantly, [Apache slows down under heavy load, because of the need to spawn new processes](https://anturis.com/blog/nginx-vs-apache/), while Nginx was designed specifically to handle high traffic sites. In addition, PHP-FPM runs along side the webserver, instead of on top – like a traditional setup with apache – which reduces the recourses available.

This is a great example of the first reason I stated above. I saw a relatively easy way to improve my site’s performance. Since I’m in control, I can do it.
