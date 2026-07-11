---
title: "A New Year, A New Look"
date: 2019-01-01
permalink: "/2019/01/01/a-new-year-a-new-look/"
wp_id: 943
categories: ["Web Development"]
post_tags: ["aws", "hugo", "static site"]
description: "I started with my career as a professional developer through WordPress. Over a decade ago my better half and a friend got together and founded an environmental news blog. I’ve been obsessed with the environment since I was a kid. When I was six I wrote a letter to my city council representative aski"
featured_image: "/assets/images/clock-53088899.jpeg"
layout: post
---

I started with my career as a professional developer through WordPress.

Over a decade ago my better half and a friend got together and founded an environmental news blog. I’ve been obsessed with the environment since I was a kid. When I was six I wrote a letter to my city council representative asking him to clean up Boston Harbor. (My parents were a little surprised when he came to visit.) So I volunteered to handle the tech side of the blog, and learned a ton.

That experience was how I got my feet wet, and I’ll always be grateful to the WordPress platform and community for helping me start my career.

I built the web team for the last company I worked for. We ported their legacy websites to WordPress, and built several more too. It’s costly to build and maintain systems from scratch, so having the benefit of the community that supports 1⁄3 of the internet is powerful.

This past year I started at a new company and no longer rely on WordPress for my bread and butter. Aside from straight up software architecture, the stack I’m currently working with is primarily Golang, JavaScript, and Python… plus a ton of Cloud.

I like to play with the tools I’m using at work over the weekend, but in different contexts. So I decided to rebuild this site using a Golang static site generator, [Hugo](https://gohugo.io/).

My last redesign was inspired by WordPress’ JSON-api. I taught myself ReactJS and Redux and soon after [open-sourcing my theme](https://github.com/jackreichert/a-wp-react-redux-theme) it became the most cloned ReactJS+Redux WordPress theme on Github. As of writing this it still is the most starred.

While this site is no longer “Proudly Powered by WordPress,” *I* am though. WordPress, and her community, opened the door for me into the wonderful world of professional software engineering, and for that I’ll always be grateful.

## Notes on the redesign

At my new job I’m the tech lead for the “backend” team. But I’ve always loved “frontend” and design just as much, and do my best to continually cultivate my visual arts skills. So I took the opportunity to redesign this site, instead of porting the existing design over.

I focused on readability and elegance–this *is* a blog after all.

I also went back through ***all*** my old posts. Some I edited, some I removed.

I replaced all of the images with photos I took. I love photography, and have had the privilege of traveling a bit. So while I was going through my posts, I replaced all of the images on the posts with images I actually took. Please enjoy them, but don’t steal them.

## Why a static site generator?

One of the great things about WordPress is how dynamic it can be. This is a simple blog, so it doesn’t *need* that much flexibility.

Hugo is somewhat limited, but it does what it does great – generate HTML files from markdown using templates.

I jiggered the system so that when I push to my repo, AWS recompiles the site and deploys. That’s not something that the average blogger can do easily. With WordPress you click Publish, that’s its power.

There are many benefits of having a static site. Web servers were *designed* to serve static files. So if your whole site is just a bunch of HTML files, it’s hard to improve on that for speed. I will have to tweak the images, and maybe I’ll add some PWA features. But that’s gravy.

In addition, static sites are *far* more secure. If you’re diligent you can secure your WordPress site, and there are a lot of articles about that. But there are far fewer vulnerabilities in a simple file server.

I hope you enjoy the experience. I enjoyed creating it.
