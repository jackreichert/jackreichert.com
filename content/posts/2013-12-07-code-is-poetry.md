---
title: "Code Is Poetry"
date: 2013-12-07
permalink: "/2013/12/07/code-is-poetry/"
wp_id: 310
categories: ["Web Development"]
post_tags: ["Code is Poetry", "How it works", "WordPress"]
description: "At the bottom of every page of wordpress.org is the above statement, and it’s not just an empty phrase. I learned what I know from digging into WordPress. It started by my breaking the site I was supposed to be managing, sorry Karin. Many books, themes, plugins and years later I seem to be able […]"
layout: post
---

<figure class="wp-block-image size-large is-resized"><a href="/assets/images/codeispoetry-efcaae23.png"><img loading="lazy" data-attachment-id="311" data-permalink="/codeispoetry/" data-orig-file="/assets/images/codeispoetry-efcaae23.png" data-orig-size="380,29" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="codeispoetry" data-image-description="" data-image-caption="" data-large-file="/assets/images/codeispoetry-efcaae23.png" src="/assets/images/codeispoetry-efcaae23.png" alt="" class="wp-image-311" width="380" height="29" sizes="auto, (max-width: 380px) 100vw, 380px"></a></figure>

At the bottom of every page of wordpress.org is the above statement, and it’s not just an empty phrase.

I learned what I know from digging into WordPress. It started by my breaking the site I was supposed to be managing, sorry Karin. Many books, themes, plugins and years later I seem to be able to manage most any PHP site quite proficiently.

No matter what I’m working on, I try to keep the above in mind. “Code Is Poetry.” If I can make a method more elegant, concise, I go for it.

Having influenced me so much, I decided to put WordPress to a test. See if the good people at WordPress hold to their own mantra.

To do so I installed the top CMS platforms on a local environment so I could compare their codebases and database structures with each other. I wasn’t very scientific about what is considered a “top” CMS. I pretty much Googled and made a list of the top few that came up the most. I have not run any performance tests, I may do that for another post. This post is just about structure of code and database. “Code is Poetry” right? Here are my results.

<figure class="wp-block-image size-large"><a href="/assets/images/cms-file-search-1e6775d3.png"><img loading="lazy" width="1024" height="725" data-attachment-id="313" data-permalink="/cms-file-search/" data-orig-file="/assets/images/cms-file-search-1e6775d3.png" data-orig-size="1094,775" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="cms-file-search" data-image-description="" data-image-caption="" data-large-file="/assets/images/cms-file-search-1e6775d3.png?w=1094" src="/assets/images/cms-file-search-1e6775d3.png" alt="" class="wp-image-313" sizes="auto, (max-width: 1024px) 100vw, 1024px"></a></figure>

**File count** (CMS’ in alphabetical order)

Concrete5: 4006 files 
Drupal: 1065 files 
Joomla: 5083 files 
WordPress: 1062 files

<figure class="wp-block-image size-large"><a href="/assets/images/cms-folder-search-ed842a07.png"><img loading="lazy" width="1024" height="725" data-attachment-id="314" data-permalink="/cms-folder-search/" data-orig-file="/assets/images/cms-folder-search-ed842a07.png" data-orig-size="1094,775" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="cms-folder-search" data-image-description="" data-image-caption="" data-large-file="/assets/images/cms-folder-search-ed842a07.png?w=1094" src="/assets/images/cms-folder-search-ed842a07.png" alt="" class="wp-image-314" sizes="auto, (max-width: 1024px) 100vw, 1024px"></a></figure>

**Folder count**

 Concrete5: 765 
 Drupal: 136 
 Joomla: 1233 
 WordPress: 112

**Top level folders**

Concrete5: 20 
Drupal: 7 
Joomla: 17 
WordPress: 3

### Why This is Important

A codebase to a developer is a lot like moving parts in electronics. There more there is, the more that can break. Less doesn’t necessarily mean better, a space shuttle is clearly better than a 747 and has far more moving parts. But to continue the analogy, a SSD is far superior to a HDD.

Drupal and WordPress are neck and neck in numbers, though, WordPress is ahead by a hair ahead, except for the top level folder stat.

The top level folder stat is important. WordPress wins hands-down here. Aside from having strong OCD tendencies, it’s important because it’s an indication of the overall clarity of structure of the codebase, which has clear ramifications. Try upgrading WordPress, one click. Try upgrading Drupal… HA!

The WordPress codebase is structured beautifully with clear delineation between wp-includes, wp-admin, wp-content. It’s clear what is where, and what is what. You do not have to read through their documentation to see clearly where the core sits, and where you can mess around. You cannot say this about the other CMS platforms.

<figure class="wp-block-image size-large"><a href="/assets/images/cms-folder-breakdown-ad9e8693.png"><img loading="lazy" width="914" height="736" data-attachment-id="315" data-permalink="/cms-folder-breakdown/" data-orig-file="/assets/images/cms-folder-breakdown-ad9e8693.png" data-orig-size="914,736" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="cms-folder-breakdown" data-image-description="" data-image-caption="" data-large-file="/assets/images/cms-folder-breakdown-ad9e8693.png" src="/assets/images/cms-folder-breakdown-ad9e8693.png" alt="" class="wp-image-315" sizes="auto, (max-width: 914px) 100vw, 914px"></a></figure>

**Now for the Databases: Table count**

Concrete5: 172 
Drupal: 72 
Joomla: 68 
WordPress: 11

For more about the elegance of WordPress’ database read: [How WordPress Works: Dissecting the Database](/2013/12/01/how-wordpress-works-dissecting-the-database/).

In conclusion, I don’t want, ever again, to hear about how bloated WordPress is.
