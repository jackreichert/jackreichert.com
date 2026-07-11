---
title: "Developing A Theme for WordPress Using ReactJS, Redux, and the WP REST API"
date: 2017-01-16
permalink: "/2017/01/16/developing-a-theme-for-wordpress-using-reactjs-redux-and-the-wp-rest-api/"
wp_id: 825
categories: ["Web Development"]
post_tags: ["AJAX", "reactjs", "redux"]
description: "To being, check out the project here. This is a work in progress, but I got enough done this weekend that I’d like to share. I wanted to work on a project using ReactJS and Redux. I’ve heard a lot about it, and wanted to explore it on my own. I do that with every […]"
featured_image: "/assets/images/flower-5f8b73b6.jpg"
layout: post
---

To being, [check out the project here](https://github.com/jackreichert/react-theme).

This is a work in progress, but I got enough done this weekend that I’d like to share.

I wanted to work on a project using ReactJS and Redux. I’ve heard a lot about it, and wanted to explore it on my own. I do that with every technology before I bring it to the office. Since WordPress incorporated the WP REST API in the core for version 4.7 I though that that might be a great opportunity to explore both the API using ReactJS+Redux.

There were a number of interesting challenges I faced building this. The idea was to make a theme that would work 100% like any other WordPress theme; that could be installed and work normally.

As it currently stands there are some missing features, which I’ll get to later. But this is past a proof-of-concept and well along the path to be fully operational.

I will explain more about how it all fits together in a future post, maybe when I load it onto this site. In this post I just wanted to muse about the process so far, and invite others to join in the project or share their ideas and implementations.

### Endpoints: Handling Pretty Permalinks

The first challenge was to figure out how to handle “Pretty Permalinks.” You know what they are. Back in the early days of CMSs all URLs ran off of GET variables ([http://blog.example.com?p=23](http://blog.example.com?p=23)). But because Google gave better SEO juice to readable URLs we all started getting urls that were readable. This was incorporated into WordPress as well.

The problem with implementing this in a single-page JS app is that the default path for posts is `/year/month/name-of-post/`. That can make routing complicated. Not only that, but you can change the permalink format too. So in order for this theme to work, I’d have to handle that.

My solution was to [have a catchall route](https://github.com/jackreichert/react-theme/blob/master/src/routes.js) and [build a custom endpoint for Pretty Permalinks](https://github.com/jackreichert/react-theme/blob/master/lib/endpoints/pretty-permalinks.php) that would be powered by the [url\_to\_postid()](https://developer.wordpress.org/reference/functions/url_to_postid/) method. This ended up working pretty well and is what powers both single pages and posts.

### Endpoints: Menus

Another challenge was how to handle menus. They’re dynamic, and not included in the current API. To solve this I borrowed the main class from [the WP API Menus plugin](https://wordpress.org/plugins/wp-api-menus/). (I love GPL, don’t you?) It was written by [Fulvio Notarstefano](https://github.com/unfulvio), and was beautifully implemented.

I contemplated having the menu data loaded as js variables on page load, since they don’t change. But I wanted the challenge of figuring out how to implement multiple versions of the same element with ReactJS+Redux, so they got their own endpoint.

### Endpoints: Featured Images

I also [modified the main post endpoint](https://github.com/jackreichert/react-theme/blob/master/lib/endpoints/add-featured-image.php) to include featured images so that I wouldn’t have to do a separate call for each image on archive pages.

### Search

Another challenge, in general, was handling the different routes for different actions. It’s not all that complicated once you get the hang of it. But working in single page apps can get interesting, and if you’re not careful you can lose the benefits of using frameworks like Redux.

All in all the WP REST API is quite robust and is now polished. If you check out [my redux actions](https://github.com/jackreichert/react-theme/blob/master/src/actions/index.js) you can see that I’m using the same endpoint for the main index archive, single posts and search. Which is really nice. I’ll be expanding this file for the taxonomies as well. Apparently [all you need is to add a filter GET variable](https://torquemag.io/2014/10/working-taxonomies-using-json-rest-api/).

### What’s still missing from the project?

There’s still a lot to do. First and foremost, there is currently only minimal styling.

There are a whole lot of things that are needed to make it a theme the might be accepted into the theme repo. First of all, I haven’t done anything with taxonomies yet.

I’d also like to add widgets. That is another interesting problem which I’ll probably solve the same way I did pretty permalinks – add a new endpoint just for them. I’ll have to render them completely on the server, then pass them down via the API. It’s not pretty, but it should work.

I’ll also want to clean up the hooks that run before the page loads. Since the entire theme is running off the API, [directly from the index.php](https://github.com/jackreichert/react-theme/blob/master/index.php), it won’t need a lot of the server-side processing, as that is done already in the API.

The customizer isn’t playing well with the menus, I’ll have to figure that out.

I’m sure there’s a whole bunch more that needs to be done too. I’ll write about what I discover in the summary post once (if) this theme goes live.

### Closing thoughts

It’s a fun project and I’ll look forward to playing more with ReactJS and Redux. The first thing I noticed was how snappy it was. It also forces you to think about the different components in a very healthy way. When designing components, each one should be independent. You should be able to drop any one in any other project (for the most part) and use it with minimal wiring up. That’s good coding practices.

### Join me!

If you find this project interesting please feel free to share with me your ideas for it.
