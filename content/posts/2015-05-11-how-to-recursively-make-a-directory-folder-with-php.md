---
title: "How to recursively make a directory (folder) with PHP"
date: 2015-05-11
permalink: "/2015/05/11/how-to-recursively-make-a-directory-folder-with-php/"
wp_id: 399
categories: ["Reference"]
post_tags: ["PHP", "recursion"]
description: "When I need to generate or save files in a web application it’s important that I keep all the files in an orderly fashion. Sometimes I think that there’s a fine line between impressionistic and messy. – Lady Gaga Here’s the go-to code I use to generate the directory structure. You can find more solu"
featured_image: "/assets/images/img_2570-554281453-e1669838409209-5ad6c6a5.jpg"
layout: post
---

When I need to generate or save files in a web application it’s important that I keep all the files in an orderly fashion.

> Sometimes I think that there’s a fine line between impressionistic and messy.
> 
> – Lady Gaga

Here’s the go-to code I use to generate the directory structure.

// helper method
function make\_dir( $path, $permissions = 0777 ) {
    return is\_dir( $path ) || mkdir( $path, $permissions, true );
}

// for use inline
if ( ! file\_exists( $path ) ) {
    mkdir( $path, 0777, true );
}

You can find more solution on [this](https://stackoverflow.com/questions/2303372/create-a-folder-if-it-doesnt-already-exist) StackOverflow thread.

### How it works

[is\_dir()](https://php.net/manual/en/function.is-dir.php) is a native PHP function that will say if a relative path is given is a directory or not. If the path doesn’t exist, it will return false.

|| – is the OR operator in PHP. If the path is a directory exists the function will return without moving over to the second part, because we’re saying do this OR that.

[mkdir()](https://php.net/manual/en/function.mkdir.php) is a native PHP function that will create a directory at the path location that is given.

The parameter $path is the path where the directory should be created.

The parameter $permissions is the chmod() settings of directory being created.

The ‘true’ creates the directory recursively. This means that you only need to create the path, and you don’t need to make sure the whole path exists. It will fill in the gaps.

### Why not just use mkdir() by itself?

You *can*, but if you do, and the directory already exists, it will send out an error to the log. Nothing terrible with that, I just like keeping things clean.
