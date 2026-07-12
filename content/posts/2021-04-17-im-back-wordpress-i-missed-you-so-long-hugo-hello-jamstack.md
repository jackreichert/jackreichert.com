---
title: "I’m Back WordPress, I missed you! So Long Hugo, Hello JAMStack!"
date: 2021-04-17
permalink: "/2021/04/17/im-back-wordpress-i-missed-you-so-long-hugo-hello-jamstack/"
wp_id: 1015
categories: ["Musings"]
post_tags: ["Design", "hugo", "JAMStack", "reactjs", "VueJS", "WordPress"]
description: "My career, and development as an engineer, can be followed through the evolution, redesign, and rebuilding of this site — http://www.jackreichert.com. Initially I launched on shared WordPress hosting, and built on top starter themes. It was rudimentary, but it worked, and I got my first full-time te"
featured_image: "/assets/images/img_3486-1-bf3dd5c6.jpg"
layout: post
---

My career, and development as an engineer, can be followed through the evolution, redesign, and rebuilding of this site — [www.jackreichert.com](http://www.jackreichert.com).

Initially I launched on shared WordPress hosting, and built on top starter themes. It was rudimentary, but it worked, and I got my first full-time tech job with those skills.

As I learned systems administration I started hosting my site, crafting the servers myself. Partly because it could be cheaper, partly because I could tweak it to make it screamingly fast.

As my design skills deepened, I re-crafted my themes, exploring type, and interesting layouts.

Throughout the years I’ve enjoyed this evolution.

Often I’d use my site as a way to learn a new skill, then bring that skill to the job and implement it there. I’ve done this many times.

Around the time WordPress launched their WP-API I built a ReactJS-Redux theme. It’s a full WordPress theme, but it loads everything via the api. It’s still the [most forked and starred WordPress ReactJS-Redux theme](https://github.com/jackreichert/a-wp-react-redux-theme) on GitHub.

I took those learnings and helped the company I was working at to relaunch their site with [ReactJS integrated throughout their Frontend](https://www.jackreichert.com/2017/11/announcing-the-new-isda-org/). We rebuilt EVERYTHING, including the bookstore, and several complicated eCommerce components. But that was main thing I hadn’t known previously and wanted to learn and implement. I learned ReactJS developing this site, and then implemented it back at work.

A few years ago I started working at a new company. We use GoLang and VueJS in our portal. I was curious about static sites, so I rebuilt this site using [Hugo](https://gohugo.io), built off GoLang itself.

Hugo is pretty awesome, it’s not too difficult to build themes with, and it has some great features, akin to WordPress short codes, which made the transition easier.

I also built a sweet deployment pipeline, using AWS code-deploy, that would generate all the static pages and deploy the site to an S3 bucket once I pushed a new blogpost to the repo.

The site was really pretty, SUPER fast, and **it cost 43 cents to host**. So why change things?

Well, I found myself writing MUCH less. WordPress is a pleasure to use, something I had taken for granted. I had overlooked that, focusing on speed and reducing hosting costs.

You may not enjoy writing within WordPress, the TinyMCE wasn’t ideal. The new block editor now is *really* nice to use. But you could write your post in your favorite text editor, copy and paste, and it was live, just like that.

For Hugo, I need to have my laptop, because there aren’t great git solutions for iOS. The ones I found are a pain to set up. And while I enjoy markdown, the folder structure has to be exact for the post to work, and I have to edit the images precisely before adding them to the repo.

So whenever I felt like writing anything, I ended up not, because it was too much of a pain. I enjoy writing, so I’ve been feeling something missing in my life.

WordPress’ new block editor *is* sweet, I had such FOMO. I’m really enjoying it now, writing this blogpost, from my iPad.

## How does *this* site work? Tech Specs

The latest challenge I set for myself was to take some of the skills I had picked up over the past few years and make a new site in VueJS+VueX. I didn’t want to host anymore though. I’ve enjoyed not babysitting the server over the past few years.

This site is still hosted on S3, but instead of hundreds of files, like I had with Hugo, it’s now four files: index.html, bundle.css, vendors.js, bundle.js. That’s it.

It uses WordPress.com as the backend.

When you first visit this site, it caches all the blogpost data in localStorage. I wouldn’t recommend this for a site with thousands of posts, but several hundred can be done fairly efficiently.

Go ahead, turn off your wifi, or go into airplane mode, then click around. No images, but the rest of the site still works.

I was tempted to cache the images in indexedDB, but I felt that that would hog too many resources. I’m proud of the images of this site, I took the vast majority of them myself. But there is no need to make you download all of them in one go.

If you’re interested in seeing how things work under the hood, I made the project public: [a-wp-independent-vuejs-theme](https://github.com/jackreichert/a-wp-independent-vuejs-theme).

I only ask you change the style if you decide to use it too.

I hope @photomatt is ok with this. I’m technically breaking some rules here. If you went to the WordPress.com account that this is pointing to it would say that it’s under construction. As of writing this, I haven’t yet, but I promise to put “Proudly Powered By WordPress” in the footer with a link. I *am* proud.

## Didn’t you say this is JAMStack?

> The core principles of [pre-rendering](https://jamstack.org/glossary/pre-render), and [decoupling](https://jamstack.org/glossary/decoupling), enable sites and applications to be delivered with greater confidence and resilience than ever before.
> 
> JAMStack.org

While this doesn’t pre-render, it doesn’t render server-side. It’s all happening in your browser. That seems to be — at the very least — in the spirit of things.

And the Frontend of the site is certainly decoupled from the back. I can move these four files anywhere, point any domain at it, and it will still work. I can also decide to change the WordPress account, and it will work seamlessly too.

JAM.

## Future plans

First, there’s some tweaking I want to do to the style. I wanted to push out V1 and start writing again. But it can be cleaner.

Next, I have some ideas about how I can leverage the WordPress app to have more fun with this platform.

As always, I’d love to hear your thoughts, find me [@jackreichert](https://twitter.com/jackreichert).
