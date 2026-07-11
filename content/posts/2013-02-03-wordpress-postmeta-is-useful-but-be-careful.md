---
title: "WordPress postmeta is useful, but be careful"
date: 2013-02-03
permalink: "/2013/02/03/wordpress-postmeta-is-useful-but-be-careful/"
wp_id: 243
categories: ["Web Development"]
description: "The add_post_meta(), delete_post_meta(), update_post_meta(), and get_post_meta() functions are really useful. It’s the perfect place to store information about a post. Many plugins take advantage of this storage for determining whether a specific post/page needs the feature they are providing or not"
layout: post
---

The `add_post_meta()`, `delete_post_meta()`, `update_post_meta()`, and `get_post_meta()` [functions are really useful](https://codex.wordpress.org/Function_Reference/post_meta_Function_Examples). It’s the perfect place to store information about a post. Many plugins take advantage of this storage for determining whether a specific post/page needs the feature they are providing or not.

Example: I recently installed on a site I manage the [WordPress HTTPS](http://mvied.com/projects/wordpress-https/) plugin; it allows you to force SSL on a specific page or post of your site.

Once enabling the plugin on a page on the site I checked the “Custom Fields” section (where the postmeta fields are displayed on the post edit page) and lo and behold:

<figure class="wp-block-image size-large"><a href="/assets/images/custom-fields-9db23940.png"><img loading="lazy" width="832" height="151" data-attachment-id="244" data-permalink="/custom-fields/" data-orig-file="/assets/images/custom-fields-9db23940.png" data-orig-size="832,151" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="custom-fields" data-image-description="" data-image-caption="" data-large-file="/assets/images/custom-fields-9db23940.png" src="/assets/images/custom-fields-9db23940.png" alt="" class="wp-image-244" sizes="auto, (max-width: 832px) 100vw, 832px"></a></figure>

A new postmeta field had been added.

Not surprising, as I said, it’s a useful place to store information. But there is one aspect of this feature you should be aware of: it is cached on page load.

When you run the [WordPress loop](https://codex.wordpress.org/The_Loop) many wonderful things happen to make your page load as efficiently as possible. One of those things is that *WordPress caches all the postmeta values when it loads the post*.

This means two things:

1.  You DON’T have to worry about the amount of times you call the same value through `get_post_meta()`, since your server is not making a new query for each function call.
2.  You DO have to worry about how much information you are storing in the postmeta since all that information will be loaded into server memory each time the post or page is loaded. Normal storage will work fine, store things like settings, variables and content that is needed for displaying the post. But don’t think about the postmeta as a place for unlimited storage. Some things *do* need their own table.

**What do I mean?** In short, don’t store post logs or *large* amounts of stats and data there.

**Example:** I made a file uploading plugin for a client to be used internally in their company, that leverages plupload built into WordPress. I tied the backend into the company’s LDAP server so that any org member could sign into the uplaoder and not need an account created. Each file uploaded was tied to the user’s account so that they could each manage their own files. There’s a few more useful features thrown in like: file expirations, secured files, and dynamic file serving. I’ll be happy to post specs at some point. It’s pretty cool.

One feature I added was logging file access. So that when each file is accessed there is a trace of who/what/where/when. I thought: “what better place to store that information then in the postmeta?” Right? NOPE. The site ran smoothly until images uploaded were used in an email blast. The blast only went out to a few thousand people, but each time any of those images were loaded i.e. each email opened, the **ENTIRE** access log was loaded into the memory.

Oops.

'update\_post\_meta\_cache' => false

Was the quick fix, and gave me time to offload the logs and refactor the code…

For more information about the power of the Loop I highly recommend watching Andrew Nacin’s talk about [WP\_Query](https://wordpress.tv/2012/06/15/andrew-nacin-wp_query/), [talk slides](http://www.slideshare.net/andrewnacin/you-dont-know-query-wordcamp-portland-2011).
