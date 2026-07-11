---
title: "Announcing the new ISDA.org"
date: 2017-11-25
permalink: "/2017/11/25/announcing-the-new-isda-org/"
wp_id: 910
categories: ["Misc"]
post_tags: ["isda.org", "Leadership", "reactjs", "Web Design", "WordPress"]
description: "I’m the Director of Web Development at ISDA, a trade organization whose goal is to make the global derivatives markets safer and more efficient. I started there a little over 6 years ago, just after they had launched a new site. The design was contemporary for its time. The codebase was built on top"
featured_image: "/assets/images/isda-org-screenshot-397f6c71.png"
layout: post
---

I’m the Director of Web Development at ISDA, a trade organization whose goal is to make the global derivatives markets safer and more efficient. I started there a little over 6 years ago, just after they had launched a new site.

The design was contemporary for its time. The codebase was built on top of a custom CMS developed by three separate development firms in the Ukraine. There were some interesting design decisions in the codebase, and a lot of hacks that had been implemented to “just make it work.” My first task on the job was to figure out how the system worked and add features. At the time, I *was* the entire web development team.

Over the past six years, as I rolled out more projects, I was given the opportunity to build a web team. First there was just me, then I added three more developers, now we’re six plus a content strategist.

My Moby Dick, the elusive goal, was to rebuild our main site site on top of an open-source platform. [I’m a fan of open-source,](https://www.forbes.com/sites/forbestechcouncil/2017/07/20/open-source-to-use-or-not-to-use-and-how-to-choose/#28a76495138d) and I was finally given the green-light this year.

These are the fruits of my team’s labors: The [new ISDA.org design](https://www.isda.org/).

This project is basically a rebuild of *all* the projects I’ve developed and/or presided over while at ISDA in the past 6 years, crammed into 10 months. We did this *while* maintaining and developing crucial features for the old site. We also incorporated pieces into the site that had never been moved over from the older site – the asp (no .net) site from before my time.

The analogy I’ve been using to describe this launch was to take a train traveling at speed and switch it with a new train, while in motion, and making sure the people remain traveling during the process. A good friend, who’s a project manager, uses a similar analogy, of laying down tracks before a train traveling full-speed. I think the latter description is apt for where we are now, post launch.

My personal goal was to bring consistency to the site. The design had been hacked in so many different ways to do things it had never been designed to do. The same went for the codebase. It was getting harder and harder to fulfill requests for features. As we developed further, the codebase resembled an Italian pasta dinner more and more.

In this post, I want to outline some of the features from the site.

The site has three separate e-commerce checkouts. There’s a good reason to keep them separate. In the old site their code-base was completely separate as well, and we have brought together as much of code-base as we could.

We completely restructured the content, and how users interact with the content. Most of what you see now as individual pieces of content were rows in tables on pages. When content needed to be in two tables it was replicated there, and over time grew out of sync. The tables weren’t searchable, nor could you promote content from the tables.

We changed all that, liberating the content from the tables, and restructured the content into categories across all the content cross-referencing the content using tags. I have a very smart content strategist who worked with all our departments to reorganize thousands of pieces of content.

We’ve incorporated ReactJS searches and modules throughout the site. It’s a new technology for my team, so it meant training while we built. Mentoring is one of my favorite parts of my job, so that was a pleasure. It was important for me to use a JavaScript framework; when you don’t have any, it’s nearly impossible to not end up with a mess of code. I’ve seen it happen with the best intentions. The only alternative is to spin your own framework, but then you have your own framework to architect and maintain.

We have over 30 different forms, each with drastically different requirements. Like the e-commerce, we developed modules that we could share across the forms, so the customization was more a process of definitions than development. Now when we need a new form, or to expand the existing one, it’ll be easy.

The slick design was originally commissioned. As my team has a wealth of design skills already, we used their design as a base for our needs and built from there. The illustrations are also specially commissioned. We wanted to give our new site a consistent high-quality look and feel.

We also, finally, became responsive. I know, hello 2012! That’s what happens whenever you launch something: Immediately some of your technology becomes ancient. The last site had launched in 2011, as responsive design was emerging. So another goal for us was to make the site as future-proof as possible.

There’s a lot more to do with the site, there are features to add, and others to complete. But it’s live, a great feat in itself, and fully functional. As I always say: make it work, then make it work well.

In future posts I’ll dig into our codebase and share some of the solutions we came up with and things we learned. There’s a lot of great solutions to mine from our new codebase and a big part of the open-source community is about sharing. We may release plugins from components we built, but the very least, we’ll be sharing solutions to problems we encountered.
