---
title: "The Privacy / Convenience Polarity is a Myth"
date: 2016-05-16
permalink: "/2016/05/16/the-privacy-convenience-polarity-is-a-myth/"
wp_id: 765
categories: ["Musings"]
post_tags: ["data", "location", "privacy"]
description: "There is a myth, that if you want to have privacy, it will be at the expense of convenience; and if you want convenience, it will be at the expense of privacy. They say that is the way things have to be, but it really doesn’t have to be this way. Open up your iPhone […]"
featured_image: "/assets/images/window-5456bacd.jpg"
layout: post
---

There is a myth, that if you want to have privacy, it will be at the expense of convenience; and if you want convenience, it will be at the expense of privacy.

**They say that is the way things *have* to be, but it really doesn’t *have* to be this way.**

Open up your iPhone and go to settings, then open up Privacy > Location Services and see how many apps are using your location “always”. See how many of those apps were just defaulted to “always” and how many *require to always have your location.* Then ask yourself which of those apps actually NEED to ALWAY have your location?

Here is how this is justified. Let’s use a location recommendation service, like Foursquare or Yelp, as an example.

The pitch is, this location recommendation app gives you value by finding all the great places your friends like.

However, In order for you to benefit from that data you need to enable the location services on your phone. The app then tracks where you, as well as your friends, go. It records all the places you “check in” to. Based on where your friends “check in” and based on the ratings other people who frequent that venue give, you can get the best recommendations everywhere you go.

This app can then sells to advertisers the data it collects. This is the app’s business model. The app sees that you frequent a specific gym. It can then go to the gym across the street and sell them the opportunity to advertise to you, as you go to their competitor. That’s how they pay the bills.

\*\*People will tell you that this is the way it NEEDS to be if you want the convenience of getting the best recommendations. \*\*

The problem with this approach is that the more independent services that manage your sensitive data, the more you are open to vulnerabilities. Do you know what systems each individual place that handles your data uses to protect that data?

### Why you should care

In many situations, like what my favorite pizza order is, I am less susceptible to being hurt by a breach of privacy. But that’s not the case with ALL personal data.

What happens when a company that collects your location data goes out of business or is acquired? Any agreement it might have had with you vis-a-vis privacy is can be ignored. When Internet companies go out of business, their data is often the only valuable asset they have left.

Or from the [comments of the CDT before the FCC](https://cdt.org/files/privacy/issues/location/010406fcc.shtml).

> Consumers’ dissatisfaction is likely to be heightened when the advertisements arrive from third parties with whom the consumer has not established any relationship. Without awareness of how their location information is being used and who has access to it, consumers will feel as though there is omnipresent surveillance of their activities by companies they do not know. The invasiveness of such advertising increases when the volume and frequency of messages is also outside of their control.

**The real issue is that Apple, Android, and Microsoft, the gatekeepers to the location services on our devices, haven’t built their systems properly.**

There is a concept in computer science called Data Encapsulation.

> Data encapsulation, also known as data hiding, is the mechanism whereby the implementation details of a class are kept hidden from the user. The user can only perform a restricted set of operations on the hidden members of the class by executing special functions commonly called *methods*. – [Wikipedia](https://en.wikipedia.org/wiki/Data_encapsulation)

(Note: “User” here refers to the classes or methods manipulating the data, i.e. the user of the data.)

This actually is a best practice of software architecture. When your code knows too much about the other components that means that those sections of code are probably dependent upon that knowledge, which means that your code is inflexible, fragile, rigid, and more likely to break.

**Let me show you another way location, and other sensitive data could be designed.**

[Stripe](https://stripe.com) is a payment processor. It’s my favorite to use, because they clearly care about both security and ease of implementation. I.e. they care about the people using their service.

One of the interesting aspects of how they implement their system is that if you use them, your server never has any idea what the purchaser’s credit card number is.

This is a really good thing for developers. If your system handles credit cards you have to make sure your system is PCI compliant otherwise you’re opening yourself up to all sorts of legal fun. Making your system PCI compliant is not easy. Which means that implementing e-commerce can be a challenge… Unless you work with a company like Stripe that already solved that problem for you.

**How does Stripe make sure that your server never touches a credit card number?**

When you submit a form, the fields in the form have to be named. If the fields are not named the browser simply will not pass the data in those fields to the server. It can’t, because it doesn’t know how to label that data.

Stripe takes advantage of this “feature” and hijacks the submit button. When a purchaser on your site puts in their credit card information Stripe collects all the data in the form securely sends it to their servers and sends back a token and places that token in a proper form field on your site.

Once the data is submitted, the browser *doesn’t* send the credit card data, because it isn’t named, but it *does* sent over the token that Stripe created for this interaction.

As a developer you can look up information about that transaction, even about the purchaser. But you can’t have the full credit card number. The purchaser is protected, because there is an impartial third party who is responsible for keeping the credit card information secure. And the site is protected as it does not have to hold sensitive data. But *can* have all the benefits as if it *did* save the credit card number. The site has usage statistics, purchase statistics, all the bells and whistles.

This is the beauty of data encapsulation.

**Location data should work this way too.**

For starters. There should **not** be an option for services to have location data always on, by default. I’m saying this as a developer fascinated by location-centric apps. Location data should be as protected as credit card information. There is no excuse for that.

The creators of the operating systems should be the gatekeepers of our location data. If they were serious about security this should be the next front line. They already collect and record the data if it is enabled, they should be the only ones.

Apple Pay, Google Wallet, these are all big targets because they have huge revenue potential. They also make things safer. A pay-per-use location API would be too (there are many affordable ways to make pay-per-use services, see Mailchimp.)

There should be a [PCI SCC](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard) equivalence for location data. There should be a council looking out for your privacy and making sure that others hold to those standards.

**This probably won’t happen,** people don’t seem to care enough.

But don’t listen when people tell you it *has* to work this way.

*About the image: Overlooking SF*
