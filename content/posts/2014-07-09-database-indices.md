---
title: "Database Indices"
date: 2014-07-09
permalink: "/2014/07/09/database-indices/"
wp_id: 348
categories: ["Web Development"]
post_tags: ["databases"]
description: "I recently had the pleasure of indexing our company’s sites’ tables. The custom CMS I inherited has some really brilliant code, but it also has quite a large amount of idiotic code blocks as well. In this case, the database was not thought out as best it could have. I was able to reduce some […]"
layout: post
---

I recently had the pleasure of indexing our company’s sites’ tables. The custom CMS I inherited has some really brilliant code, but it also has quite a large amount of idiotic code blocks as well. In this case, the database was not thought out as best it could have.

I was able to reduce some ridiculously long queries from 10 seconds down to 2 seconds with a few well placed indices. While 2 seconds isn’t anything to brag about. It’s quite an improvement. A database index is a lookup table that is created to help query information more quickly.

Before jumping in. One thing to note about indices is that there is an expense. If you go ahead and index your entire table it will likely take longer to run that query than a non-indexed table. So you have to be discerning about what you index.

The rule of thumb is, anything that alters the query, typically a WHERE clause or ORDER or GROUP, is a potential candidate for an index. For me, the rest of the process was trial and error, I went through all the potential candidates in my longest queries and tried various combinations until I came up with the quickest time for each query. There may be an algorithm for calculating the best columns to index. But this worked.

phpMyAdmin doesn’t make it easy to find your indices.

( Don’t get any funny ideas, this is just a typical WordPress install. )

1) Open a table, click “Structure” at the top.

<figure class="wp-block-image size-large"><img loading="lazy" width="1024" height="612" data-attachment-id="345" data-permalink="/2014/07/09/database-indices/img_0006/" data-orig-file="/assets/images/img_0006-2a0ba214.png" data-orig-size="1181,706" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="img_0006" data-image-description="" data-image-caption="" data-large-file="/assets/images/img_0006-2a0ba214.png?w=1181" src="/assets/images/img_0006-2a0ba214.png" alt="where are you?" class="wp-image-345" sizes="auto, (max-width: 1024px) 100vw, 1024px"></figure>

2) At the bottom of the page is a tiny link that says ”Indexes”. You can manage existing indices from here.

<figure class="wp-block-image size-large"><img loading="lazy" width="1024" height="597" data-attachment-id="346" data-permalink="/2014/07/09/database-indices/img_0007/" data-orig-file="/assets/images/img_0007-b0c780b4.png" data-orig-size="1181,689" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="img_0007" data-image-description="" data-image-caption="" data-large-file="/assets/images/img_0007-b0c780b4.png?w=1181" src="/assets/images/img_0007-b0c780b4.png" alt="oh there you are" class="wp-image-346" sizes="auto, (max-width: 1024px) 100vw, 1024px"></figure>

3) To add an index check to see if there’s a “More” menu on the column you’d like to index…

<figure class="wp-block-image size-large"><img loading="lazy" width="1024" height="605" data-attachment-id="347" data-permalink="/2014/07/09/database-indices/img_0008/" data-orig-file="/assets/images/img_0008-901ea6b9.png" data-orig-size="1178,697" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="img_0008" data-image-description="" data-image-caption="" data-large-file="/assets/images/img_0008-901ea6b9.png?w=1178" src="/assets/images/img_0008-901ea6b9.png" alt="and how do I do that?" class="wp-image-347" sizes="auto, (max-width: 1024px) 100vw, 1024px"></figure>

Enjoy!
