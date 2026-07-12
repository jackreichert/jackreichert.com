---
title: "Example #1: Augmenting Ozh’s Twitter Archiver"
date: 2015-11-08
permalink: "/2015/11/08/example-1-augmenting-ozhs-twitter-archiver/"
wp_id: 649
categories: ["Speaking Engagements"]
post_tags: ["Plugins", "twitter", "WordCamp"]
description: "Last week I spoke at WordCamp NYC and demonstrated various ways you can augment your site by replacing or just importing various services you use. The first service on the chopping block was Twitter. “I’m not about to delete my account, but wouldn’t I wouldn’t want to lose the thousands of witticism"
featured_image: "/assets/images/twitterhq-0480d652.jpg"
layout: post
---

Last week I [spoke at WordCamp NYC](https://www.jackreichert.com/2015/11/06/introducing-wordpress-sitehacks/) and demonstrated various ways you can augment your site by replacing or just importing various services you use.

The first service on the chopping block was Twitter.

> “I’m not about to delete my account, but wouldn’t I wouldn’t want to lose the [thousands of witticisms I’ve tweeted over the years](https://twitter.com/jackreichert), if it shut down. Also, can \_you \_search your Twitter history? I can.”
> 
> – Me

Ok, maybe not chopping block…

There are actually [quite a few plugins available in the plugin directory to archive your tweets](https://wordpress.org/plugins/search.php?type=term&q=archive+twitter). I tried about half a dozen for this project. Some worked quite well, like [Keyring](https://wordpress.org/plugins/search.php?type=term&q=archive+twitter), but my favorite was [Ozh’ Tweet Archiver](https://wordpress.org/plugins/ozh-tweet-archiver/).

Ozh’s plugin was my favorite because it was the easiest to set up, was fairly hackable, and stored a nice about of data. But it didn’t have ALL of the features I wanted:

**First,** I wanted to be able to import my ENTIRE Twitter history, not just 3,200 tweets. I’ll get to why there was that limit soon.

**Next,** his plugin imports the tweets as posts. But I wanted to keep them segregated as a separate post type.

**Finally** I wanted to make tag clouds of hashtags and mentions. Ozh’s plugin *does* import hashtags, but not mentions, and he imports hashtags as post\_tags, and I want custom taxonomies for each.

<figure class="wp-block-image size-large"><img loading="lazy" width="1280" height="720" data-attachment-id="653" data-permalink="/wordpress-your-world-your-data-13-3/" data-orig-file="/assets/images/wordpress-your-world-your-data-13-a7415b58.jpg" data-orig-size="1280,720" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="wordpress-your-world-your-data-13" data-image-description="" data-image-caption="" data-large-file="/assets/images/wordpress-your-world-your-data-13-a7415b58.jpg" src="/assets/images/wordpress-your-world-your-data-13-a7415b58.jpg" alt="" class="wp-image-653" sizes="auto, (max-width: 1280px) 100vw, 1280px"></figure>

### Tweet Limits

Twitter has a page in their developer’s center called “[Things Every Developer Should Know](https://dev.twitter.com/overview/general/things-every-developer-should-know)”. On that page it states:

> “Clients may access a theoretical maximum of 3,200 statuses via the `page` and `count`parameters for the [user\_timeline](https://dev.twitter.com/doc/get/statuses/user_timeline) REST API methods.”

So, it’s not his fault that the plugin can’t do more. But I wanted more, and I found a way.

Under **Twitter settings > Your Twitter Data** there’s an option called “[Twitter Archive](https://twitter.com/settings/your_twitter_data)”. 

<figure class="wp-block-image size-large"><img loading="lazy" width="608" height="318" data-attachment-id="651" data-permalink="/screen-shot-2015-11-07-at-5-06-40-pm/" data-orig-file="/assets/images/screen-shot-2015-11-07-at-5.06.40-pm-1a77963a.png" data-orig-size="608,318" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="screen-shot-2015-11-07-at-5.06.40-pm" data-image-description="" data-image-caption="" data-large-file="/assets/images/screen-shot-2015-11-07-at-5.06.40-pm-1a77963a.png" src="/assets/images/screen-shot-2015-11-07-at-5.06.40-pm-1a77963a.png" alt="" class="wp-image-651" sizes="auto, (max-width: 608px) 100vw, 608px"></figure>

 Twitter does a really nice job packaging up your data in a self-contained site. They also include a CSV file with data on ALL of your tweets. Facebook also provides a similar service but they do not provide a CSV file, nor is the HTML at ALL easily parseable. It’s a shame.

So how do I import it?

At first I thought I might just re-write Ozh’s plugin, but I had second thoughts. If I did that, my plugin would be competing with his, and I’d have the responsibility of maintaining it. Moreover, his plugin code is fine, just missing a few features, no need to burn it to the ground.

I thought that it might be an interesting undertaking to try and enhance his plugin without touching the core code, in the same way a plugin alters the core functionality of WordPress without altering WordPress’ core code.

**The game is afoot!**

Before I get into the details of how why, you can follow along in the [github repo](https://github.com/jackreichert/csv-importer-for-ozh-twitter/blob/master/importer-for-ozh.php#L362).

The code in the repo is a bit hacky. I did it quickly, and don’t plan on releasing it officially in the plugin directory. I pushed it, unpolished, so you can take it and run with it. You’ll see some bad practices. Please ignore them. You’ll also see JS in the php file and a separate JS file altogether, this happened because I plopped in my [jsonp code](https://www.jackreichert.com/2015/07/02/how-to-jsonp-ajax-to-ssl-in-wordpress-an-easier-way/) and didn’t incorporate it seamlessly. My augmentation plugin doesn’t check if the original plugin is installed, nor does it check if any methods it relies upon exist.

This is an example of what I tell my developers:

>  “Make it work, then make it work well.”
> 
> – again, Me

I like this approach because often a lot of improvements will be discovered once you figure out an initial path to your goal, and you’re not stressed by making it pretty, yet.

Since I don’t want to rewrite Ozh’s plugin I needed a way to import the CSV data. Unfortunately, that data was not structured like the Tweet object that the Twitter API returns. So if I’d want to use *his* import function, to insert the tweets into my WordPress installation, I’d have to find a way to structure the CSV data like the Twitter API tweet object.

Instead, I decided to leverage the [statuses/lookup.json](https://dev.twitter.com/rest/reference/get/statuses/lookup) call. This call lets you send a tweet ID – in fact up to 100 at a time – and you’ll get back the entire tweet info, formatted. So I built an uploader that strips out the IDs from the CSV, checks to see if they’ve been imported yet. Then it [does a call, 50 at a time, and imports the response](https://github.com/jackreichert/csv-importer-for-ozh-twitter/blob/master/importer-for-ozh.php#L199).

This is basically a method right out of Ozh’s plugin, I only modified which API call it uses.

static function get\_single\_tweet( $id ) {
	global $ozh\_ta;
	if ( ! ozh\_ta\_is\_configured() ) {
		ozh\_ta\_debug( 'Config incomplete, cannot import tweets' );
		return false;
	}
	$api     = 'https://api.twitter.com/1.1/statuses/lookup.json?id=' . $id;
	$headers = array(
		'Authorization' => 'Bearer ' . $ozh\_ta\['access\_token'\],
	);
	ozh\_ta\_debug( "Polling $api" );
	$response = wp\_remote\_get( $api, array(
		'headers' => $headers,
		'timeout' => 10
	) );
	$tweet = json\_decode( wp\_remote\_retrieve\_body( $response ) );
	if ( isset( $tweet->errors ) ) {
		ozh\_ta\_debug( "Error with tweet #$id : " . $tweet->errors\[0\]->message );
		return false;
	}
	return $tweet;
}

**Note:** As different servers have different timeout and max\_post variables you might have to play with the number of tweet IDs it sends. [The repo is currently set to 15](https://github.com/jackreichert/csv-importer-for-ozh-twitter/blob/master/importer-for-ozh.php#L362), but you can go as high as 100.

check = function () {
	if (twitter\_ids.length >= 1) {
		// was timing out at the 100 max you can play with this, will differ per server
		var batch = twitter\_ids.splice(0, 15);
		wp\_jsonp("import\_tweets", "import\_tweets", {variable: batch}, import\_tweets);
		// 150 calls per 15 minues. 900sec/150 + a bit for safety.
		setTimeout(check, timeout);
	} else {
		if (error\_ids.length > 0) {
			$('#csv\_file\_upload').prepend("<p>" + error\_ids.length + " tweets not imported. You may have hit a limit, you can try again in 15 minutes to get the rest.</p>");
		}
		$('#csv\_file\_upload').prepend("<p>Done.</p>");
	}
}

The other variable to play with here is the timeout, it’s defined outside of the scope of the embedded code above. Twitter allows 150 calls per 15 minutes. I set it to 900sec/150 + a bit for safety. But since I don’t do calls on tweets that already have been imported I wait less for those AJAX calls. However, due to a lag resulting from the AJAX call I need to add a bit more to the calls that *do* make an API call. If your import gets an error “ – couldn’t get tweets – ” you might have to stop the process, wait 15 minutes and try again.

### Import tweets as posts

Ozh did it right on this one. [He made a filter before he inserts the tweet post](https://github.com/wp-plugins/ozh-tweet-archiver/blob/master/inc/import.php#L299).

// Plugins: hack here
	$post = apply\_filters( 'ozh\_ta\_insert\_tweets\_post', $post ); 
	
	$post\_id = wp\_insert\_post( $post );

**Take note plugin developers.**

To be honest, it’s not necessary, you can always [hook save\_post](https://codex.wordpress.org/Plugin_API/Action_Reference/save_post). But he made it easy for me to leverage. I created a method to [hook into ozh\_ta\_insert\_tweets\_post](https://github.com/jackreichert/csv-importer-for-ozh-twitter/blob/master/importer-for-ozh.php#L19) and return post\_type = ‘tweet’.

function import\_as\_tweet( $post ) {
	$post\['post\_type'\] = 'tweet';
	return $post;
}

Of course I needed to [create the post\_type ‘tweet’ first](https://github.com/jackreichert/csv-importer-for-ozh-twitter/blob/master/importer-for-ozh.php#L41).

### Hashtags and Mentions as Taxonomies

This was a little trickier. Ozh did not put in filters when he imported hashtags as post\_tags… but WordPress did. Since his plugin first inserts the tweet, *then* the tags, I [hooked set\_object\_terms](https://codex.wordpress.org/Function_Reference/wp_set_object_terms). First I check to see if the post\_type is ‘tweet,’ if it is [I convert the post\_tags to hashtags](https://github.com/jackreichert/csv-importer-for-ozh-twitter/blob/master/importer-for-ozh.php#L263).

function post\_insert\_term( $object\_id, $terms, $tt\_ids, $taxonomy ) {
	global $ozh\_ta;
	if ( 'tweet' == get\_post\_type( $object\_id ) && 'post\_tag' == $taxonomy && 'yes' == $ozh\_ta\['add\_hash\_as\_tags'\] ) {
		$in = '(';
		foreach ( $tt\_ids as $tid ) {
			$in .= $tid . ',';
		}
		$in = rtrim( $in, ',' ) . ')';
		global $wpdb;
		$sql = "UPDATE \`$wpdb->term\_taxonomy\` SET taxonomy='hashtag' WHERE term\_id IN $in";
		$wpdb->query( $sql );
	}
}

Oh, and don’t forget to first [make the taxonomies you want](https://github.com/jackreichert/csv-importer-for-ozh-twitter/blob/master/importer-for-ozh.php#L70)…

\*\*Finally we’re up to mentions. \*\*

This was a little more complicated, since Ozh didn’t add them himself. I had two options.

1.  Twitter’s API returns mentions in the tweet object. But Ozh doesn’t have any hooks in his plugin around the tweet object. So I couldn’t do anything with that. I could do the call again, but that’s a waste of API calls, and given that there’s a quota I didn’t want to do that.
2.  Parse the tweet that had been inserted for mentions. This was actually easy. Ozh’s plugin has an option to link mentions, so I added that as a condition, if the mentions are linked, I’ll import them as a taxonomy. [I hooked save\_post to accomplish this, and leveraged PHP’s DOMDocument](https://github.com/jackreichert/csv-importer-for-ozh-twitter/blob/master/importer-for-ozh.php#L281).

function post\_insert\_tweet( $post\_id ) {
	global $ozh\_ta;
	if ( $ozh\_ta\['link\_usernames'\] == 'yes' ) {
		$tweet         = get\_post( $post\_id );
		$dom           = new DOMDocument;
		$dom->encoding = 'utf-8';
		if ( '' != $tweet->post\_content ) {
			$dom->loadHTML( utf8\_decode( $tweet->post\_content ) );
			$mentions = array();
			foreach ( $dom->getElementsByTagName( 'span' ) as $node ) {
				if ( false !== strpos( $node->getAttribute( "class" ), 'username' ) && 0 === strpos( $node->nodeValue, '@' ) ) {
					$mentions\[\] = substr( $node->nodeValue, 1 );
				}
			}
			wp\_set\_post\_terms( $post\_id, $mentions, 'mention', true );
		}
	}
}

**Done, done and done.**

I know this post was a bit rambling, I wanted to give you a window into my thought process since you don’t see many people hooking existing plugins. I find more re-building of plugins, of which I am guilty as well. But I wanted to show here how that is not necessary.

The benefits of augmentation over replacement is that if the original plugin is updated, if you augmented it right, you can benefit from the original developer’s work and not lose your own.

[Here’s the awesome result](http://jackreichert.net/tweet/) of this project. I’ll add public tag clouds for mentions and hashtags at some point, unfortunately the default taxonomy cloud didn’t look good on the site.
