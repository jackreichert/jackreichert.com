---
title: "How to use JSONP (AJAX to SSL) in WordPress, an EASIER way"
date: 2015-07-02
permalink: "/2015/07/02/how-to-use-jsonp-ajax-to-ssl-in-wordpress-an-easier-way/"
wp_id: 483
categories: ["Web Development"]
post_tags: ["AJAX", "javascript", "jsonp", "Plugins", "WordPress"]
description: "I’ve already written about How to use JSONP in WordPress Development. I explain how it works, and why you would use it there. At work we work with several domains and I’ve had to use quite a bit of JSONP, I’ve rethought how to use it, and made this micro-framework to make it a LOT […]"
featured_image: "/assets/images/branch-27d354ad.jpeg"
layout: post
---

I’ve already written about [How to use JSONP in WordPress Development](/2014/11/using-jsonp-in-wordpress-development-the-quick-and-dirty-quickstart-guide/). I explain how it works, and why you would use it there.

At work we work with several domains and I’ve had to use quite a bit of JSONP, I’ve rethought how to use it, and made this micro-framework to make it a LOT easier. Mostly, I wrote this to solve the problem that I’m using a lot of AJAX, and don’t want the overhead of the .ajax call each time.

There are a lot of values you need to set when making a JSONP call in general, and specifically with WordPress, this greases those wheels.

The paradigm is all you do is execute:

`wp_jsonp("wp_jsonp", "getStuff", {variable: "hello world"}, getStuff);`

and the rest is taken care of on the JS side. I wrote it to be agnostic of the server-side processing as well, this gives you the benefit of a pseudo factory design pattern with your switch statement.

You can download the [whole repo](https://github.com/jackreichert/wp-jsonp.git) to peruse or play with if you like, I made some gists for easy embedding.

This is the guts of the operation, I created this javascript object that handles everything, you past the ajax event, method, parameters and a callback function. The plugin takes care of the nitty gritty details that are a pain to remember for getting jsonp to work.

It’s well commented, so read through and feel free to ask questions in the comments if you have any.

if (typeof wp\_jsonp === 'undefined')
    var wp\_jsonp = function (event, method, params, callbackFunc) {
        // data needed to send jsonp
        var data = {
            action: event,	// wp ajax action
            ajaxSSLNonce: wp\_jsonp\_vars.wpAJAXNonce, // nonce
            method: method, // server has switch/case for processing
            params: params // data to be processed
        };

        jQuery.ajax({
            type: "GET", // this is the essence of jsonp
            url: wp\_jsonp\_vars.ajaxurl, // wp ajax url
            cache: false, // to ensure proper data response
            dataType: "jsonp", // jsonp
            crossDomain: true, // enable ssl/nonssl
            data: data, // data to be sent

            success: function (response) {
                //console.log('success', response);
                // your callback function
                callbackFunc(response);
            },

            complete: function (response) {
                //console.log('complete', response);
            },

            error: function (response) {
                console.log('error', response);
            }
        });
    };

<?php

/\*\*
 \* Plugin Name: WordPress JSONp Helper
 \* Plugin URI: /2015/07/02/how-to-jsonp-ajax-to-ssl-in-wordpress-an-easier-way/
 \* Description: A paradigm for easy AJAX over SSL in WordPress using JSONP.
 \* Version: 0.1
 \* Author: jackreichert
 \* Author URI: http://www.jackreichert.com/
 \* License: GPL3
 \*/
class WP\_AJAX\_JSONp {
	// actions on instatiation
	function \_\_construct() {
		add\_action( 'wp\_enqueue\_scripts', array( $this, 'wp\_jsonp\_scripts' ) );
	}

	// enqueue scripts
	function wp\_jsonp\_scripts() {
		wp\_enqueue\_script( 'wp\_jsonp\_script', plugins\_url( '/jsonp.js', \_\_FILE\_\_ ), array( 'jquery' ) );
		wp\_localize\_script( 'wp\_jsonp\_script', 'wp\_jsonp\_vars', array(
			'ajaxurl'     => admin\_url( 'admin-ajax.php' ),
			'wpAJAXNonce' => wp\_create\_nonce( 'wpAJAX-nonce' )
		) );
	}
}

$WP\_AJAX\_JSONp = new WP\_AJAX\_JSONp();

Here’s the example, you might say, wait a minute, don’t you get a callback from jQuery already? Sure, good luck using it. It’s a little funny ignoring that, but hey, this works nicely.

<?php

/\*\*
 \* Plugin Name: another plugin
 \* Plugin URI: /2015/07/02/how-to-jsonp-ajax-to-ssl-in-wordpress-an-easier-way/
 \* Description: An example of how you might use wp\_jsonp.
 \* Version: 0.1
 \* Author: jackreichert
 \* Author URI: http://www.jackreichert.com/
 \* License: GPL3
 \*/
class Another\_Plugin {
	// actions on instatiation
	function \_\_construct() {
		include\_once( ABSPATH . 'wp-admin/includes/plugin.php' );
		if ( is\_plugin\_active( 'jsonp/jsonp.php' ) ) { // plugin is active? Great we can use it!
			add\_action( 'wp\_enqueue\_scripts', array( $this, 'plugin\_scripts' ) );
			add\_action( 'wp\_ajax\_wp\_jsonp', array( $this, 'wp\_jsonp\_func' ) );
			add\_action( 'wp\_ajax\_nopriv\_wp\_jsonp', array( $this, 'wp\_jsonp\_func' ) );
		}
	}

	// enqueue scripts
	function plugin\_scripts() {
		wp\_enqueue\_script( 'wp\_jsonp\_call', plugins\_url( '/scripts.js', \_\_FILE\_\_ ), array( 'wp\_jsonp\_script' ) );
	}

	// process the ajax calls
	function wp\_jsonp\_func() {
		if ( ! wp\_verify\_nonce( $\_GET\['ajaxSSLNonce'\], 'wpAJAX-nonce' ) ) {
			die ( 'Busted!' );
		}

		$response = array();
		$method   = $\_GET\['method'\];

		/\*\*
		 \* Send what should be processed here.
		 \* Note: since you are sending the method via ajax, you MUST validate your data.
		 \* If you don't you probably should check your SQL queries because you probably don't sanitize those either.
		 \*/
		switch ( $method ) {
			case 'getStuff':
				// if you get "hello world back, then it worked"
				$response = "Hello World";
				break;
			default:
				$response = "You didn't send any methods to process your variables?!";
				break;
		}

		// response output
		header( "content-type: text/javascript; charset=utf-8" ); // We're sending back a javascript function, remember?
		header( "access-control-allow-origin: \*" ); // This is needed for JSONP.
		echo htmlspecialchars( $\_GET\['callback'\] ) . '(' . json\_encode( $response ) . ')'; // jQuery set up the callback for us.

		// IMPORTANT: don't forget to "exit"
		exit;
	}
}

$Another\_Plugin = new Another\_Plugin();

jQuery(document).ready(function ($) {
    // client side response processing of getStuff response
    var getStuff = function (response) {
        console.log(response);
    }

    jQuery(document).ready(function (e) {
        // make the jsonp call: ajax\_action, method, variables, callback
        wp\_jsonp("wp\_jsonp", "getStuff", {variable: "hello world"}, getStuff);
    });
});

Maybe I’m overthinking / over-complicating things, I don’t know, once it’s set up you can move really quickly, isn’t that the point of a framework?

Just one important note: make sure to validate the hell out of things because you’re giving that JS function a LOT of power.

I’d love to hear your thoughts, if you have suggestions for improving it, by all means, please comment below!
