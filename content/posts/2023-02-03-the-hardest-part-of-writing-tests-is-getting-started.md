---
title: "The Hardest Part of Writing Tests is Getting Started"
date: 2023-02-03
permalink: "/2023/02/03/the-hardest-part-of-writing-tests-is-getting-started/"
wp_id: 1543
categories: ["Development Theory"]
post_tags: ["Software Engineering", "testing", "tests"]
description: "Originally posted on Shopify Engineering Dear Past Self, I know you’ve heard of TDD (Test Driven Development) and are excited to start writing tests. You’ve seen it in action, and it’s the hot new dev practice that everyone’s talking about. But you haven’t really written tests at all yet at this poi"
featured_image: "/assets/images/bfaf38eb-c56c-4532-8594-7cea4d6dbfe1-704358ec.webp"
layout: post
---

*Originally posted on [Shopify Engineering](https://shopify.engineering/the-hardest-part-of-writing-tests-is-getting-started)*

Dear Past Self,

I know you’ve heard of TDD (Test Driven Development) and are excited to start writing tests. You’ve seen it in action, and it’s the hot new dev practice that everyone’s talking about. But you haven’t really written tests at all yet at this point in your career. I know you’re a little intimidated, and you don’t know where to start.

I hope this letter finds you well. Jack here, your future self, writing to get you on track.

First things first. I know you have your reservations about crypto, but do yourself a favor and get some Bitcoin *now*, and sell it before November 2021. Also, stock up on n95 masks and toilet paper before February 2020.

Moving on. You should know that what you’re feeling is 100% legitimate. The hardest part of writing tests is getting started—setting things up. I’ll dig deeper into that, but first, why write tests at all?

# Why Write Tests?

First, let’s discuss the *why*. Writing tests being *cool* right now isn’t the right reason to go all-in, and you know that. But in this case your intuition is right, this is one of the good practices to implement.

Tests can be better than documentation. They show *actual* use cases, so developers looking to use the code can hop in and see examples of how to use the code you’re writing. Tests also explicitly document edge cases. What’s the code expected to do? And what’s the code expected *not* to do?

Tests also ensure that *as* you develop your code, it’s not changing the behavior of the code in ways you don’t want. You do this naturally already. As you write a function you run your code and check to see if it’s doing what you want it to do. Why not just implement that check, that *test*, and save it so others, and future you (aka me), can run it automatically, will know what your intention was, and what the code needs to continue doing?

Also, you’ve definitely jumped into a legacy code base to fix something, or add a necessary feature, knowing full well that you’re likely to introduce some other bug by doing so. Wouldn’t it be great if you knew what you were breaking before rolling out the changes?

Tests ensure that as you’re changing your code, adding features and fixing bugs, you don’t introduce more bugs. Tests are a contract with future maintainers of the code that the feature you’re trying to introduce, or fix, will not be reverted or changed unintentionally.

Now imagine if ALL your code was covered with tests. Imagine if everyone on the team was writing tests. That means that at any time, all the code getting merged into your main branch is doing explicitly, and exactly, what it’s intended to do. *And* you’re verifying that continuously with your successful test suite running.

# The Hardest Part

Now we get to why I’m writing to you. I said this before, and now we’ll dig in. The hardest part of writing tests is getting started—setting things up.

Sure, writing a few isolated tests can be fairly easy. But full test suites have a lot of complicated helper tools, stubs, and fixtures. They’re not easy to understand as a beginner, let alone set up for yourself.

If you were at a bigger company right now, I’d tell you that one of the responsibilities of the top people on your team is to set all these tools up. Senior developers of a codebase have a better understanding of how the code needs to work. That means that they also should understand best how to most effectively test the code they maintain.

A good manager will understand that it’s a good investment for a company to do this. If their goal is to sell a reliable product. Investing in tests with their best developers really is a good way to ensure this.

But you *are* the top person on your team now. So it’s up to you. That’s why I’m writing this letter. First of all, know that it’s hard, and it’s ok to be a little overwhelmed by the task. But also know that it’s worth it, and whatever you set up is better than nothing. So here’s how to get started.

# 4 Things You Can Do To Get Started

Start with something you can do easily.

## 1\. Write Your First Test

Install the test suite and write a first test. The test can be \`true == true\`, and make sure you can run that test. Then change it to \`true == false\`, and see that it fails. Checking both pass and fail states is important, it ensures that your test suite is working. Always check that your test *can* fail. Sometimes tests pass for strange reasons.

You took the first step, you have a framework now in which you can run tests.

## 2\. Set up Tests for Your Isolated Functions First

Next, pick a function that’s isolated—it doesn’t have dependencies, that is, it doesn’t rely on any other functions. Test that function first. As I mentioned before, the hardest part is the tooling around your tests. Isolated tests don’t need special tooling to test. If you can test all the independent functions you’ll be a million times better off than without any tests.

## 3\. Set up Tests for Stubs

Now that you’re getting the hang of tests it’s time to move on to stubs.

When you write a test you’re isolating and controlling elements of the environment that the code is running in to ensure that the code produces the results you want under the circumstances you define. Stubs help you do this.

A stub hijacks a function call and returns a canned answer. Most test suites come with stubbing tools, so look into that documentation to see exactly how to use stubs in the library you’ve chosen. Stubs are great for many things. Sometimes a function calls a library that you don’t care about, or don’t need to test, like a logger. You can use your stub to tell the logger to do nothing. That way you don’t have to worry about junk piling up on your test server.

When writing your tests, how do you avoid testing other people’s code, like external libraries? Stubs.

How do you test inputs that can change, like responses from external APIs? Stubs.

You’re trying to test *your* code, not other people’s code. Integration testing is for making sure other people’s services haven’t changed and still integrates with yours. You can look into that another time.

Before you wrote a test for an isolated function, stubs help you isolate functions so you can test them individually.

This is how you use stubs:

1.  Make a few API calls and save the responses. Ensure that there isn’t any sensitive data in the response. I’ll repeat that. Ensure that there isn’t any sensitive data in the response. You *don’t*want to expose private data.
2.  Create a test for each response you saved, and stub out your API client to respond with one of those responses. Those canned responses are called fixtures, and you’ll have a directory of them. Load the JSON and use that as a subbed response.
3.  Now you know what to expect each time you run your tests. You can ensure that your code is acting the way it should, and build out tests to make sure the code does with this data what you expect it to do.

## 4\. Set up End to End (E2E) Tests

Code coverage is important to think about. As you write more tests you’ll want to see what you are testing, and what you aren’t testing yet. One thing you’ll discover is that *you don’t have to write a test for each and every function explicitly* to test all of the paths the code will run through.

This one time I was building out an ETL (Extract, Transform, and Load) system. It needed to get data from different endpoints, format the data, and then load the data into a database—Extract, Transform, and Load.

I knew there was a lot of discovery work to do, but wanted to make sure I had tests in place as I went along, so that when we were preparing the system for production we wouldn’t have to backfill too many tests. Also, tests are best written when the code is fresh in your mind; you know the edge cases and use cases best while you’re writing your code.

I decided that stubbing out the API would be the best way to begin. I prepared several API responses and stubbed out the API client. This meant that I wasn’t wasting our allocated budget for calls to this service, as it was expensive to use, and limited. It also meant that I was saving time not making API calls and waiting for them to respond. Additionally, I knew what to expect back when writing the transformations.

By stubbing out the API I could then easily write up my transformation and load scripts, and then run tests against the database to see that the data was inserted correctly. I could have also stubbed out the database and tested the inputs coming to that as well, but it was easy enough to clear the database each time I ran the tests. My first tests were just to test that I got the number of lines I was expecting. Then, as I wrote out the transformations, I tested that the data was formatted correctly.

When I was done, I started thinking about how to get it ready for production. I checked my code coverage and was surprised that I already was covering more than 80 percent of the codebase with my tests. This was a huge timesaver for me and the team.

This, by the way, is a great approach to that old legacy code that isn’t tested. You know, that file that no one wants to touch, because each time it’s changed more bugs pop up. Create E2E tests for this file then refactor it.

So, Past Jack. Don’t fret!

You *will* eventually “get it.”

I *do* hope that this letter helps you feel a little less overwhelmed, and gives you some things to think about, and strategies to try and implement to get you started down the path of testing.

Also, don’t forget to get that extra toilet paper before 2020.

Stay safe and spread kindness,

Jack, your future self.
