---
title: "How We Solve Problems: Recursion"
date: 2015-09-22
permalink: "/2015/09/22/how-we-solve-problems-recursion/"
wp_id: 524
categories: ["Development Theory"]
post_tags: ["recursion"]
description: "From Wikipedia: recursion is the process of repeating items in a “self-similar” way. Self-similar, in mathematics, is an object that is exactly or approximately similar to a part of itself. A Koch curve has an infinitely repeating self-similarity when it is magnified. In practice, when programming, "
featured_image: "/assets/images/flower-b8c303e9.jpeg"
layout: post
---

From Wikipedia: recursion is the process of repeating items in a “self-similar” way.

Self-similar, in mathematics, is an object that is exactly or approximately similar to a part of itself.

<figure class="alignright size-large"><a href="/assets/images/koch-snowflake-3a40ce7f.gif"><img loading="lazy" width="750" height="468" data-attachment-id="526" data-permalink="/koch-snowflake/" data-orig-file="/assets/images/koch-snowflake-3a40ce7f.gif" data-orig-size="800,500" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="Koch-Snowflake" data-image-description="" data-image-caption="" data-large-file="/assets/images/koch-snowflake-3a40ce7f.gif?w=800" src="/assets/images/koch-snowflake-3a40ce7f.gif" alt="" class="wp-image-526" sizes="auto, (max-width: 750px) 100vw, 750px"></a></figure>

*A Koch curve has an infinitely repeating self-similarity when it is magnified.*

In practice, when programming, this is when a method calls itself. This s used in computer science to solve problems that can be broken down to smaller, similar, problems.

A classic implementation of this is with sorting through divide and conquer methods. At each level the program calls itself to solve the next piece.

<figure class="wp-block-embed aligncenter is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper"><a href="https://twitter.com/JackReichert/status/605392760896659456" rel="nofollow">https://twitter.com/JackReichert/status/605392760896659456</a></div></figure>

## How does this work?

Let’s start with the number 3, you could say that that number is a list, one number long, that is ordered.

Then you add another list one number long, \[5\], another ordered list, and you get \[3,5\]. Then you add in the ordered list \[2,4\], you get \[2,3,4,5\]. Easy right?

Let’s say you start with the list \[3,5,4,2\]. That’s not in order, but if we then had an easy way to combine lists so that the result stays in order, we can grow our list and keep it in order, as long as each list you add is an ordered list.

But what if you broke that unordered list down into 4 different ordered lists \[3\],\[5\],\[4\], and \[2\]. Now you can recombine them back, making sure they stay in order.

```
     3,5,4,2
    /       \
  3,5       4,2
 /   \    /    \
3     5   4     2
 \   /     \  /
 3,5        2,4
   \        /
     2,3,4,5
```

This specific sort is called merge-sort, there are other types of recursive sorting, and recursive functions altogether.

That’s how we use recursion in computer science. We know how to maintain an ordered list, as long as each list being added is in order. So we just break down our data into pieces that we can handle, and then handle them in the way we know how.

If a piece isn’t quite manageable, we just break it down some more.

Then we can start at the bottom and recurse back through the list merging them back together.

<figure class="alignright size-large"><a href="/assets/images/merge-sort-example-300px-b7d58481.gif"><img loading="lazy" width="300" height="180" data-attachment-id="527" data-permalink="/merge-sort-example-300px/" data-orig-file="/assets/images/merge-sort-example-300px-b7d58481.gif" data-orig-size="300,180" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="Merge-sort-example-300px" data-image-description="" data-image-caption="" data-large-file="/assets/images/merge-sort-example-300px-b7d58481.gif" src="/assets/images/merge-sort-example-300px-b7d58481.gif" alt="" class="wp-image-527" sizes="auto, (max-width: 300px) 100vw, 300px"></a></figure>

This function is considered recursive because the function calls itself. The function will check to see if it has a list of numbers that is 1 in length, if it doesn’t it splits the list in half and calls itself on each half, then it merges the results. This effectively does what we described above.

## Why we use recursion!

Recursion is a powerful form of iteration. However it really works best when used to solve big problems that are made up of similar smaller problems.

Like the sorting problem above, all we want to see is which number is greater than another. We break it down to the smallest pieces, then put them back together in order.

Factorial is another example. Factorial(5) is 1 \* 2 \*3 \* 4 \*5, which is really 5 \* factorial(4), which is 4 \* factorial(3), etc.

[More on recursion](https://stackoverflow.com/questions/3021/what-is-recursion-and-when-should-i-use-it)

## Is this implementable outside of code?

Well, apparently it’s everywhere in nature.

<figure class="aligncenter size-large"><a href="/assets/images/romanesco-fractal-broccoli-445eed57.jpg"><img loading="lazy" width="750" height="562" data-attachment-id="528" data-permalink="/romanesco-fractal-broccoli/" data-orig-file="/assets/images/romanesco-fractal-broccoli-445eed57.jpg" data-orig-size="1024,768" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="romanesco-fractal-broccoli" data-image-description="" data-image-caption="" data-large-file="/assets/images/romanesco-fractal-broccoli-445eed57.jpg?w=1024" src="/assets/images/romanesco-fractal-broccoli-445eed57.jpg" alt="" class="wp-image-528" sizes="auto, (max-width: 750px) 100vw, 750px"></a></figure>

*Here’s a Close-up of a Romanesco broccoli.*

When I discussed this with the founder of a location-based SEM company here in NYC, we discussed if positive reinforcing cycles, specifically education, are the best implementations of this outside of code.

## Learning as recursion

When learning something, it can be overwhelming. If you break the knowledge into manageable pieces, it can be learned more efficiently and more effectively. The spiral shape that is built out of the self-similar Romanesco broccoli has a striking fractal form because it grows building off itself.

Learning a language, for instance, begins with simple basic words. They grow together to form sentences. Then punctuation and tenses are added which increases the learning difficulty, but each piece on its own remains fairly simple.

I asked one of my mentors, Yaniv Cohen, from my days at WorldMate, what this thoughts on recursion applied to learning were.

“Your assumptions regarding the other person’s understanding will change during the conversation when you lay down your explanation. This process of changing your assumptions and breaking complex ideas into smaller parts is more recursive the more complex your idea is, and the more basic foundations of understanding the other party you are addressing has to understand. As you break it down to smaller parts you have to assume knowledge of what the other person already knew, what he understood from the previous parts you already explained and to what degree.”

Based on the knowledge being taught, it’s necessary to break it down, based on the student’s knowledge, to understandable pieces. Then you build.

## Positive reinforcing cycles.

In Making Habits Breaking Habits, Jeremy Dean talks about The Anatomy of Habit, Everyday Habits, and Habit Change.

“In theory, making habits should be easy. We do it automatically all the time. Think back to all the examples of everyday habits we’ve seen earlier: traveling, eating, socializing, working, and shopping. These habits were established because we found ourselves in the same situations trying to satisfy our various needs and desires, and on returning to the same situation, we made the same choice again, and so on, repetition layered on top of repetition until the habit was built. Sooner or later, the behavior became unconscious and, whether useful or not, over time these habits took hold of sections of our lives.”

Repetition is not recursion necessarily, but recursion *is* a form of repetition. Dean explains how habit making and breaking are intertwined with two things: 1) Anchoring the desired action with positive anchors. 2) Breaking the habits down, at the beginning, to smaller pieces, then building up…

Then time. Once you do it enough you won’t have to think about it anymore.

It’s no surprise that learning and habit building are interconnected. With both we are building pathways in our brain. When creating pathways it takes a certain amount of going over the newly created paths to strengthen them, then building on top of the previous pathways with new information.

Now that you know a little more about recursion, do you use it anywhere? Would you use it anywhere? Do you break down tasks to small, similar tasks then build off each success to complete the whole task?
