---
title: "How to Write a CSV Directly to PHP://Output I/O Buffer With fputcsv()"
date: 2013-05-24
permalink: "/2013/05/24/how-to-write-a-csv-directly-to-phpoutput-io-buffer-with-fputcsv/"
wp_id: 282
categories: ["Web Development"]
post_tags: ["CSV", "PHP"]
description: "Came across this gem half-way down the function page for fputcsv() on php.net Use an associative array for this so your keys will be the csv headers. Enjoy!"
layout: post
---

Came across this gem half-way down the [function page for fputcsv() on php.net](https://php.net/manual/en/function.fputcsv.php#104980)

// Send headers for file
header( 'Content-Type: text/csv' );
header( 'Content-Disposition: attachment;filename='.$filename);
// open buffer to write file to browser
$fp = fopen('php://output', 'w'); 

// Table Headings row
fputcsv($fp, array\_keys($row));

// Write rows to buffer 
while($row = mysql\_fetch\_assoc($result)) {
    fputcsv($fp, $row);
}

Use an associative array for this so your keys will be the csv headers.

Enjoy!
