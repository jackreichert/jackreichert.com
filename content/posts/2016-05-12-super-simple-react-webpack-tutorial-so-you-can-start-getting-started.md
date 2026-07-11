---
title: "SUPER Simple React webpack Tutorial, so you can start ‘Getting Started’"
date: 2016-05-12
permalink: "/2016/05/12/super-simple-react-webpack-tutorial-so-you-can-start-getting-started/"
wp_id: 757
categories: ["Web Development"]
post_tags: ["reactjs", "webpack"]
description: "Update: This was written before create react app came out. Use that, it’s awesome. I was annoyed by how many people are trying to sound smart in their tutorials, and thus not really helping anything. I wanted a simple “Here is what you need to get started” tutorial and lost a day chasing rabbits dow"
featured_image: "/assets/images/churros-6ddbd295.jpg"
layout: post
---

**Update:** This was written before [create react app](https://github.com/facebook/create-react-app) came out. Use that, it’s awesome.

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper"><a href="https://twitter.com/JackReichert/status/708734546204823552" rel="nofollow">https://twitter.com/JackReichert/status/708734546204823552</a></div></figure>

I was annoyed by how many people are trying to sound smart in their tutorials, and thus not really helping anything. I wanted a simple “Here is what you need to get started” tutorial and lost a day chasing rabbits down broken holes.

So I wrote this. This is all you need.

Download this [github repo for React/weback](https://github.com/jackreichert/react-webpack):

**Run:**

git clone git@github.com:jackreichert/react-webpack.git
cd react-webpack
npm install

Which will install the [node dependencies](https://github.com/jackreichert/react-webpack/blob/master/package.json) for the project.

Then run: `webpack`

Which will compile the “Hello World” example.

Now run your favorite static server in the public/ folder.

For example, if you’re on a mac you can run:

`cd public/`

`python -m SimpleHTTPServer`

In your browser go to [http://localhost:8000/](http://localhost:8000/).

## What’s happening here?

When you ran `npm install` it installed the babel [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler), React, ReactDOM, and webpack.

When you ran `webpack` it followed the [config instructions](https://github.com/jackreichert/react-webpack/blob/master/webpack.config.js) (see comments there for more details).

That’s it. Now you can get started with React without the headache of trying to figure out how to start getting started. [Of COURSE there’s a lot more you can do](https://webpack.github.io/docs/configuration.html). But you have to start somewhere. Once you have your tools up and running you can figure out the hard stuff in your own time.

*About the image: Churros and coffee from Madrid*
