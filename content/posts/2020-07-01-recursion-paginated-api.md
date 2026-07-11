---
title: "Recursion and How to Get All the records from a paginated API"
date: 2020-07-01
permalink: "/2020/07/01/recursion-paginated-api/"
wp_id: 963
categories: ["Reference"]
post_tags: ["javascript", "python", "recursion"]
description: "I was recently working with an API that limited the max number of items it let you call at once. This was frustrating, because I needed everything. The solution, thankfully was recursion. Recursion is really fun when you get to use it. I needed to use this solution in both JavaScript and Python, so "
featured_image: "/assets/images/encryption-dfd65f3c.jpeg"
layout: post
---

I was recently working with an API that limited the max number of items it let you call at once. This was frustrating, because I needed everything.

The solution, thankfully was recursion. Recursion is really fun when you get to use it. I needed to use this solution in both JavaScript and Python, so I had the opportunity to build it out in both.

Since this is now a solved problem, I decided to share it for others.

## The Solution

### Python

import time
import requests

url = 'https://example.com/wp-json/wp/v2/posts'

def get\_all(url, page=1, per\_page=10, posts=\[\]):
    res = requests.get(f'{url}?page={page}&per\_page={per\_page}')
    if page < int(res.headers\['x-wp-totalpages'\]):
        posts = posts + list(res.json())
        page += 1
        time.sleep(.300)
        print(f"getting page {page}, latest post id is {res.json()\[0\]\['id'\]}")
        return get\_all(url, page, per\_page, posts)
    else:
        return posts

print(f"all done, found {len(get\_all(url))} posts")

### JavaScript

const axios = require('axios')

const url = \`https://example.com/wp-json/wp/v2/posts\`

const getAll = (url, page = 1, per\_page = 10, posts = \[\]) => {
    axios.get(\`${url}?page=${page}&per\_page=${per\_page}\`).then(response => {
        if (page < parseInt(response.headers\['x-wp-totalpages'\])) {
            posts = posts.concat(response.data)
            page++
            console.log(\`getting page ${page}, latest post id is ${response.data\[0\].id}\`)
            return setTimeout(() => getAll(url, page, per\_page, posts), 300)
        } else {
            console.log(\`all done, found ${posts.length} posts\`)
            console.log()
            return posts;
        }
    }).catch(err => console.log(err));
};

getAll(url);

### How It Works

Recursion is self referencing. Here what happens is it makes the api call. If the server indicates that there is more, it adds the new results to the total results it has so far, and calls itself with all its current results. If it thinks that it has everything it returns the results.

This solution works against a WordPress site. Since WordPress sites are ubiquitous I thought that the quickest and dirtiest way to mock out my solution was against that API.

If you are implementing this yourself, the condition that decides whether it has received all the posts yet may vary per API you use.

With the one I was using originally I was able to see if the response list was empty. When I was writing this; however, WP-JSON returned an error when I went past the “last” page.

While the Python way of doing things is to *try* and *catch*, I wanted a more elegant solution, so I’m leveraging the headers which include the total number of pages. You could also use the total posts, and see if you have them all.

*About the image: 1550 French Encryption Device*
