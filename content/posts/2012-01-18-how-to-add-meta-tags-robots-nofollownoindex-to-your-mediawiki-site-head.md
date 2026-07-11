---
title: "How to Add META Tags – ROBOTS NOFOLLOW,NOINDEX – to Your MediaWiki Site Head"
date: 2012-01-18
permalink: "/2012/01/18/how-to-add-meta-tags-robots-nofollownoindex-to-your-mediawiki-site-head/"
wp_id: 186
categories: ["Web Development"]
post_tags: ["MediaWiki"]
description: "I spent too much time today hunting down how to do this, so I thought I’d spell it out clearly. Add the following snippet to your LocalSettings.php OR includes/OutputPage.php file and it will insert the META tag ROBOTS NOINDEX, NOFOLLOW into the header. As you know, the ROBOTS NOINDEX, NOFOLLOW tag "
layout: post
---

I spent too much time today hunting down how to do this, so I thought I’d spell it out clearly.

Add the following snippet to your [LocalSettings.php](https://www.mediawiki.org/wiki/Manual:LocalSettings.php) ***OR*** [includes/OutputPage.php](https://www.mediawiki.org/wiki/Manual:OutputPage.php) file and it will insert the META tag ROBOTS NOINDEX, NOFOLLOW into the header.

As you know, the ROBOTS NOINDEX, NOFOLLOW tag will tell search engines not to index your site.

\## Adds global NOINDEX,NOFOLLOW  meta to site headers
$wgExtensionFunctions\[\] = 'globalNoIndex';
function globalNoIndex(){
   global $wgOut;
   $wgOut->addMeta ( 'ROBOTS' , 'NOINDEX,NOFOLLOW') ;
}

Why would you want that? Any number of reasons: you’re still developing it, it’s a private wiki for just you or a small group of people or maybe you want to block search engines to just to spite them.

The above snippet can be modified and used to insert any meta tag into the header of your mediawiki site.

I placed the code after defining the theme in my LocalSettings.php page and it worked beautifully. Not sure where specifically it should go. Please comment below if you know of a “best placement” for the code.
