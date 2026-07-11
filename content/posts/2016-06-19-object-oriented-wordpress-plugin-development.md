---
title: "Object Oriented WordPress Plugin Development"
date: 2016-06-19
permalink: "/2016/06/19/object-oriented-wordpress-plugin-development/"
wp_id: 783
categories: ["Web Development"]
post_tags: ["factory pattern", "object oriented programming", "oop", "solid", "solid principles"]
description: "I’m refactoring my WordPress plugins to implement better Object Oriented Programming concepts in them. During my exploration I came across wppb.io. I have the utmost respect for the initiative and contributors to the project. I see this post as an exercise in understanding other people’s code, and t"
featured_image: "/assets/images/flowers-daa91c88.jpg"
layout: post
---

I’m refactoring my WordPress plugins to implement better Object Oriented Programming concepts in them. During my exploration I came across [wppb.io](https://github.com/devinvinson/WordPress-Plugin-Boilerplate/).

I have the utmost respect for the initiative and contributors to the project. I see this post as an exercise in understanding other people’s code, and thinking about what *I* would do. So I’m going to do my best to rip the project part.

I may be way off on some things, and spot on with others. I hope that if the contributors find this they don’t see it as a negative review; rather, an initiation of a discussion and request to jump in with their thoughts.

Let’s start with the first file WordPress loads…

### /plugin-name.php

Lines 28:31
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
  die;
}

Security features like this are all too often overlooked and ignored. I want to say that this should be at the top of every file in every plugin. However, it may cause issues for testing suites.

As for the rest of this file, a lot of the project is about encapsulating various aspects of a plugin into modules. This entire file, however, is all functions.

Why run:

register\_activation\_hook( \_\_FILE\_\_, 'activate\_plugin\_name' );

when you can run:

register\_activation\_hook( \_\_FILE\_\_, array( $this, 'activate' ) );

Also, I also don’t understand what you are gaining by starting up your plugin like so:

function run\_plugin\_name() {
  $plugin = new Plugin\_Name();
  $plugin->run();
}
run\_plugin\_name();

I’m not sure what you’re gaining by doing that in a function instead of encapsulating the whole plugin in a class, including activation/deactivation hooks and then instantiating the class.

$Plugin\_Name\_Wrapper = new Plugin\_Name\_Wrapper();

There is a strong case to make your classes not run on instantiation. But then, do this:

$Plugin\_Name\_Wrapper = new Plugin\_Name\_Wrapper();

One of the benefits of encapsulating your plugin is that since WordPress is backwards compatible, it’s really the best way to namespace. Additionally, why would you wrap the instantiation code in a function then run it, unless you were to need it elsewhere. So it seems extraneous to me.

### /includes, /admin, /public

This is nice. A clear separation between the different pieces of what you might put into your plugin. I’m not sure, though, if every component necessarily would break out so cleanly.

As I understand best practices for creating components, a component is a collection of classes or functions that all would be changed for the same reason.

In this case, there might be a component in which might need a bit of /admin, and a bit of /public. If you don’t do this you will most probably end up violating several of the [SOLID](https://en.wikipedia.org/wiki/SOLID_\(object-oriented_design\)) principles. The single responsibility principle immediately goes out the window, what goes in admin? Widgets, and admin page, and saving the admin page… Also if you have these clear boundaries you cannot invert dependencies. I could go on.

You could still use this structure if you separate out each class for each piece individually, but I’m still not sure if there’s a benefit to pushing yourself into thinking along these boundaries.

### /languages

If you are internationalizing your plugin, and you do it properly, all your strings would be in /languages, in which case that is a good directory to have.

### /includes/class-plugin-name-(de)activator.php

Moving on… Let’s follow the includes, we have `class-plugin-name-activator` and `class-plugin-name-deactivator`; they both work and are structured as I’d expect. Run all the set-up/tear-down methods you need to get your plugin running.

### /includes/class-plugin-name.php, /includes/class-plugin-name-loader.php

I really do *not* understand what the point of the Loader class is for. I think it’s an attempt to not violate DRY (Don’t Repeat Yourself).

Take a look at this:

$this->loader->add\_action( 'plugins\_loaded', $plugin\_i18n, 'load\_plugin\_textdomain' );

and

add\_action( 'plugins\_loaded', array( 'Plugin\_Name\_i18n', 'load\_plugin\_textdomain' ) );

Do you see a difference? Same about of repetition between the two. I think the thought behind it is that maybe this is how the authors wished hooks worked in WordPress?

Here’s the thing. Hooks are one of the *most* OOP aspects of WordPress. It easily allows you to to have all your code open for extension, but closed for modification; which, in turn enables dependency inversion.

Now this doesn’t negate that, but I also don’t see any benefits to adding this pseudo-factory. It only makes another layer that is unnecessary. It creates something else you need to test, and make sure is working. What happens if you need to change it? You’re going to have to change all the classes that depend upon it, and for what?

I think I picked on this enough.

I’m going through this, because I decided to refactor some of my *own* plugins to be better Object Oriented and so I’m thinking about this now. I’ll be releasing a post about what I ended up doing once I release the new version.

I’d just like to close by saying that there are a whole lot of nice concepts implemented here, it made me look at how I structure my projects more critically. I just feel that there’s a lot of things, as well, that are \_only \_for the sake of code and don’t *actually* provide Object Oriented benefits.

To my developer friends out there, what are *your* thoughts?

*About the image: Central Park, NYC*
