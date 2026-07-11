---
title: "Announcing: The Redesign – Part One"
date: 2011-09-14
permalink: "/2011/09/14/announcing-the-redesign-part-one/"
wp_id: 180
categories: ["Web Development"]
post_tags: ["Web Design", "WordPress"]
description: "Edit: So, since this went up I got a full-time job… My plans are now to clean up the blog design and focus on side project that will benefit the community. At some point I may return to the long-sideways scroll page… But for now it won’t be my focus. I’ve been working on a […]"
layout: post
---

**Edit:** So, since this went up I got a full-time job… My plans are now to clean up the blog design and focus on side project that will benefit the community. At some point I may return to the long-sideways scroll page… But for now it won’t be my focus.

I’ve been working on a new look for this site for a while… It’s not done yet, but I’ve gotten enough of the pieces in place to launch this iteration. As my wise friend Zach advised: “Commit early, commit often.”

You can play with the [final concept](/home/), which is still under development, if you’re curious.

### Technologies/Techniques Used

**[Home](https://web.archive.org/web/20111212050916//meet-jack/)** – (a.k.a. “Meet Jack”) Responsive. Play with the screen-size to check it out. I found that media queries worked well here.

**[About](https://web.archive.org/web/20111212050916//what-you-can-expect/)** – (a.k.a. “What You Can Expect”) I developed a jQuery plugin – “Pretty Titles” – then ported that plugin into a WordPress plugin. There are a few kinks that need to be worked before I release the plugins into the wild. Stay tuned.

How does it work? Essentially it takes the content from an element’s title attribute and presents that content in an absolute positioned element, near the mouse position, that can be custom styled. The script will also keep an eye out for markdown formatted URLs. I am considering incorporating a limited markdown in the final version, the question is really how to avoid loading down the browser.

**[Portfolio](https://web.archive.org/web/20111212050916//portfolio/)** – (a.k.a. “Recent Notable Projects”) I had started building a responsive jQuery slider but once [Smashing Magazine announced FlexSlider](http://www.smashingmagazine.com/2011/08/24/freebie-responsive-jquery-slider-plugin-flexslider/) I didn’t really see the need to create another one. Mine was going to be smaller and with fewer features. But I was only half done… So I implemented FlexSlider with a few minor design and functionality modifications.

I ported the jQuery plugin into WordPress as a plugin. The plugin functionality is accessed via a shortcode and you can choose a category, a tag or children of a page to be used for the content for the slideshow. I also integrated the plugin with [ColorBox](http://colorpowered.com/colorbox/) so that I could display information about the slide easily. In order for this to run smoothly I added an option to the original plugin so that the slideshow would pause when a colorbox overlay was open.

I am as yet undecided whether I will release this as a WordPress plugin.

**[Testimonials](https://web.archive.org/web/20111212050916//testimonials/)** – (a.k.a. “What Others Are Saying”) This is my plugin “[Random Excerpts Fader](https://wordpress.org/extend/plugins/random-excerpts-fader/)“, which I built live at WordCamp Jerusalem. I modified the plugin to work as a shortcode. The updates are live and can be downloaded from the WordPress plugin repository.

[**Blog**](https://web.archive.org/web/20111212050916//blog/) – (a.k.a. “The Conversation”) This was the first stage of the redesign. I stuck to a simple layout and made it fully responsive.

**[Contact](https://web.archive.org/web/20111212050916//contact/)** – Simple form. The QR code was created via [vCard2QR](https://is.gd/vcard2qr), which I created to play with the QR concept.

### What’s Still Missing

As I mentioned above, this is only a partial version of the [final concept](/home/).

I ran into several challenges keeping the page responsive while maintaining the long horizontal flow. Media queries are adequate when the flexible elements do not need to have a fixed vertical size. If the elements can grow the queries are only needed to make sure everything looks good. But if you have fixed elements, as I am implementing here, just [keeping the fonts fitting](/2011/09/13/fontbefitting-resizing-fonts-to-fit-enclosing-element/) inside the parent element is a challenge. It’s a work in progress, but no need to delay the whole project when there is a working minimum viable project.

And of course…. Optimize, optimize optimize.
