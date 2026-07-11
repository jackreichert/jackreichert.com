---
title: "Debugging your code in WordPress: Tools of the Trade"
date: 2017-04-18
permalink: "/2017/04/18/debugging-your-code-in-wordpress-tools-of-the-trade/"
wp_id: 848
categories: ["Speaking Engagements"]
post_tags: ["debugging", "WPNYC"]
description: "As this is going live I am currently giving a talk at @WPNYC the WordPress New York Meetup group. There are two slides I skimmed over due to lack of time, but they are an essential part of the talk. In order to fulfill my promise to provide the complete story I am publishing this […]"
featured_image: "/assets/images/screen-shot-2017-04-16-at-1.03.32-pm-ce0dd23f.png"
layout: post
---

As this is going live I am currently giving a talk at [@WPNYC](https://wpnyc.org) the WordPress New York Meetup group. There are two slides I skimmed over due to lack of time, but they are an essential part of the talk. In order to fulfill my promise to provide the complete story I am publishing this post with the full story. Warning, this blogpost is a bit of a braindump. It is intended as notes to use to explore further. If you need something clarified, don’t heistate to comment.

The first slide is titled:

## Tools of the Trade

With the following content:

-   Separate development environment
-   `console.log()` / `error_log()` / `var_dump($var); die();`
-   `debug_backtrace()` / Xdebug
-   Inspect Element / Developer Tools
-   A good IDE
-   Simulators
-   Unit Testing

Let’s dig in…

### Separate Development Environment

Never go commando, period. There are always exceptions to the rule – when you cannot reproduce a bug on your development server while it’s glaring at you from production – but you should avoid coding live on production at all costs. Sooner or later you’ll break something and your site will be down, and it was perfectly preventable. This is as important as not ever modifying core WordPress files. There are many ways you can implement a development server. Keep in mind that the closer your development environment is to production in how it functions, the fewer bugs you’ll have due to discrepancies in implementation of your code.

-   [XAMPP](https://www.apachefriends.org/index.html), [MAMP](https://www.mamp.info/en/) and [WAMP](http://www.wampserver.com/en/) are all easy to use out of the box server solutions. I started out with them myself.
-   [Vagrant](https://www.vagrantup.com) is a great way you can channel your inner sysadmin. But you don’t need to be one to use Vagrant. The good people at [10up](https://10up.com) support [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV). Or you can use the [vagrant box](https://github.com/jackreichert/vagrant-ubuntu-wp-dev-env) one I built and use.
-   Get another account on the server you are hosting your live site on. It’ll be worth the money, just make sure it’s not accesssible from the “outside.” [Member’s only](https://wordpress.org/plugins/more-privacy-options/) plugins can help with that. Or use the [htaccess](https://stackoverflow.com/a/4400412/510734) or [nginx.conf](https://stackoverflow.com/a/8442408/510734) files to limit access by ip address.

### console.log() / error\_log() / var\_dump($var); die();

THE key to effective debugging is to know what you’re dealing with. These tools help you peek under the hood, test your assumptions, and understand what’s happening.

-   [Console](https://developer.mozilla.org/en-US/docs/Web/API/Console) is a VERY effective tool; its most used method is .log but it has a lot more. It’ll help you see what’s going on in your JavaScript code. We’ve come far from using alert().
-   [error\_log](https://php.net/manual/en/function.error-log.php) is similar to console, but server-side. Find out where your error logs are written to on your host. A server isn’t worth it’s salt if it doesn’t provide that. If you enjoy console.log check out [console\_log()](https://php.net/manual/en/debugger.php).
-   While the error\_log is cleaner, [it limits its output](https://php.net/manual/en/errorfunc.configuration.php#ini.log-errors-max-len). I find I like to see things in the browser, sometimes. I use this pattern, a lot, when debugging. `echo '<pre>'; var_dump($var); die();` It will “dump” the variable in a preformatted html tag, then die().

### debug\_backtrace() / Xdebug

[Xdebug](https://xdebug.org) provides a whole suite of extended debugging methods. You don’t need to start here, but if you’re looking to up your game, here’s where to go.

### Inspect Element / Developer Tools

Volumes of ink has been used talking about [devtools,](https://developer.chrome.com/devtools) so I won’t go in depth here. ![devtools-window.png](https://jack.reichert.systems/wp-content/uploads/sites/3/2017/04/devtools-window.png) Firebug changed our lives. Read up on it, use it. Personally, I enjoy designing in it too. It’s not just for debugging. I used devtoops to build this mockup to nag @Dropbox to request a feature.

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper"><a href="https://twitter.com/JackReichert/status/817753945871450114" rel="nofollow">https://twitter.com/JackReichert/status/817753945871450114</a></div></figure>

### A good IDE

I use [PHPStorm](https://www.jetbrains.com/phpstorm/). A lot of people swear by [Sublime](https://www.sublimetext.com). One thing I like about PHPStorm is that it has [deep integration with WordPress](https://confluence.jetbrains.com/display/PhpStorm/WordPress+Development+using+PhpStorm). The reason why this is essential is that it does a lot in the background to ensure good code.

-   It can autoformat, which means you’ll reduce your syntactical bugs.
-   Deep link to method sources, so you can more easily see what’s happening under the hood.
-   Code completion will help you make sure you’re using the right method, and give you a reason to should “DAMN YOU AUTOCORRECT” every so often.

### Simulators

If you’re expected to support a specific device, you better test in it. Unfortunatly we can’t all afford every device under the sun, but there are a lot of tools out there to help us with that.

-   [Modern.ie](https://developer.microsoft.com/en-us/microsoft-edge/tools/) provides virtual machines for testing different versions of Internet Exploreer.
-   [Use a mobile emulator](https://chrome.google.com/webstore/detail/mobile-browser-emulator/lbofcampnkjmiomohpbaihdcbjhbfepf?hl=en) sometimes making your screen narrower won’t cut it.

### Unit Testing

This is the single most important thing you can do to prevent bugs. It’s hard to get started. It’s overwhelming. But as the proverb says: the best time to plant a tree is 20 years ago, the second best time is now. **Protip:** Think about testing BEFORE you write your code… Look up [TDD](http://blog.cleancoder.com/uncle-bob/2017/03/06/TestingLikeTheTSA.html).

* * *

The second slide is titled:

## WordPress Specific Debugging Tools

With the following content:

-   define(‘WP\_DEBUG’, true);
-   Debug Bar plugin
-   All the Debug bar addons!!!
-   Style Guides

### define(‘WP\_DEBUG’, true);

There are a number of constants you can define in your wp-config.php file that can help your [debugging in WordPress](https://codex.wordpress.org/Debugging_in_WordPress).

### Debug Bar plugin

The [Debug Bar](https://wordpress.org/plugins/debug-bar/) is the equivalent to the devtools, but for WordPress. If you enable it you’ll get a window into how WordPress runs that you can’t get easily otherwise.

### All the Debug Bar addons!!!

Expanding on the previous tool. [There are a ton of plugins that hook into the Debug Bar](https://wordpress.org/plugins/search/debug+bar/) and extend it.

### Style Guides

This isn’t necessarily a WordPress specific tip, but if you’re using PHPStorm it comes with an auto formatting preset of WordPress’ code style. In any case, it doesn’t matter how you style your code (tabs vs. spaces) but only that you are consistent. If you are consistent with your coding style you’ll prevent a whole lot of bugs. You’ll prevent a whole lot more if you’re working with other people and you make sure you’re all styling your code the same way. Our brains evolved to see patterns, if your code styling isn’t consistent, you’ll miss details. You’ll have bugs.

## Conclusion

I hope this was helpful. There’s a lot I didn’t cover so as to not overwhelm. What’s really most important, which I covered in my talk is the following: Make it work, then make it work well. If you do this, your code will always be improving.
