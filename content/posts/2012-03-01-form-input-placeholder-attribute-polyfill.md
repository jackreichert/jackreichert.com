---
title: "Form Input “Placeholder” Attribute Polyfill"
date: 2012-03-01
permalink: "/2012/03/01/form-input-placeholder-attribute-polyfill/"
wp_id: 192
categories: ["Web Development"]
post_tags: ["javascript", "polyfill"]
description: "This is a jQuery-dependent polyfill for the placeholder input attribute. If you’re relying on “placeholder” pop this code in your page and you don’t have to let IE users hanging in the breeze."
layout: post
---

This is a jQuery-dependent polyfill for the placeholder input attribute. If you’re relying on “placeholder” pop this code in your page and you don’t have to let IE users hanging in the breeze.

function activatePlaceholders() {
    var detect = navigator.userAgent.toLowerCase(); 
    if (detect.search("msie") > 0 ) {
        $('input\[type=text\],input\[type=email\]').each(function(ind,elem) {
            if ($(elem).attr('placeholder') != ""){
                $(elem).val($(elem).attr("placeholder"));
                $(elem).click(function() {
                    if ($(this).val() == $(this).attr("placeholder")) {
                        $(this).val("");
                    }
                });
                $(elem).blur(function() {
                    if ($(this).val() == "") {
                        $(this).val($(this).attr("placeholder"));
                    }
                });
            }
        });
    }
}
