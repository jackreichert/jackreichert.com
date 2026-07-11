---
title: "Leveling Up Your Development Skills with a Pinch of SysAdmin"
date: 2014-03-22
permalink: "/2014/03/22/leveling-up-your-development-skills-with-a-pinch-of-sysadmin/"
wp_id: 337
categories: ["Development Theory"]
post_tags: ["digital ocean", "nginx", "sysadmin", "Virtual Machines"]
description: "“If you’re developing properly, you shouldn’t have to worry about whether your site is running Apache, Nginx or anything else. Your code should just work.” – anon When developing a plugin or theme for use by the greater community this is certainly true. Anything you put out there for someone else, s"
layout: post
---

> “If you’re developing properly, you shouldn’t have to worry about whether your site is running Apache, Nginx or anything else. Your code should just work.” – anon

When developing a plugin or theme for use by the greater community this is certainly true. Anything you put out there for someone else, should absolutely not be dependent on the platform.

However, if you already have a platform running, and your code is serving a purpose other than to be code for other people (a plugin or theme) to use on their sites – like if you are running a service yourself – then you want to make sure your code will run on your production server before pushing it there. That’s why I keep my servers running the same infrastructure. I have people who rely on my site running as expected.

I have a Virtual Machine (VM) running on which I develop. VMs are great because you can control 100% what is running on it.

Developing on a Mac is fun because it’s core is [Unix-esk](http://talk.maemo.org/showthread.php?t=51696). Many developers will just use the [PHP that is right there](http://akrabat.com/computing/setting-up-php-mysql-on-os-x-mavericks/), or use [MAMP](https://www.mamp.info/en/). MAMP is a very good way to get started.

A native setup like that works 99% percent of the time. But I found that in a few edge cases, if you’re not developing in the same environment that your production server runs on, it can make debugging complicated… and I HATE debugging my production server live. If you do that you might as well skip all other layers and code commando, straight on production.

Another benefit of running your own VM is that you learn what goes on under the hood. Sometimes your code isn’t the only thing responsible for speed and performance. If you’re on a shared host, there’s a lot you can’t do. Once you practice on a local development environment, you might just find that you’ve built up enough gumption to run your own live server yourself.

The lowest tier on [Digital Ocean](https://www.digitalocean.com/pricing/) is certainly comparable in price to any shared hosting. The benefits are nice, though. Want to try out Nginx instead of Apache? Sure! Want to use fast-cgi instead of running PHP on top of Apache? Go for it? How about just a simple APC install? No arguing on the phone with customer support. Just do it!

Doing this IS scary. The buck stops with YOU. Make sure you have proper fail safes, backups, etc. Digital Ocean has daily backups, which is nice. But if you’re hacked or you get a Reddit bump you need to handle it yourself.

Doing this also means that you will be competent to spin up multiple environments for testing. Thus validating the quote at the beginning of the post.

## So how do I do that?

-   On my Mac I run VM Fusion. I found it far superior for this than Parallels for running a local server.
-   Digital Ocean has wonderful tutorials for spinning up servers. Try the [LAMP](https://www.digitalocean.com/community/articles/how-to-install-linux-apache-mysql-php-lamp-stack-on-centos-6) stack. Want to run Nginx? [No problem](https://www.digitalocean.com/community/articles/how-to-install-wordpress-nginx-php-and-varnish-on-ubuntu-12-04). I recommend trying several of these, a few times. The cool thing with a VM is that you can delete it and begin again, as many times as you need. Get to a good place? Take a snapshot and roll on.
-   [I Deploy with git](http://toroid.org/ams/git-website-howto). Which basically consists of making sure your local server can SSH to your live server(s). Since most of the people who use the sites I manage, manage the content themselves I don’t have to worry about syncing databases, so I haven’t worked out a solution for that.
-   When I work with a team on a project I’ll typically have a staging server. It’s basically a clone of production, only without an easily accessible url. We coordinate with a central repository and test on the staging server. When code is ready to be shipped. It’s pushed to production.

When I keep everything the same, I won’t have to worry about deploying. If it works locally, and it works in the staging area, I can be assured that it’ll work on production.
