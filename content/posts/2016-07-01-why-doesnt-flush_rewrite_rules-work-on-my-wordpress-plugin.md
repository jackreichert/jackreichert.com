---
title: "Why doesn’t flush_rewrite_rules() work on my WordPress plugin?"
date: 2016-07-01
permalink: "/2016/07/01/why-doesnt-flush_rewrite_rules-work-on-my-wordpress-plugin/"
wp_id: 794
categories: ["Web Development"]
post_tags: ["rewrite rules", "WordPress"]
description: "One common issue that people run into when using custom post types in their plugin is that the pretty permalink structure doesn’t seem to take hold on plugin activation. When adding new paths into the permalink structure, like with a new custom post type, you typically need to run flush_rewrite_rule"
featured_image: "/assets/images/potty-8139ba37.jpg"
layout: post
---

One common issue that people run into when using [custom post types](https://codex.wordpress.org/Post_Types) in their plugin is that the [pretty permalink](https://codex.wordpress.org/Using_Permalinks) structure doesn’t seem to take hold on plugin activation.

When adding new paths into the permalink structure, like with a new custom post type, you typically need to run `flush_rewrite_rules()` in order for them to take hold. One common piece of advice people give is to visit the Permalinks page in the Settings menu in wp-admin. The reason for this is that page runs `flush_rewrite_rules()` on load.

The problem with this advice is that you do not want to have to tell your plugin users that they have to visit that page after they activate your plugin. They *should* be able to click “activate” and it *should* just work.

One would think that if you add `flush_rewrite_rules()` to the [activation function](https://codex.wordpress.org/Function_Reference/register_activation_hook) for your plugin that that should do the trick, right?

No.

Well, yes and no.

If you call [`register_activation_hook()`](https://codex.wordpress.org/Function_Reference/register_activation_hook) when you are supposed to, \_[not](https://codex.wordpress.org/Function_Reference/register_activation_hook#Notes)\_ [in a hook](https://codex.wordpress.org/Function_Reference/register_activation_hook#Notes), then it will run well before your custom post type is registered – in `init`. So it never actually gets to init, and your rewrite rules are never flushed.

So you *do* need to call `flush_rewrite_rules()` in your activation function, but you need to register your custom post type there as well.

Something like this:

function my\_plugin\_activate() {
  register\_my\_custom\_post\_type();
  flush\_rewrite\_rules();
}
register\_activation\_hook( \_\_FILE\_\_, 'my\_plugin\_activate' );

I’ve run into this myself and lost time trying to debug what’s going on. If you are ever trying to figure out why something isn’t happening when you think it should, look at the hooks.

Subsequently, if you don’t think you can do something in WordPress, you’re probably wrong. There are hooks for *everything.*

I hope that it will help someone else avoid this pitfall.

*About the image: In restroom somewhere in NYC* Published
