---
title: "Demystifying the WordPress Plugin"
date: 2014-06-29
permalink: "/2014/06/29/demystifying-the-wordpress-plugin/"
wp_id: 351
categories: ["Web Development"]
post_tags: ["Plugins", "WordPress"]
description: "I asked one of the guys on my team to build a WordPress plugin, he balked. I realized that he just didn’t get how easy it is. So I thought I’d dedicate some time to dispelling the myth that plugins are complicated to write. “Plugin” sounds formidable. But really, a plugin is a file in […]"
layout: post
---

I asked one of the guys on my team to build a WordPress plugin, he balked. I realized that he just didn’t get how easy it is. So I thought I’d dedicate some time to dispelling the myth that plugins are complicated to write. “Plugin” sounds formidable. But really, a plugin is a file in the plugins directory with a comment. That’s it. To build your first plugin create a file, name it whatever you like, and place the following code at the top:

```
<?php
/**
* Plugin Name: Name Of The Plugin
* Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
* Description: A brief description of the Plugin.
* Version: The Plugin's Version Number, e.g.: 1.0
* Author: Name Of The Plugin Author
* Author URI: http://URI_Of_The_Plugin_Author
* License: A "Slug" license name e.g. GPL2
*/
```

Upload that file to `YOUR-SITE-ROOT/wp-content/plugins/` and voilà!

<figure class="wp-block-image size-large"><img loading="lazy" width="1024" height="92" data-attachment-id="350" data-permalink="/2014/06/29/demystifying-the-wordpress-plugin/img_0009/" data-orig-file="/assets/images/img_0009-9dba0c0b.jpg" data-orig-size="1172,106" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"1"}" data-image-title="img_0009" data-image-description="" data-image-caption="" data-large-file="/assets/images/img_0009-9dba0c0b.jpg?w=1172" src="/assets/images/img_0009-9dba0c0b.jpg" alt="" class="wp-image-350" sizes="auto, (max-width: 1024px) 100vw, 1024px"></figure>

Go to your plugins menu and you’ll see your shiny new plugin there.

What do you put in there besides the comment? Typically, anything you’d put in your theme’s functions.php file. Unlike with the functions.php file which runs everything you put in it, where plugins are concerned you can decide whether to “activate” the code or not.

[Here’s a great post with 25+ potential plugins](http://www.wpbeginner.com/wp-tutorials/25-extremely-useful-tricks-for-the-wordpress-functions-file/). Let’s try #3 (Don’t forget to change the plugin’s name):

```
<?php
/**
* Plugin Name: Remove WordPress Version Number
* Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
* Description: A brief description of the Plugin.
* Version: The Plugin's Version Number, e.g.: 1.0
* Author: Name Of The Plugin Author
* Author URI: http://URI_Of_The_Plugin_Author
* License: A "Slug" license name e.g. GPL2
*/

function wpbeginner_remove_version() {
    return "";
}
add_filter("the_generator", "wpbeginner_remove_version"); 
```

See! Wasn’t that easy?

Typically, you’ll want to add to your functions.php file code that is necessary for your theme to run, and make plugins for all functionality that is separate from the theme.

There’s a lot more to say about plugins, the example above is rather simple, but it should get you on your way.
