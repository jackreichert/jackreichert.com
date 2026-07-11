---
title: "How to use JSONP in WordPress Development. The Quick-and-Dirty QuickStart Guide"
date: 2014-11-04
permalink: "/2014/11/04/how-to-use-jsonp-in-wordpress-development-the-quick-and-dirty-quickstart-guide/"
wp_id: 367
categories: ["Web Development"]
post_tags: ["AJAX", "javascript", "jsonp", "PHP", "WordPress"]
description: "Edit: Looking for an easier way to do JSONP in WordPress? What IS JSONP and why should I care? There’s been a lot of debate lately about whether to move your site to SLL (https) or not. It’s clear, though, that all your forms, at least the ones that handle sensitive data like logins, should […]"
layout: post
---

**Edit:** [Looking for an easier way to do JSONP in WordPress?](/2015/07/02/how-to-jsonp-ajax-to-ssl-in-wordpress-an-easier-way/)

* * *

## What IS JSONP and why should I care?

There’s been a lot of debate lately about whether to move your site to SLL (https) or not. It’s clear, though, that all your forms, at least the ones that handle sensitive data like logins, should go over a secure connection.

If your whole site is SSL then you won’t have any issues with making [AJAX calls](/2013/03/24/using-ajax-in-wordpress-development-the-quickstart-guide/); however, if you DO go hybrid then Javascript will consider all the pages that are SSL as a separate domain and will block AJAX calls to them.

**Use case:** You want to secure your admin area and you add `define(‘FORCE\_SSL\_ADMIN’, true)` to your `wp-config.php` file. [You’ll remember](/2013/03/24/using-ajax-in-wordpress-development-the-quickstart-guide/) that to make AJAX calls in WordPress you need to call: `/wp-admin/admin-ajax.php.` But that will now be an SSL connection and violates Javascript’s “**[same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy)”.**

This is where JSONP comes into the picture. As you probably know, you \_CAN \_include scripts from other sites using a script tag, that ability is the foundation of CDNs. JSONP takes advantage of that functionality.

Basically, instead of including a static script on your site hosted on a CDN, you’re sending a GET request to the domain of choice, and asking it to send back a callback method including within it a JSON object with the data you want. In essence, you’re spoofing your browser to think that it’s not actually doing a cross-domain ajax call, but in practice, you are.

There’s a great [discussion on StackOverflow](https://stackoverflow.com/a/2067584/510734) about JSONP for further exploration.

## **How do I do it?**

Below you’ll find two files, upload them to a folder in your WordPress plugins directory and activate. **Note:** you should probably run this on a test site. It won’t do anything bad to your site, but it’s never a good idea to play around on your production site.

To test it add the following to any page:

(function($) {
	$(document).ready(function(e){
		e.preventDefault();
		$('input\[name=titleSubmit\]').click(function(){
			$.ajax({
				type: "GET",
				url: SSL\_Ajax.ajaxurl,
				cache: false,
				dataType: "jsonp",				
				crossDomain: true,
				data: {
					action : 'ajaxSSL',
					ajaxSSLNonce : SSL\_Ajax.ajaxSSLNonce,
					input : $('input\[name=title\]').val()
				},
				
				success: function( data ) {
					console.log( 'success' );
					console.log( data );
				},
				
				complete: function( data ) {
					console.log( 'complete' );
					console.log( data );
				},
				
				error: function( data ) {
					console.log( 'error' );
					console.log( data );
				}
			});
		});
	});
})(jQuery);	  

The javascript looks for an input button, on ANY page of your site, with the name “titleSubmit” and does the JSONP call with the content of an input text field on that page with the name of “title”.

The most important pieces in the example that you’ll need to get your code running are:

<?php
/\*\*
\* Plugin Name: Ajax SSL Example
\* Plugin URI: /
\* Description: A simple plugin example that implements jsonp in WordPress.
\* Version: 0.1
\* Author: Jack Reichert
\* Author URI: http://www.jackreichert.com
\* License: GPL2
\*/

add\_action( 'wp\_enqueue\_scripts', 'ajaxSSL\_scripts' );
add\_action( 'wp\_ajax\_ajaxSSL', 'ajaxSSL\_func' );
add\_action( 'wp\_ajax\_nopriv\_ajaxSSL', 'ajaxSSL\_func' );

function ajaxSSL\_scripts() {
	wp\_enqueue\_script( 'ajaxSSL\_script', plugins\_url( 'ajax-ssl.js', \_\_FILE\_\_ ), array( 'jquery' ));
	wp\_localize\_script( 'ajaxSSL\_script', 'SSL\_Ajax', array(
        'ajaxurl'		=> admin\_url( 'admin-ajax.php' ),
        'ajaxSSLNonce'	=> wp\_create\_nonce( 'ajaxSSL-nonce' ))
    );
}

function ajaxSSL\_func() {
	
	$nonce = $\_GET\['ajaxSSLNonce'\]; 	
	if ( ! wp\_verify\_nonce( $nonce, 'ajaxSSL-nonce' ) ) {
		die ( 'Busted!');
	}
		
	// generate the response
	$response = json\_encode( $\_GET );
	
	// response output
	header("content-type: text/javascript; charset=utf-8");
	header("access-control-allow-origin: \*");
	echo htmlspecialchars($\_GET\['callback'\]) . '(' . $response . ')';
 
	// IMPORTANT: don't forget to "exit"
	exit;
}

### In the js file:

Clearly without any of the code it won’t work properly; however, the above settings are not typical of most of your standard AJAX calls.

**type: GET:** By it’s very nature a JSONP call cannot be POST. You’re essentially embedding a script tag on your page with GET variables in the URL of the script.

**cache: false:** Removing this will not break your code, but for testing it’s best if you your browser doesn’t cache the responses.

**dataType: “jsonp”:** You’re telling jQuery that it’s a JSONP call. Duh.

**crossDomain: true:** Perhaps with the dataType set to JSONP you’d think the that this would be enabled, that’s the whole point, but you still need to set this.

### In the PHP file:

**content-type: text/javascript:** You’re setting the response type being sent, application/javascript will work as well.

**access-control-allow-origin: \*:** This is another security check, you need to enable any origin for JSONP to work.

**$\_GET\[‘callback’\]:** Without the callback wrapping your JSON response jQuery will not recognize this as a valid response. It is set in place as a security measure similar to NONCEs.

## Conclusion

Once you have the right recipe, JSONP with WordPress is not all that difficult. Use it well.
