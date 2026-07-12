---
title: "How to Use AJAX in WordPress Development. The Quick-and-Dirty QuickStart Guide"
date: 2013-03-24
permalink: "/2013/03/24/using-ajax-in-wordpress-development-the-quickstart-guide/"
wp_id: 247
categories: ["Web Development"]
post_tags: ["AJAX", "WordPress"]
description: "Edit: Enjoyed this? Check out my new post on AJAX using JSONP in WordPress. There are some great posts and a fantastic wiki page explaining how to use AJAX in WordPress. But I haven’t found a quick plug-and-play tutorial. So here goes… The problem: A simple form that will give the visitor an input a"
layout: post
---

**Edit:** ***Enjoyed this?** Check out my new post on [AJAX using JSONP in WordPress](https://www.jackreichert.com/2014/11/using-jsonp-in-wordpress-development-the-quick-and-dirty-quickstart-guide/).*

* * *

There are some great posts and a fantastic [wiki page](https://codex.wordpress.org/AJAX_in_Plugins) explaining how to use AJAX in WordPress. But I haven’t found a quick plug-and-play tutorial. So here goes…

The problem: A simple form that will give the visitor an input and when they click “Next” it will send the content of the input to the server who will send all the $\_POST fields back as JSON. Why you’d want this? Who knows. But it’s a simple problem to solve that you can adopt to do anything.

## Here’s the Gist

[inputtitle\_submit.js](https://gist.github.com/jackreichert/5233481#file-inputtitle_submit-js)

(function ($) {
    $(document).ready(function () {
        $('#next').click(function () {
            $.post(
                PT\_Ajax.ajaxurl,
                {
                    // wp ajax action
                    action: 'ajax-inputtitleSubmit',

                    // vars
                    title: $('input\[name=title\]').val(),

                    // send the nonce along with the request
                    nextNonce: PT\_Ajax.nextNonce
                },
                function (response) {
                    console.log(response);
                }
            );
            return false;
        });

    });
})(jQuery);

[inputtitle\_submit\_inc.php](https://gist.github.com/jackreichert/5233481#file-inputtitle_submit_inc-php)

<?php
add\_action( 'wp\_enqueue\_scripts', 'inputtitle\_submit\_scripts' );
add\_action( 'wp\_ajax\_ajax-inputtitleSubmit', 'myajax\_inputtitleSubmit\_func' );
add\_action( 'wp\_ajax\_nopriv\_ajax-inputtitleSubmit', 'myajax\_inputtitleSubmit\_func' );

function inputtitle\_submit\_scripts() {

	wp\_enqueue\_script( 'inputtitle\_submit', get\_template\_directory\_uri() . '/js/inputtitle\_submit.js', array( 'jquery' ) );
	wp\_localize\_script( 'inputtitle\_submit', 'PT\_Ajax', array(
			'ajaxurl'   => admin\_url( 'admin-ajax.php' ),
			'nextNonce' => wp\_create\_nonce( 'myajax-next-nonce' )
		)
	);

}

function myajax\_inputtitleSubmit\_func() {
	// check nonce
	$nonce = $\_POST\['nextNonce'\];
	if ( ! wp\_verify\_nonce( $nonce, 'myajax-next-nonce' ) ) {
		die ( 'Busted!' );
	}

	// generate the response
	$response = json\_encode( $\_POST );

	// response output
	header( "Content-Type: application/json" );
	echo $response;

	// IMPORTANT: don't forget to "exit"
	exit;

}

[page-ajax\_input.php](https://gist.github.com/jackreichert/5233481#file-page-ajax_input-php)

<?php
/\*
Template Name: Input Submition Page
\*/

get\_header(); ?>
	<div class="form-signin">
		<h2>Input Title</h2>

		<div class="control-group">
			<input type="text" required="required" name="title" class="input-block-level" placeholder="Input Title">
			<button class="btn btn-large" id="next">Next</button>
		</div>
	</div>

<?php get\_footer();

This is the plug-and-play version my friends. (Extra points if you recognize what ui framework is here… DON’T JUDGE ME IT’S ONLY FOR WIREFRAMING.)

## How to use the code

-   Add `include_once(‘inputtitle_submit_inc.php’);`\` in functions.php. Make sure inputtitle\_submit\_inc.php in in your template folder.
-   page-ajax\_input.php is a template page, make sure it’s in in your template folder. Just create a page in WordPress using “Input Submition Page”.
-   inputtitle\_submit.js should be in a folder named ‘js’ in your template folder. Otherwise

wp\_enqueue\_script( ‘inputtitle\_submit’, get\_template\_directory\_uri() . ‘/js/inputtitle\_submit.js’, array( ‘jquery’ ));

will fail.

## How it works

### page-ajax\_input.php

This is a simple template file. The important elements here are the input field and the next button. They are hooked in the JS file.

### inputtitle\_submit\_inc.php

The server-side magic.

The first line enqueues the js file and pops some variables in for the AJAX onto the page. They are called in inputtitle\_submit\_scripts().

The next two lines enable the AJAX to work. They create the ajax action “ajax-inputtitleSubmit”. If you only have “wp\_ajax\_ajax-inputtitleSubmit” it will only work for logged in users. If you only have “wp\_ajax\_nopriv\_ajax-inputtitleSubmit” it will only work for logged out users. If you do this, make sure you have serious security in place.

Those two lines tie the action to myajax\_inputtitleSubmit\_func(). This is what happens server side. Inside you’ll find some nonce magic for security. The function checks the nonce, then converts the $\_POST variables to JSON and sends them back to the browser. Don’t forget the exit();

### inputtitle\_submit.js

The Javascript.

First I encapsulate the JQuery so that it won’t conflict with anything. Then when the DOM is ready…

When “Next” is clicked it sends a POST AJAX request to the server. The AJAX URL was defined in wp\_localize\_script in inputtitle\_submit\_inc.php as well as the nonce.

We send the action, the nonce and the inputted “title” as variables to the server. Then in outputs the response (all $\_POST variables as JSON) in the console.

## Summary

I built this for reference sake. If you can suggest any best practices or improvements please comment below.
