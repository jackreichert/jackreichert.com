---
title: "A React + Redux WordPress Theme — Version 2.0"
date: 2017-08-27
permalink: "/2017/08/27/a-react-redux-wordpress-theme-version-2-0/"
wp_id: 898
categories: ["Web Development"]
post_tags: ["reactjs", "redux", "WordPress Themes"]
description: "It’s that time of year again. I’ve updated this theme, which runs off my open theme + a few minor style tweaks. What’s new in v2.0? It’s all completely under the hood. So you’ll see nothing different here… But I’ll know. First, since I build the theme, react-router hit version 4 and changed everythi"
featured_image: "/assets/images/mural-and-bike-bce48a7a.jpg"
layout: post
---

It’s that time of year again. I’ve updated this theme, which runs off my [open theme](https://github.com/jackreichert/a-wp-react-redux-theme) + a few minor style tweaks.

What’s new in v2.0?

It’s all completely under the hood. So you’ll see nothing different here… But I’ll know.

First, since I build the theme, [react-router hit version 4 and changed everything](https://github.com/ReactTraining/react-router). There are a whole lot of changes in this theme due to that. One huge benefit to this update is that now it is much easier to integrate state into your redux flow. You can see [how to implement react router 4 in the index.js here](https://github.com/jackreichert/a-wp-react-redux-theme/blob/master/src/index.js).

Also, since building the original I started using ReactJS at work, and learned a lot about how things flow, and how to keep things clean. So many of the changes have to do with duplicate code, and cleaning up the flow of data. There’s still much that can be done, but it’s a nice step in the right direction.

[Bootstrap finally went from alpha to beta](https://getbootstrap.com/docs/4.0/getting-started/introduction/), so I’ve implemented that, and a few minor tweaks to make everything work. I almost lost the header for a minute…

Another piece I started implementing is a proper php fallback. When I first build the theme I thought it would be cool for it not to rely on php at all. But let’s be real, sometimes there are browsers that hiccup, and people don’t use the tools they should, so I thought it would be prudent to make the simplest functioning theme in php to fall back to. It’s not done, so for now they’ll see a list of titles…

Go check it out and I’d love to hear your thoughts.

As always, questions? comments? shoot me a line!

*About the image: New Orleans, LA*
