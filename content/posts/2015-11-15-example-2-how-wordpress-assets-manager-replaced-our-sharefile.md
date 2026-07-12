---
title: "Example #2: How WordPress Assets Manager Replaced Our Sharefile"
date: 2015-11-15
permalink: "/2015/11/15/example-2-how-wordpress-assets-manager-replaced-our-sharefile/"
wp_id: 664
categories: ["Speaking Engagements"]
post_tags: ["file sharing", "Plugins", "WordCamp"]
description: "Two weeks ago I spoke at WordCamp NYC and demonstrated various ways you can augment your site by replacing or just importing various services you use. I brought three examples, last week I wrote about the first, Twitter. The second service on the chopping block was ShareFile. At the company I work a"
featured_image: "/assets/images/library-way-0e2eb0cf.jpg"
layout: post
---

Two weeks ago I [spoke at WordCamp NYC](https://www.jackreichert.com/2015/11/06/introducing-wordpress-sitehacks/) and demonstrated various ways you can augment your site by replacing [or just importing various services you use](https://www.jackreichert.com/2015/11/08/augmenting-ozhs-twitter-archiver/). I brought three examples, last week I wrote about the first, [Twitter](https://www.jackreichert.com/2015/11/08/augmenting-ozhs-twitter-archiver/).

The second service on the chopping block was ShareFile.

At the company I work at we were using ShareFile, which is a perfectly good tool. However due to the nature of file-sharing, and since we work with banks who are notorious for their ridiculous firewall/email filter settings, the ShareFile links were getting flagged. As a result, several of the emails we were sending out were not getting delivered.

I say ridiculous because if these institutions were consistent with security best-practices all would be fine; but, we get a lot of IE7 traffic to our sites from said partners. Using IE7 is like going whitewater rafting in a paper boat, so these organizations tend to overcompensate by implementing ridiculous firewalls.

My boss asked if I could build an alternative solution.

## Initial requirements:

-   Easy way to upload files
-   Obfuscate links to keep unrestricted assets undiscoverable
-   Secure user management system
-   Expiring links to files
-   Ability to require an account/login to access a link

WordPress has a lot of these features already. There is a robust file uploader/manager that gets constant attention by the development team. There’s user management built-in; leveraging `if ( is_user_logged_in() ) { … }` couldn’t be easier.

So I decided to build our new file-sharing system on top of WordPress.

The biggest initial hurdle to overcome was: How would I obfuscate the links for the uploaded files? Normally, we upload a file, and link to that file?

## Why would I *want* to obfuscate?

If someone sees a link to an image `/wp-content/uploads/2015/11/cool-image001.jpeg` and they like that image, they might see if the file `cool-image002.jpeg` exists as well in that same folder. Now if you’re just serving images, it may or may not be a big deal. What if, though, you have confidential files on your server. You can’t restrict access and require a login; however, you don’t want people poking around where they’re not supposed to.

Well, how do web servers, like Apache or Nginx, normally serve files?

When you link to a file on your server, or embed an image that was uploaded to a server, the web server looks in the path you’re requesting for that file. If it finds the file, it reads it, sends the appropriate headers – describing what file it is about to send –then sends the data of that file to your browser.

If I want to hijack that process, I’ll have to mimic that functionality.

<figure class="alignright size-large"><img loading="lazy" width="300" height="515" data-attachment-id="668" data-permalink="/screen-shot-2015-11-14-at-9-46-15-am-e1447600355967/" data-orig-file="/assets/images/screen-shot-2015-11-14-at-9.46.15-am-e1447600355967-d0f4a4c9.png" data-orig-size="300,515" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="screen-shot-2015-11-14-at-9.46.15-am-e1447600355967" data-image-description="" data-image-caption="" data-large-file="/assets/images/screen-shot-2015-11-14-at-9.46.15-am-e1447600355967-d0f4a4c9.png" src="/assets/images/screen-shot-2015-11-14-at-9.46.15-am-e1447600355967-d0f4a4c9.png" alt="" class="wp-image-668" sizes="auto, (max-width: 300px) 100vw, 300px"></figure>

WordPress creates a post for every file you upload called “attachment” post\_type. Like with every post\_type, you can link directly to the post\_type’s “post” (see image).

You know how you can link to the “attachment page” when you’re inserting an image? That’s because every attachment is essentially a post as well. Depending on the theme you’re using WordPress will display a template page for that “post”, even thought it actually is an attachment. In most cases it will just be a link to the file.

I took advantage of this functionality.

When you upload a file with my plugin, [Assets Manager for WordPress](https://wordpress.org/plugins/assets-manager/), it links each upload as an attachment to the parent post of a new post\_type I created for the plugin called “asset”.

The edit screen for each of the posts of my new post\_type ‘asset’ has listed all the attached files with a link to the “attachment page” of each asset. When you create an “asset” page and upload files I obfuscate the url for that “post” as well as for each of the attachment “posts”. This way no one can figure out the link and discover assets they weren’t supposed to. I can do this easily because none of the paths on your site are “real”, except when you’re linking to actual assets – like images and files. [That’s the magic of Pretty Permalinks](https://codex.wordpress.org/Using_Permalinks).

<figure class="wp-block-image size-large"><img loading="lazy" width="1024" height="457" data-attachment-id="669" data-permalink="/screen-shot-2015-11-15-at-10-09-45-am-1024x457-1/" data-orig-file="/assets/images/screen-shot-2015-11-15-at-10.09.45-am-1024x457-1-7d771ef6.png" data-orig-size="1024,457" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="screen-shot-2015-11-15-at-10.09.45-am-1024&#215;457-1" data-image-description="" data-image-caption="" data-large-file="/assets/images/screen-shot-2015-11-15-at-10.09.45-am-1024x457-1-7d771ef6.png" src="/assets/images/screen-shot-2015-11-15-at-10.09.45-am-1024x457-1-7d771ef6.png" alt="" class="wp-image-669" sizes="auto, (max-width: 1024px) 100vw, 1024px"></figure>

Those obfuscated links are the links you give out, instead of the link to the file itself. My plugin even adds the file extension (e.g. png) so that it doesn’t raise any security flags in browsers. Because of this I can meet the requirements of the plugin above, plus extensively more potential functionality.

From a browser’s perspective, it works exactly as it would if I gave the direct link to the file. When someone goes to the “attachment page” of an asset, my plugin hijacks the normal WordPress template hierarchy functionality. Instead of serving a template page, it checks were the attachment is, reads the file, serves the proper headers, then sends over the file data. Just like the way the web server serves a file.

Now, because this all happens in WordPress, instead of on the web server level, we can do fun things. Like before the plugin serves the file it can check to see who is trying to viewing the link and you can decide who gets to see that file; do you want to restrict the file only to logged in users? You can also decide how long you want the file to be accessible, and automatically not serve the file if a week has passed.

Let’s say you sent out an email with a bunch of links, then your boss told you that actually there’s a moratorium on those files? No problem! Just disable the files until the moratorium has passed.

Let’s say you sent out the wrong files? You can easily replace the file without changing the link. Since you’re not linking directly to the file that’s *really* easy.

Want to try it out? [Assets Manager – file sharing for WordPress](https://wordpress.org/plugins/assets-manager/).

<figure class="wp-block-image size-large"><img loading="lazy" width="1024" height="547" data-attachment-id="670" data-permalink="/screen-shot-2015-11-14-at-9-59-53-am-1024x547-1/" data-orig-file="/assets/images/screen-shot-2015-11-14-at-9.59.53-am-1024x547-1-a3c4543d.png" data-orig-size="1024,547" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="screen-shot-2015-11-14-at-9.59.53-am-1024&#215;547-1" data-image-description="" data-image-caption="" data-large-file="/assets/images/screen-shot-2015-11-14-at-9.59.53-am-1024x547-1-a3c4543d.png" src="/assets/images/screen-shot-2015-11-14-at-9.59.53-am-1024x547-1-a3c4543d.png" alt="" class="wp-image-670" sizes="auto, (max-width: 1024px) 100vw, 1024px"></figure>

**Note:** This version is not the one we use at work. It doesn’t yet have the file replacement functionality. I’m working on a new version with improved UX. If you have any comments or suggestions [contact me](https://www.jackreichert.com/contact/).

**Conclusion:** Here is another example of how [you can leverage the built-in functionality of WordPress to create a service](https://www.jackreichert.com/2015/11/06/introducing-wordpress-sitehacks/) that you can manage yourself; instead of handing over your intellectual property to a third party.

I could have built it from scratch, or using a “proper” framework, but now I can pop this plugin into any site I run and have it seamlessly integrated.
