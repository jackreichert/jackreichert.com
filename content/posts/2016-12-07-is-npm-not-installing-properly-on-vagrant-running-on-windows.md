---
title: "Is npm not installing properly on Vagrant running on Windows?"
date: 2016-12-07
permalink: "/2016/12/07/is-npm-not-installing-properly-on-vagrant-running-on-windows/"
wp_id: 818
categories: ["Web Development"]
post_tags: ["vagrant", "Windows"]
description: "Get a Mac! Kidding. (I actually think Microsoft has been more innovative lately.) Run the flag –no-bin-links when you install anything with npm and it will fix your issue. I have a dev Vagrant that I share with my team. I tend to mock things up when I’m playing around at home in the evenings. […]"
featured_image: "/assets/images/grand-central-station-77487458.jpg"
layout: post
---

Get a Mac! Kidding. (I actually think Microsoft has been more innovative lately.)

Run the flag `–no-bin-links` when you install anything with npm and it will fix your issue.

I have a dev Vagrant that I share with my team. I tend to mock things up when I’m playing around at home in the evenings. I work on a Mac at home. So when I confidently came into work with the plan to set up a box for my team to work on, I lost a bunch of time trying to figure out why the npm development tools I wanted, would not install.

According to the [npm documentation](https://docs.npmjs.com/cli/install):

> The `–no-bin-links` argument will prevent npm from creating symlinks for any binaries the package might contain.

Why? I found [this discussion](https://github.com/mitchellh/vagrant/issues/6188) on the Vagrant github:

> …there is a fundamental problem with using Vagrant + VMWare Workstation + Windows + Linux VMs…
> 
> It seems that VMWare on Windows simply does not support the ability to create a Linux symlink in a shared folder.

Another option is to set bin-links to false in your [global npm configuration](https://docs.npmjs.com/misc/config#bin-links): `npm config set bin-links false`

This will mean that you won’t have to type in the flag `–no-bin-links` each time, which might be a good solution if you are trying to build development tools to make your team’s lives easier.

*About the image: Grand Central Station, NYC*
