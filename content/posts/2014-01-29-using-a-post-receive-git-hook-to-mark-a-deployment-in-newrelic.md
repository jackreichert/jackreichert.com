---
title: "How to Use a post-receive Git hook to mark a deployment in NewRelic"
date: 2014-01-29
permalink: "/2014/01/29/using-a-post-receive-git-hook-to-mark-a-deployment-in-newrelic/"
wp_id: 325
categories: ["Web Development"]
post_tags: ["curl", "Git", "NewRelic"]
description: "I recently started monitoring my systems with NewRelic. Fantastic tool. One fun feature they provide is that you can mark in NewRelic’s dashboard when you’ve deployed new code. This way you can compare your site performance before and after the deploy. Using Git’s post-receive hook is perfect for th"
layout: post
---

I recently started monitoring my systems with NewRelic. Fantastic tool.

One fun feature they provide is that [you can mark in NewRelic’s dashboard when you’ve deployed new code](https://github.com/newrelic/newrelic_api#example-4). This way you can compare your site performance before and after the deploy.

curl -H "x-api-key:YOUR\_API\_KEY\_HERE" -d "deployment\[app\_name\]=iMyFace.ly Production" -d "deployment\[description\]=This deployment was sent using curl" -d "deployment\[changelog\]=many hands make light work" -d "deployment\[user\]=Joe User" https://api.newrelic.com/deployments.xml

Using Git’s post-receive hook is perfect for this, especially since I already use it to [deploy my sites to the various servers](http://toroid.org/ams/git-website-howto).

The only question I had was, how would I get the various variables from the post-receive hook into the curl statement?

Well, here you go:

description=$(git log -1 --pretty=format:%s)
author=$(git log -1 --pretty=format:%cn)
revision=$(git log -1 --pretty=format:%T)

Now you can do this:

curl -H "x-api-key:YOUR\_API\_KEY\_HERE" -d "deployment\[app\_name\]=iMyFace.ly Production" -d "deployment\[description\]=$description" -d "deployment\[user\]=$author" -d"deployment\[revision\]=$revision" https://api.newrelic.com/deployments.xml
