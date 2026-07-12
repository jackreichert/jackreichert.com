---
title: "Refactoring a WordPress plugin, Object-oriented, a start"
date: 2016-11-02
permalink: "/2016/11/02/refactoring-a-wordpress-plugin-object-oriented-a-start/"
wp_id: 814
categories: ["Development Theory"]
post_tags: ["oop", "Plugins", "solid principles", "WordPress"]
description: "I recently dissected an Object Oriented WordPress plugin boilerplate. This exploration was part of a project I am undertaking to explore best practices for implementing Object Oriented principles in WordPress development. When it comes to implementing coding principles, I’m generally not a purist — "
featured_image: "/assets/images/graveyard-yolo-04bacb7c.jpg"
layout: post
---

I recently [dissected  an Object Oriented WordPress plugin boilerplate](https://www.jackreichert.com/2016/06/object-oriented-wordpress-plugin-development/). This exploration was part of a project I am undertaking to explore best practices for implementing Object Oriented principles in WordPress development.

When it comes to implementing coding principles, I’m generally not a purist — I aim to be utilitarian. One of the dictums I drum into my team is: “Make it work, *then* make it work well.” Do not take that to mean I’m sloppy, the second half of that statement holds as much weight as the first.

In the spirit of “make it work well”, I decided to refactor my [Assets Manager plugin](https://wordpress.org/plugins/assets-manager/) for this exploration, as I have not updated it in a while.

My goal here was *not* to create a pure Object Oriented plugin implementing *all* the glorious principles. There is a lot more I can do, and I will discuss some of those ideas as I explain what I did. Mainly, in this refactor, I wanted to accomplish the following:

1.  Implement the [Single Responsibility Principle](https://8thlight.com/blog/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html).
2.  [Decouple the various components](https://en.wikipedia.org/wiki/Interface_segregation_principle) of the plugin from each other.
3.  Lay the groundwork for further implementation of more principles.

#### Single Responsibility Principle

Of of the banes of every developer is cutting through spaghetti code. I’ve discovered — from refactoring multitudes of lines of code — that the simplest, most effective way to reduce and prevent spaghetti is by applying this principle. Like spaghetti, your code cannot get tangled if it’s too short to tangle up.

#### Decouple the various components

While recompilation isn’t an issue with PHP/WordPress, there are still benefits to decoupling. First, reusability: if your components work independent of each other you can stash your pieces away for another project. You also don’t have to repeat your code if you need the same functionality elsewhere. Don’t Repeat Yourself!!!

But perhaps, more important than reusability is stability. The more interdependent components are in your project, the more fragile your project is overall. If you change one thing, the more other components depend on that piece, the more chance you have that you are breaking one of those other components.

This is the whole reason for the Open/Closed Principle as well as the Interface Segregation Principle. Aside from SOLID, though, this is also the reason why WordPress is riddled through and through with hooks. WordPress hooks allow for developers to change the functionality of the core, or other people’s plugins, without having to change the core, or foreign plugin, code.

### Taking Stock

If you look at the [previous version](https://github.com/jackreichert/assets-manager/blob/7093a729ac359f6b37791d103a10dcf00eca530b/wp-assets-manager.php) you’ll see that the extent of Object Oriented implementation is an encapsulation of the code, and that’s about it.

This isn’t a *bad* practice per-se. If you are going to keep to best practices of compatibility standards with WordPress, you cannot use [php namespaces](https://wordpress.stackexchange.com/a/166532) in your plugins. Namespaces were introduced in PHP 5.3 and, as of writing this, WordPress still supports as far back as PHP 5.2.4.

A first step you can take when implementing Objects in your WordPress plugins is to wrap your code in a class. If you do this, you do not have to worry about the names of your functions conflicting with the names of other functions in other plugins. This approach is called the “God Class,” as it creates one class that does it all. It’s not all that sophisticated, nor is it really Object Oriented either.

On this topic, once you start adding classes to your plugins, there is a fascinating and \[thorough breakdown of the different ways to instantiate a WordPress plugin\]\[6\] as a class on the WordPress Stack Exchange community.

Following is a breakdown of the files in the new-and-improved plugin:

### wp-asssets-manger.php

This should be renamed to match the directory (assets-manager), but I’m not sure whether the plugin upgrade process will work if I do this. Because this file is not named as the plugin directory, it makes generating test suites more complicated, but it’s also not a big deal.

The main job of this class is to instantiate all the other pieces of the plugin; I may implement an autoloader here at some point. While this class is dependent on ALL the other classes, since the only thing it does is instantiate all the other classes, it still is a fairly stable class. It doesn’t care about the intricacies of the other classes it uses. As long as the function names stay the same, you will only have to change this class if you need to add another component.

The other minor job of this class is to ensure that the [rewrite rules are flushed when the post type is being created](https://www.jackreichert.com/2016/07/doesnt-flush_rewrite_rules-work-plugin/). Yes, this class is supposed to do one thing, but other, more pure ways of doing this would be convoluted — creating then deleting options in the database. I thought that that was silly to do simply to keep with a guideline, so I opted for this small infraction.

### inc/Asset\_Post\_Type.php

When classes do one thing, they tend to be boring, and that’s a good thing.

I have an empty constructor here because the logical alternative would be to put into it  the hooks call. That would make tests more complicated, so I didn’t do that.

### inc/Asset.php

I tried to include in here all the specific logic about how each individual asset works: the metadata, when are users allowed to access an asset, the asset link, etc. I did this to pull it away from the god class. The next step will be to pull out the specific restrictions as components onto themselves.

Currently, they all hook into `pre_asset_serve` which is a hook I put into the class that serves the asset. Each restriction should independently hook into the asset class.

Additionally, the UI is still intertwined with Admin.php, so if you were to add features to the asset, you would need to change that, as well as the JS file. I think this is a step in the right direction, perhaps next iteration will include this decoupling.

### inc/Serve\_Attachment.php

This does exactly what it says, nothing else. It hooks into WordPress before headers are sent, if the request is an Asset, it serves that request.

This was built with the Open closed principle in mind, open for extension, closed for modification. One of the most powerful features of WordPress are the hooks; which, are the embodiment of the Open closed principle.

Every WordPress developer learns at one point or another early in their career that you do not change the core, or anything that may be updated for that matter.

How is this learned?

Well, they make a change, to the core, or a plugin, or theme. Then, at some point in the future they forget that they had made that change and they update whatever it is they made the change to.

And everything breaks.

Well, maybe not everything; but whatever they were trying to accomplish with their modification is now lost.

Hooks are peppered throughout the core, well developed themes, and plugins. They allow other developers to hook into the code and tell it to do something without changing the code. This way when an update comes out, they can update without losing those changes.

Serve\_Attachment.php has the hook `do_action( 'pre_asset_serve', $this->attachment_id );` before the asset is served. I eat my own dog food here and hook into that action from Check\_Asset\_Restrictions.php to see if that asset should actually be served.

### inc/Check\_Asset\_Restrictions.php

This is the other side of my implementation of the Open Closed principle, discussed in the previous file.

This class hooks into `pre_asset_serve` and runs all the checks it needs to. This class needs to have a certain amount of knowledge about how Asset.php works, so it’s not ideal. This is another example of how it’s a work in progress.

The fun thing about this is it runs entirely on hooks. It hooks into `pre_asset_serve` and it has a filter itself through which others can change the `no_serve_message`.

### inc/Admin.php

This class is responsible for the admin display of the assets on the post type page.

As I wrote above. Ideally, each feature of the asset — expires, require login etc. –should be a separate component hooking in here, and where the file is served. Perhaps I’ll do that in the next iteration. Doing that would coincide better with the Interface segregation principle.

As-is, it think this approach is better than it was before. The admin display

### inc/Update\_Assets.php

This is the biggest violation of the Single Responsibility principle. On the one hand it’s responsible for the AJAX requests. On the other hand it’s responsible for ALL the AJAX requests. It wouldn’t be difficult to break up. Next version.

### inc/Log\_Assets\_Access.php

Completely self-contained, hooks directly into `pre_serve_asset, d`oes (almost) one thing.

I put `create_log_table()` into here, because it is a single function that is needed to make it work. It’s static so it can be accessed on plugin activation without instantiating the whole class.

### js/asset-manager.js

This could benefit from the implementation of a JavaScript framework. I’m considering BackboneJS for the next iteration of the plugin. I’d use that library since it’s already included in the WordPress core.

My goal for this file was twofold:

-   To implement wp.media. Back when I first built this, wp.media didn’t exist. I implemented  Plupload as a jQuery plugin in my original version. By using wp.media here I’m making the plugin “future proof.” If ever WordPress moves away from Plupload, they would implement whatever alternative via wp.media.
-   To break apart big functions. There was a huge spaghetti mess here before. Now that each “thing” is its own function I can iterate further in the next version.

### Conclusion

This isn’t a finished product, nor is it the best I can do. But it’s a good step in the right direction. I learned a lot exploring what other people are doing with their plugins, and it was fun to flex my refactoring muscles to do this project. I hope you enjoyed, I did!

If you have any ideas about what steps you would want to see taken next, feel free to [@jackreichert](/mentions/jackreichert/).
