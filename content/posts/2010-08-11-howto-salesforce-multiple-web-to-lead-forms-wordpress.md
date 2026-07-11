---
title: "How To Integrate Salesforce With Cforms (and have multiple Salesforce Web to Lead forms in WordPress)"
date: 2010-08-11
permalink: "/2010/08/11/howto-salesforce-multiple-web-to-lead-forms-wordpress/"
wp_id: 154
categories: ["Web Development"]
description: "If you use Salesforce and you have a WordPress powered site you may be frustrated. Salesforce is a wonderful tool for managing your customers and potential leads. WordPress is the best CMS out there today (I am a little biased, but it’s true). So why can’t they play together? There IS a solution out"
layout: post
---

<figure class="wp-block-image alignright size-large is-resized"><a href="/assets/images/salesforce-logo-dba7fbaa.png"><img loading="lazy" data-attachment-id="156" data-permalink="/salesforce-logo/" data-orig-file="/assets/images/salesforce-logo-dba7fbaa.png" data-orig-size="159,124" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="salesforce-logo" data-image-description="" data-image-caption="" data-large-file="/assets/images/salesforce-logo-dba7fbaa.png" src="/assets/images/salesforce-logo-dba7fbaa.png" alt="" class="wp-image-156" width="299" height="233" sizes="auto, (max-width: 299px) 100vw, 299px"></a></figure>

If you use Salesforce and you have a WordPress powered site you may be frustrated. Salesforce is a wonderful tool for managing your customers and potential leads. WordPress is the best CMS out there today (I *am* a little biased, but it’s true). So why can’t they play together?

There IS a solution out there now… The [WordPress-to-lead for Salesforce CRM Plugin](https://wordpress.org/extend/plugins/salesforce-wordpress-to-lead/) by [Yoast](https://yoast.com/wordpress-salesforce/) *is* a noble effort. It’s easy to use, which is more than I can say for the instructions I will be giving below (but even if you’re not a coder, you should be able to follow). The problem is that it only offers one form.

But what if you are running multiple campaigns? What if you need different forms? You *can* use the Web to Lead custom forms that Salesforce offers, but if you want to have required fields, you’ll need to code special JavaScript to validate those forms… That’s not a very good solution either.

Also, what if you want to keep a backup of the leads. The Web to Lead forms have a limit of 500 leads a day. While they assure you that you will be emailed the rest of the leads so you can input them yourself, you may want a central place to track your leads aside from Salesforce.

This is where [Cforms II](http://www.deliciousdays.com/cforms-plugin/) comes in. Cforms is my favorite WordPress forms plugin. It offers a beautiful GUI backend, *many* features, themes and even form tracking. Wouldn’t it be great if you could combine the best WordPress form plugin with the best CRM in town?

## Note:

Once you make these adaptations you should be aware that EVERY form you create with Cforms on your site will try to submit the information to Salesforce. If you would like only SOME of your forms to be submitted see the [appendix](/2010/08/howto-salesforce-multiple-web-to-lead-forms-wordpress/#appendix) at the end of the post.

## Step 1 – Hack Cforms

I often hack plugins. It is laborious, trying to figure out the inner workings of certain plugins. They tend to be poorly commented and many best programming practices are avoided. In contrast, Cforms is beautiful. Not only is it understandable as code; but the author created a file: “my-functions.php” whose sole purpose is to allow other coders to add functionality to the plugin without having to hack. This is what we will be “hacking”.

Find the following block of code:

And replace it with this:

### Explanation:

<figure class="wp-block-image alignright size-large is-resized"><a href="/assets/images/cforms-alt-option-98221f45.png"><img loading="lazy" data-attachment-id="158" data-permalink="/2010/08/11/howto-salesforce-multiple-web-to-lead-forms-wordpress/cforms-alt-option/" data-orig-file="/assets/images/cforms-alt-option-98221f45.png" data-orig-size="300,109" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="cforms-alt-option" data-image-description="" data-image-caption="" data-large-file="/assets/images/cforms-alt-option-98221f45.png" src="/assets/images/cforms-alt-option-98221f45.png" alt="" class="wp-image-158" width="381" height="138" sizes="auto, (max-width: 381px) 100vw, 381px"></a></figure>

Initially, I thought that the “Send form data to an alternative page” option under “Core Form Admin/Email Options” but whatever I did, the forms, when submitted, got stuck on the dreaded “One moment please…” Ajax message. The answer was submission via cURL (ask your neighborhood coder to explain). In addition there is some data processing involved so that the form contents will be understood by Salesforce.

## Step 2 – The Form

The next stage is building your forms in Cforms.

<figure class="wp-block-image size-large"><a href="/assets/images/cforms-form-114bdf99.png"><img loading="lazy" width="717" height="509" data-attachment-id="160" data-permalink="/2010/08/11/howto-salesforce-multiple-web-to-lead-forms-wordpress/cforms-form/" data-orig-file="/assets/images/cforms-form-114bdf99.png" data-orig-size="717,509" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="cforms-form" data-image-description="" data-image-caption="" data-large-file="/assets/images/cforms-form-114bdf99.png" src="/assets/images/cforms-form-114bdf99.png" alt="" class="wp-image-160" sizes="auto, (max-width: 717px) 100vw, 717px"></a></figure>

I am assuming that you’ve already built some web-to-lead forms in Salesforce, and you like the idea of having a form engine running them with form validation and database tracking. If you haven’t yet, please create a form in Salesforce. It is not easy to figure out how to do this, and [the salesforce help](https://emea.salesforce.com/help/doc/user_ed.jsp?section=help&target=setting_up_web-to-lead.htm&loc=help&hash=topic-title) sometimes omits important information, not to mention needing an account to access the help. So getting the code for a web-to-lead form warrants a post of it’s own, but that will have to be for another time.

Once, you have the code for the form go through it and add to your Cforms form a field for each field that you have in the Salesforce form (if you add extra fields I don’t know if Salesforce will process that information).

One thing to keep in mind when doing this is that you should make sure to name the fields ***EXACTLY*** as they do. Each field in the Salesforce code begins with a

For example:

<label for=“company”>Company</label><input id=“company” maxlength=“40” name=“company” size=“20” type=“text” /><br>
<label for=“first\_name”>First Name</label><input  id=“first\_name” maxlength=“40” name=“first\_name” size=“20” type=“text” /><br>

So you want to call your first Cforms field “Company” and your next one “First Name”.

When you’re done adding all the fields there are a few more “hidden” fields that you will need to add:

1.  In position #1 add a field.
2.  Under “Type” change the field from “single line of text” to “hidden field”.
3.  In the “Field Name” type ‘oid|’ and then without spaces your Salesforce organization ID number.

To find your oid refer back to your form code provided by Salesforce. About 10-15 lines down you should see two lines like this:

<form action=”<a href=“https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8">https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8</a>" method=“POST”>
<input type=hidden name=“oid” value=“XXXXXXXXXXXXXXX”>

Where instead of the letter X you’ll see a string of numbers and letters (I’ve counted 15 numbers, it may vary, but probably not). That’s your Salesforce organization ID.

If you are running campaigns and you want the form to be added to one of those campaigns, you will need to add the Campaign ID as well as a hidden value.

In your Salesforce code look for something like this:

<label for=“Campaign\_ID”>Campaign</label>
<select  id=“Campaign\_ID” name=“Campaign\_ID”>
    <option value=“”>–None–</option>
    <option value=“XXXXXXXXXXXXXXX”>Contact us - Website</option>
</select>

There probably will be more `<option>` tags. Choose the campaign you would like the Cforms form to add the lead to and copy the ‘value’ (whatever is in between the quotation marks `<option value=“XXXXXXXXXXXXXXX”>` ).

Then add another hidden field to your Cforms form. Call it ‘Campaign\_ID|’ then without spaces your Salesforce campaign ID number (same process as above).

Make sure to update the form when you are done.

## Step 3 – We’re almost done

<figure class="wp-block-image aligncenter size-large is-resized"><a href="/assets/images/cform-core-options-ae8c6cac.png"><img loading="lazy" data-attachment-id="161" data-permalink="/2010/08/11/howto-salesforce-multiple-web-to-lead-forms-wordpress/cform-core-options/" data-orig-file="/assets/images/cform-core-options-ae8c6cac.png" data-orig-size="479,163" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="cform-core-options" data-image-description="" data-image-caption="" data-large-file="/assets/images/cform-core-options-ae8c6cac.png" src="/assets/images/cform-core-options-ae8c6cac.png" alt="" class="wp-image-161" width="550" height="187" sizes="auto, (max-width: 550px) 100vw, 550px"></a></figure>

There is one more step to take. Underneath your form in Cforms there are options. Open up “Core Form Admin / Email Options” and you’ll find an option: “Use custom input field NAMES & ID’s”. By default, Cforms uses generic field names and ID’s for the input fields. Salesforce does not understand these names. By checking this box it is ensuring that Salesforce will be able to understand the information you are sending it. Make sure to update the form again and you’re good to go.

## Appendix – or “What if I don’t want ALL my forms to be submitted to Salesforce?”

As I mentioned above, once you make these adaptations you should be aware that EVERY form you create with Cforms on your site will try to submit the information to Salesforce. If you do not want this to happen there are a few more lines of code that need to be added to “my-functions.php”.

Before we make the changes you’ll need to know the ID of the forms you want submitted. If you go to the “Form Settings” page you will see at the top a form navigation system to navigate between forms.

<figure class="wp-block-image size-large is-resized"><a href="/assets/images/cforms-form-nav-dcb1dd96.png"><img loading="lazy" data-attachment-id="163" data-permalink="/cforms-form-nav/" data-orig-file="/assets/images/cforms-form-nav-dcb1dd96.png" data-orig-size="649,62" data-comments-opened="0" data-image-meta="{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}" data-image-title="cforms-form-nav" data-image-description="" data-image-caption="" data-large-file="/assets/images/cforms-form-nav-dcb1dd96.png" src="/assets/images/cforms-form-nav-dcb1dd96.png" alt="" class="wp-image-163" width="655" height="63" sizes="auto, (max-width: 655px) 100vw, 655px"></a></figure>

On the right you’ll see numbers in white ovals and one in a blue circle. Each of those number correspond with a different form and that number is the form ID. Navigate to the form you want, and then see which number is in blue.

**Next:** Open up “my-funtions.php” and find the line

$form   = $cformsdata\[‘data’\];

After that line insert the following code:

if ( $formID == ‘3’){

Replace the number ‘3’ with the ID of the form you want sent to Salesforce. If there are several forms you want sent then use this code instead:

if ( $formID == ‘3’ || $formID == ‘4’ ){

Again, replace the numbers to the corresponding numbers of the forms you want send to Cforms. For each form you want included add another || $formID == ‘N’ before the closing bracket.

**WAIT! You’re not done yet!!!** If you leave it as-is you will break Cforms.

Find the end of the function. It will end with a curly bracket.

fclose($fp);

between the fclose($fp); and the } add another curly bracket ‘}’ like so:

fclose($fp);
}

If you skip this stage you will probably break Cforms. And NOW, don’t forget to save the changes you’ve made.

**NOW you’re done!**
