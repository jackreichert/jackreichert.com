---
title: "How to see if a class was added to an element using JavaScript"
date: 2017-03-14
permalink: "/2017/03/14/how-to-see-if-a-class-was-added-to-an-element-using-javascript/"
wp_id: 841
categories: ["Reference"]
post_tags: ["javascript", "jQuery", "setinterval", "WordPress"]
description: "If you need to see if a class has been added to an element the easiest way is to trigger a new event when you add the class. The problem with this solution is what happens if you do not have control over the function where this happens. Like if it happens in the WordPress […]"
featured_image: "/assets/images/sodalab-b2244ceb.jpg"
layout: post
---

If you need to see if a class has been added to an element the easiest way is to [trigger a new event when you add the class](https://stackoverflow.com/a/1950052/510734).

$(this).addClass(‘someClass’);
$(mySelector).trigger(‘cssClassChanged’);

The problem with this solution is what happens if you do not have control over the function where this happens. Like if it happens in the WordPress core, and you know that you should never ever change code in the core.

I needed this for a plugin I was buidling. I know that when I click on something an ajax call is fired, and I want to do something when the response comes back. The ajax call is encapsulated so I can’t hook into it, but when the response comes back it adds a class to an element.

This is what I did:

checkForAddedClass = function (observedElement, className, callback) {
    var count = 0;
    const observer = setInterval(function () {
        count++;
        if (500 < count || $(observedElement).hasClass(className)) {
            clearInterval(observer);
            callback();
        }
    }, 10);
};

When I click on that something, I call this function. It sets an interval that watches the observedElement selector to see if the className was added. If it gets added, or 5 seconds goes by, it runs the callback.

This is how it would be implemented: `checkForAddedClass('.attachment-details', 'save-ready', getUpdatedSettings);`

Hope this helps if you’re dealing with a similar issue.
