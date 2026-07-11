---
title: "How WordPress Works: Dissecting the Database"
date: 2013-12-01
permalink: "/2013/12/01/how-wordpress-works-dissecting-the-database/"
wp_id: 305
categories: ["Web Development"]
post_tags: ["databases", "post_meta", "WordPress"]
description: "There is beauty in the simplicity of WordPress’ database structure. All the functionality of posts, pages, custom posts, taxonomy, users and core settings are here. In 11 tables. For comparison, the almighty Drupal has 72 tables, Joomla has 68. All posts, pages and custom posts are saved in the wp_p"
layout: post
---

<figure class="wp-block-image size-large"><a href="/assets/images/wp-schema-f1078a97.png"><img loading="lazy" width="1024" height="759" data-attachment-id="306" data-permalink="/wp-schema/" data-orig-file="/assets/images/wp-schema-f1078a97.png" data-orig-size="1143,848" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="wp-schema" data-image-description="" data-image-caption="" data-large-file="/assets/images/wp-schema-f1078a97.png?w=1143" src="/assets/images/wp-schema-f1078a97.png" alt="" class="wp-image-306" sizes="auto, (max-width: 1024px) 100vw, 1024px"></a></figure>

There is beauty in the simplicity of WordPress’ database structure. All the functionality of posts, pages, custom posts, taxonomy, users and core settings are here. In 11 tables.

For comparison, the almighty Drupal has 72 tables, Joomla has 68.

All posts, pages and custom posts are saved in the `wp_posts` table. They are differentiated by the `post_type` column. Any additional data you need to save with your post (whatever the post\_type is) can be stored in `wp_postmeta`.

Metas are extremely powerful. You can extend everything in pretty much any way with them.

Example: Your site manages the courses of an educational institute. So you create the post\_types of ‘Course’ and ‘Lecturer’. Now you can save in the `post_content` all about the ‘Course’ and ‘Lecturer’, but what if you need to store extra information about each, that you’ll need to access easily. For a course you might want to know the dates the course is taking place. If you save that in the ‘post\_content’, as part of the other descriptive content, you will not be able to run queries easily on that information, you can’t sort it, pull it out for widgets etc. That’s where meta comes in.

<figure class="wp-block-image size-large"><a href="/assets/images/wp_postmeta-table-5914b362.png"><img loading="lazy" width="1011" height="833" data-attachment-id="307" data-permalink="/wp_postmeta-table/" data-orig-file="/assets/images/wp_postmeta-table-5914b362.png" data-orig-size="1011,833" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="wp_postmeta-table" data-image-description="" data-image-caption="" data-large-file="/assets/images/wp_postmeta-table-5914b362.png" src="/assets/images/wp_postmeta-table-5914b362.png" alt="" class="wp-image-307" sizes="auto, (max-width: 1011px) 100vw, 1011px"></a></figure>

Each of the meta tables, postmeta, commentmeta and usermeta each have 4 columns: meta\_id, post\_id (or the equivalent), meta\_key, and meta\_value. Each post can have whatever extra meta you need, and it can be pulled out with a simple SELECT WHERE meta\_key = ‘X’; command.

And that’s pretty much it. All of WordPress’s functionality is there. Comments, users, and posts all have their basic structure in their main table and all can be extended as much as needed through their meta.

Taxonomy is somewhat more complicated. It requires 3 tables. wp\_term\_taxonomy stores the types of taxonomies. Categories, Tags, and any other custom taxonomy type you create will be here. The individual terms will be in wp\_terms. So if you have 3 categories and 15 tags in your site, each of those will be stored in wp\_terms. wp\_term\_relationships links them all together keeping it all in order. Easy-peasy, right?

The basic options of the WordPress install are in wp\_options. The only table out of order is wp\_links, a relic of installs past. Today all the link functionality can easily be incorporated as a custom\_post\_type. But because WordPress cares about backwards compatibility, the table remains.

That’s it. Lean and mean.

One question that comes up about meta is, doesn’t that mean that there are a lot of extra queries hitting the database? This would be true, if not for the caching system of WordPress. So each time you call get\_post\_meta() you’re not hitting the database. So you’re good.

So when people say that WordPress is “bloated” I’m not quite sure what they’re talking about.
