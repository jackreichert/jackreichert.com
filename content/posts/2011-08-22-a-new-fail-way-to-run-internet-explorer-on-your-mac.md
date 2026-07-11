---
title: "How and Why I Wasted My Time Today — or — A New (FAIL) Way to Run Internet Explorer on Your Mac"
date: 2011-08-22
permalink: "/2011/08/22/a-new-fail-way-to-run-internet-explorer-on-your-mac/"
wp_id: 172
categories: ["Web Development"]
post_tags: ["IE", "VirtualBox", "Windows"]
description: "I discovered on Hacker News the promise of running Internet Explorer on my mac. This is a big issue in the Front-end Development world since it is crucial that the sites you develop work properly on ALL of the required platforms. From time to time there are circumstances where you don’t need to supp"
layout: post
---

I discovered on [Hacker News](https://news.ycombinator.com/item?id=2913308) the promise of running Internet Explorer on my mac. This is a big issue in the Front-end Development world since it is crucial that the sites you develop work properly on ALL of the required platforms. From time to time there ***are*** circumstances where you don’t need to support Internet Explorer. But for the most part, making your sites look good in Internet Explorer is the bane of a Front-end Developer’s existence. There are hacks, work-arounds. Many of the wonderful new features that modern browsers offer can be done reasonably well across the board. However, it tends to waste precious time.

A big problem – specifically for people who enjoy developing on macs – is that you cannot easily run Internet Explorer on a mac. Now, with the Intel macs you can run Windows, and thus run IE. But it can be costly. There’s $120 for [Windows 7](http://livepage.apple.com/) itself. If you don’t want to reboot every time you want to check your site in IE you have to put down another $80 for some virtual machine software – [Parallels Desktop](https://www.parallels.com/products/desktop/) and [VMware Fusion](https://www.vmware.com/products/fusion/overview.html) are both pretty good. If you run one of those you really should have at least 4GB RAM, another $50 ([Amazon](https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Delectronics&field-keywords=4gb+ram+macbook&x=0&y=0) $30 if you catch a sale). The list can go on but you get the idea.

There’s the cheap route of running [Wine](http://winebottler.kronenberg.org/) but I found that that only worked reasonably well with IE7 and there’s not install package for IE9. It’s a great project in theory, but unfortunately not a solution.

Back to Hacker News. The original link seemed dead. It might be that the server of the link submitter goes back up at some point. But one user posted a link in the comments to [xdissent/ievms](https://github.com/xdissent/ievms) a project in GitHub.

> “Microsoft provides virtual machine disk images to facilitate website testing in multiple versions of IE, regardless of the host operating system. Unfortunately, setting these virtual machines up without Microsoft’s VirtualPC can be extremely difficult. These scripts aim to facilitate that process using VirtualBox on Linux or OS X. With a single command, you can have IE6, IE7, IE8 and IE9 running in separate virtual machines.”

It sounds incredibly promising! A free way to run Internet Explorer on my mac! Awesome!

So I tried it. (Instructions below, as I posted to Hacker News)

1.  Install [virtual box](https://www.virtualbox.org/wiki/Downloads) – Go with the “VirtualBox 4.1.2 for OS X hosts x86/amd64” option.
2.  Copy the command that is most relevant from you from here: [the Github repository](https://github.com/xdissent/ievms/blob/master/README.rst) (starting with ‘curl’)
3.  Open up your terminal window paste, hit the ‘enter’ key
4.  Hit the town, it can take some time, depending on your connection speed that is.

**Note:** #4 *is* relevant. It took a few hours. Downloaded at an average speed of 1mb/s. 11+minutes per package of 700mb. The first installation will have 7 parts (each additional installation – IE8/ IE9 – has 4 parts each). That’s about an hour and a half for one installation.

**First drawback:** Finally, after the script ran, I was down 30GB space on my hard drive. Compared with VMware which only takes 10GB, for a 3 year old Macbook 30GB can be a LOT of space!

**Second drawback:** After trying it out it seems that while “*Microsoft provides virtual machine disk images to facilitate website testing…” Microsoft* only provides it if you are running off an activated version of Windows. So It’s not free either.

Considering those two drawbacks I deleted the installations – which was no easy task, most of the bulk of the files were in hidden directories stashed in nowheres land.

**Conclusion:** If you already own a valid key for Windows 7, have a hard drive with a lot of space on it, and are considering buying virtual machine software. Check this out – it’s a good alternative. It’s a very convenient script.

Otherwise…

Sigh.

There are no free lunches…

Hopefully one day we will be able to **not** waste our time checking our sites in Internet Explorer, whether that means that a **CONVENIENT** tool becomes available, so it’s not a waste of time, or perhaps IE will die someday… Yeah right!
