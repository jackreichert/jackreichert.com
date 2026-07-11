---
title: "Plugin Concept: Request Post Feedback (with revisions)"
date: 2017-01-20
permalink: "/2017/01/20/plugin-concept-request-post-feedback-with-revisions/"
wp_id: 829
categories: ["Web Development"]
post_tags: ["Matt Mullenweg", "Plugins", "Post Status", "WordPress"]
description: "I was listening to the Post Status Draft podcast from about a year ago where Brian, the founder of Post Status, interviews Matt Mullenweg. In their discussion they Brian mentioned the Drafts with Friends plugin and how he’d like to see something like Google Docs collaboration, editing. That got me t"
featured_image: "/assets/images/pizza-chocolate-bb5548ae.jpg"
layout: post
---

I was listening to the [Post Status Draft podcast](https://poststatus.com/interviews-matt-mullenweg/) from about a year ago where Brian, the founder of Post Status, interviews [Matt Mullenweg](https://ma.tt).

In their discussion they Brian mentioned the [Drafts with Friends](https://wordpress.org/plugins/wp-draftsforfriends/) plugin and how he’d like to see something like Google Docs collaboration, editing.

That got me thinking about what the MVP, minimum viable product, for that would look like… and I came up with the [Request Post Feedback](https://github.com/jackreichert/request-post-feedback) plugin.

### Here’s how it works:

<figure class="aligncenter size-large"><img loading="lazy" width="750" height="607" data-attachment-id="830" data-permalink="/2017/01/20/plugin-concept-request-post-feedback-with-revisions/admin-edit/" data-orig-file="/assets/images/admin-edit-23350fb0.png" data-orig-size="1024,830" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="admin-edit" data-image-description="" data-image-caption="" data-large-file="/assets/images/admin-edit-23350fb0.png?w=1024" src="/assets/images/admin-edit-23350fb0.png" alt="" class="wp-image-830" sizes="auto, (max-width: 750px) 100vw, 750px"></figure>

Under the content editor there is a new meta box. At the top of the box you can enter an email to generate a new feedback link. This is how Posts With Friends already works.

At the bottom of the meta box you can manage the different links that you already generated and see if someone has already given feedback.

<figure class="aligncenter size-large"><img loading="lazy" width="750" height="607" data-attachment-id="831" data-permalink="/2017/01/20/plugin-concept-request-post-feedback-with-revisions/front-end-edit/" data-orig-file="/assets/images/front-end-edit-26495ae2.png" data-orig-size="1024,830" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="front-end-edit" data-image-description="" data-image-caption="" data-large-file="/assets/images/front-end-edit-26495ae2.png?w=1024" src="/assets/images/front-end-edit-26495ae2.png" alt="" class="wp-image-831" sizes="auto, (max-width: 750px) 100vw, 750px"></figure>

When you send a link to someone they aren’t taken to the admin; rather, they are taken to the front-end of your site. Where the post would normally be, there is an embedded editor with the content of your post ready for their perusal.

When they submit their feedback it is saved as a revision post\_type of your post.

<figure class="aligncenter size-large"><img loading="lazy" width="750" height="607" data-attachment-id="833" data-permalink="/2017/01/20/plugin-concept-request-post-feedback-with-revisions/revisions/" data-orig-file="/assets/images/revisions-ccaa2370.png" data-orig-size="1024,830" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="revisions" data-image-description="" data-image-caption="" data-large-file="/assets/images/revisions-ccaa2370.png?w=1024" src="/assets/images/revisions-ccaa2370.png" alt="" class="wp-image-833" sizes="auto, (max-width: 750px) 100vw, 750px"></figure>

What that means is that you can leverage the revisions browser comparison tool already built into WordPress and see what they suggested.

If you like the concept try it out. It’s not yet live on the WordPress plugin repository, because I haven’t decided if I’ll maintain it yet. But I welcome you to download it from [the project repo](https://github.com/jackreichert/request-post-feedback) and try it out. Please note: while I made sure that it was solidly built, it’s still an MVP/Proof of concept.
