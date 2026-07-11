---
title: "Quality First"
date: 2021-10-22
permalink: "/2021/10/22/quality-first/"
wp_id: 1156
categories: ["Development Theory"]
post_tags: ["QA", "quality", "Software Engineering", "unit tests"]
description: "What does that mean? It means that I get grumpy if I need to keep waking up because something wasn’t built well. But if you want to ignore MY feelings, you can bet that your customers will feel grumpy too if they need to use your service and something isn’t working. In short: You want […]"
featured_image: "/assets/images/img_7625-428664652-e1669821290325-2d2876b8.jpg"
layout: post
---

What does that mean?

It means that I get grumpy if I need to keep waking up because something wasn’t built well. But if you want to ignore MY feelings, you can bet that your customers will feel grumpy too if they need to use your service and something isn’t working.

In short:

You want the tools that you build and use to be reliable, and maintainable.

## Reliable Tools

This means that your tools, internally built or 3rd party, consistently do what you expect them to do.

The only way to truly ensure this is to have test suites built around your code bases. Unit tests ensure each piece does what you need. End to end (e2e) tests ensure the entire project does what you need. Integration tests ensure that 3rd party tools continue do what you expect them to do.

There are many other tests can be leveraged to ensure reliability, these are a few that you should start with.

You also need to know when things aren’t working the way you expect them to work. This means building monitoring and alerts into all the tools you build, and around all the 3rd party tools you use.

Both the test suites and the monitoring should be planned and designed *along with* the design process of the feature. If you’re not planning for it from the beginning you will likely cut corners, and then you no longer have reliable tools.

## Maintainable tools

This means two things. First, that it’s easy to fix when things go wrong, and second, that it’s easy to add features when we need them.

To achieve both these goals it requires more thought, and planning, up front.

When new features are requested there is often pressure to get the feature out as quickly as possible. At a startup, that speed is especially important for success. But we *do* have to factor in the time we’ll need in the future to make the new features maintainable. It may take a future iteration to do this. The cost, however, of not iterating is that the next feature will take longer to implement. And over time your project will grow stale and unworkable.

Maintainability is achieved through adhering to our best coding practices, as well as regular reflection back on past features in order to find ways to improve them.

## Share Knowledge — Don’t Silo Developers

Another part of maintainability that is often overlooked is ensuring that there is expertise and a sense of ownership shared by multiple team members.

Part of achieving this is by ensuring the codebase is clear, well documented, and readable code, that is well structured and does what you’d expect it to do — see the book Clean Code.

However, just as important, is making sure that multiple developers get a chance to work in the codebase. If only one person on the team has developed an important feature or project, what happens if it breaks and they’re out? What happens if there is an urgent feature, but that one developer is on another urgent feature?

When one person does the bulk of the development they own the project, but they’re alone in that ownership.

Pairing on developing and planning out projects ensures everyone has ownership. Managers may complain that pairing slows the team down, from my experience, when it’s done regularly it does not. Whatever time is lost on sharing knowledge is gained with more heads able to work on problems.

When developing features, if the stories are smaller, then more people can pick up pieces of the project or feature, and gain ownership and expertise. The cost is small while one developer gets up to speed mid-feature, but again, that is gained back with more heads with ownership over the project.

* * *

A quality first mindset is about making sure that the tools you use are reliable and maintainable. It’s often tempting to sacrifice quality for speed, and truthfully, if your v1 isn’t embarrassing you’ve probably waited too long to get your tool in front of customers.

However, as you grow your tools, it’s important to implement a discipline that will ensure the longevity of your tools, ensure that you, and your customers, can rely on them.
