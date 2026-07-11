---
title: "Introducing Assets Manager for WordPress"
date: 2014-01-12
permalink: "/2014/01/12/introducing-assets-manager-for-wordpress/"
wp_id: 318
categories: ["Misc"]
post_tags: ["Plugins", "WordPress"]
description: "Note: if the links aren’t working properly, resave the pretty permalinks settings. Download Many of the companies which my current place of employment interacts with have a higher level of security on their firewall (they also tend to use IE7, such is life). Because of this we were having issues sha"
layout: post
---

**Note:** if the links aren’t working properly, resave the pretty permalinks settings.

[Download](https://wordpress.org/plugins/assets-manager/)

Many of the companies which my current place of employment interacts with have a higher level of security on their firewall (they also tend to use IE7, such is life). Because of this we were having issues sharing files with our constituents using the current industry file sharing tools.

To solve this problem I was tasked with creating a custom version of the corporate file sharing webapps for internal use. This would solve the problems we were having. All the links would be hosted on our domain, so we wouldn’t have to worry about getting third parties’ domains whitelisted in other company’s firewalls.

I decided that WordPress would be the best tool to build this on. It already has wonderful custom post management abilities as well as built-in media management tools.

I’m proud of what I built, so I got permission to release it to the WordPress community as a white-labeled plugin. Special thanks to [@binmind](https://twitter.com/binmind) for his extensive QA testing of the company’s plugin, his testing was crucial for development of the proof of concept and making sure everything was working as it should.

Instead of releasing the plugin as-is, I decided to rebuild it from scratch. I’ve learnt a lot since building the original assets manager and wanted to harden up the code base before releasing it to the public. Here are the results of my efforts.

## Features

<figure class="aligncenter size-large"><a href="/assets/images/features-d9488a9b.png"><img loading="lazy" width="608" height="166" data-attachment-id="319" data-permalink="/features/" data-orig-file="/assets/images/features-d9488a9b.png" data-orig-size="608,166" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="features" data-image-description="" data-image-caption="" data-large-file="/assets/images/features-d9488a9b.png" src="/assets/images/features-d9488a9b.png" alt="" class="wp-image-319" sizes="auto, (max-width: 608px) 100vw, 608px"></a></figure>

**Path Obfuscation:**

When a file is uploaded to WordPress you usually access it by linking directly to the location of where the file is hosted on the server. Assets Manager creates a unique obfuscated link for the file instead. When a file is downloaded it will receive the name you supply.

This does two things:

1.  You can’t figure out where the file is actually hosted, nor can you find other files based on some pattern. This is a security feature. Since the links to the files do not indicate anything about where the files are, or what they will be called when downloaded, you can’t guess where other files are stored.
2.  Files are never linked to, they are read and served. This allows #1 to work. It also means that before the file is served, Assets Manager can check various things, like if the user is logged in or if the file has “expired”.

**When should this file expire?**

Because of #2 above, Assets Manager intercepts files before they are served to the user from the server. This means that you can decide when and how the file will be served. I’ve included the ability to set how long the file should last. If you see you’re running out of time, you can extend the expiration by as long as you wish. The expiration date of the file is displayed next to the expiration feature letting you know when the file will expire.

**Enable this file?**

Same as the above feature. If you send out the wrong link, you can easily edit the settings and uncheck “Enabled”.

**Secure this file?**

I can also check to see if a user is logged in before serving them the file. It doesn’t actually make the file secure. If someone downloads it, they can send it anywhere. It only secures the link to the file.

**Remove file**

When a file is removed it is not deleted, it can still be found in the media library. It is just detached from that assets set. You can delete it via the media library if you wish.

**Stats**

A basic hit count is recorded per file.

**Asset Set**

Each asset set is a custom post type, the upload files are attached to this post. The URL for the asset set is obfuscated to protect it’s location. If it is linked to it will be indexed though. But bots can find it crawling the site.

You can upload a set of files, then only share the one link. That way if you decide to change the links around you can. Only available files will be listed there. So if a file is “secure” and the user isn’t logged in, they won’t see it, nor will anyone see expired and disabled files.

#### Future features I’m working on:

-   **Sha1:** If you upload a file that already exists it will link that file to your post instead of keeping multiple versions of the file. I believe that WordPress should work this way in general, all filesystems for that matter. That’s a benefit of networks. Why keep doubles, unless you intentionally are backing up the information?
-   **File replacement:** After uploading and even sharing a file you’ll be able to replace the file behind the active link with a file of the same MIME type. This way if you make a typo you can fix it quickly and replace the file without sending out a new link.
