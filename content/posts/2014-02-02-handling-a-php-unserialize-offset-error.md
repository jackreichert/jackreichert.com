---
title: "Handling a PHP unserialize offset error… and why it happens"
date: 2014-02-02
permalink: "/2014/02/02/handling-a-php-unserialize-offset-error/"
wp_id: 327
categories: ["Web Development"]
post_tags: ["PHP", "unserialize"]
description: "I discovered recently the importance of proper collation of database tables. I inherited a proprietary CMS to manage. The default collation was latin1_swedish_ci. Apparently it’s because “The bloke who wrote it was co-head of a Swedish company”. The problem occurred when a form we had on our site be"
layout: post
---

I discovered recently the importance of proper collation of database tables. I inherited a proprietary CMS to manage. The default collation was latin1\_swedish\_ci. Apparently it’s because “[The bloke who wrote it was co-head of a Swedish company](https://stackoverflow.com/a/6771974/510734)”. The problem occurred when a form we had on our site began getting submissions with foreign characters. The database collation couldn’t accept the characters and was saving them as question marks (?).

“[Serialization](https://en.wikipedia.org/wiki/Serialization) is the process of translating data structures or object state into a format that can be stored.” For example the array:

$returnValue = serialize(array(‘hello’, ‘world’));

Will become:

a:2:{i:0;s:5:“hello”;i:1;s:5:“world”;}

This is what the above string means:

-   There is an array that is 2 in length. a:2.
-   The first item in the array has a key that is an integer with the value of 0. i:0.
-   The value for that item is a string that is 5 characters long, which is “hello”. s:5.
-   The second item in the array has a key that is an integer with the value of 1. i:1.
-   The value for that item is a string that is 5 characters long, which is “world”. s:5.

An unserialize offset error can occur when the string count in the serialized data does not match the length of the string being saved. so in the above example that would look like this:

a:2:{i:0;s:4:“hello”;i:1;s:5:“world”;}

Notice the number ‘4’, while there are really 5 characters in the world ‘hello’.

So the question is, why would the offset happen when a ? replaces a foreign character?

To understand why, you need to dig into how UTF-8 works and things will become clear.

The UTF-8 value of ‘?’ is ‘3f’, while the value for ‘Æ’ is ‘c3 86’. `’?’` translates into `s:1:“?”;` while `‘Æ’` translates into `s:2:“Æ”;`. Notice the 2 replacing the 1 in the string length. So basically, what’s happening is that when php serializes the data it is storing the foreign character as a double the length but when it’s passed to MySQL, when the table isn’t formatted for UTF-8, the database converts the character to a ?, which is then stored as a single character. \*\*But the serialization length is not updated, \*\*so when you go and unserialize the data there is an offset error.

### How to resolve the problem

There are several articles that provide solutions. The most popular is to [use the base64\_encode() function](https://davidwalsh.name/php-serialize-unserialize-issues) around the serialized data. This will prevent the data from getting corrupted since base64 converts the data to ASCII which any collation can take.

//to safely serialize
$safe\_string\_to\_store = base64\_encode(serialize($multidimensional\_array));

If you don’t have access to your database, or don’t want to fool with it, this is a great solution. You can also set your table collation to [utf8\_general\_ci or utf8\_general\_ci](https://stackoverflow.com/a/2344130/510734) and that should solve your problem as well (that’s what we did).

But what if you already have bad data in your database, like we had, and you’re getting the horrid ’Notice: unserialize() \[function.unserialize\]: Error at Offset’ error. When you get this notice, chances are you’re not getting all your data either…

Here’s what you do:

$fixed\_serialized\_data = preg\_replace\_callback ( ‘!s:(\\d+):“(.\*?)“;!‘,
    function($match) {
        return ($match\[1\] == strlen($match\[2\])) ? $match\[0\] : ’s:’ . strlen($match\[2\]) . ‘:“’ . $match\[2\] . ‘“;’;
    },
$error\_serialized\_data );

This will search out the strings, recount the length, and replace the string length with the correct value. Unfortunately it cannot recover what the original foreign character was, but at least the rest of your data will load.

I got the original code from [StackOverflow](https://stackoverflow.com/a/10152996/510734), but since PHP 5.5 the /e modifier in preg\_replace() has been deprecated completely and the original preg\_match statement suggested will error out. So I rewrote it with preg\_replace\_callback().
