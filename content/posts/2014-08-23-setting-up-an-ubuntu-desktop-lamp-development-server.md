---
title: "Setting up an Ubuntu Desktop LAMP development server"
date: 2014-08-23
permalink: "/2014/08/23/setting-up-an-ubuntu-desktop-lamp-development-server/"
wp_id: 359
categories: ["Web Development"]
post_tags: ["LAMP", "sysadmin", "Ubuntu"]
description: "So you’ve inherited a WordPress site and you want to start developing for it. But you don’t want to go commando on the production site. Smart. How do you set up a local development environment? In this tutorial I’ll walk you through setting up a simple dev environment on Ubuntu desktop. WordPress ty"
layout: post
---

<figure class="wp-block-embed is-type-rich is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper"><span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/sw1qcGdVomI?version=3&rel=1&showsearch=0&showinfo=1&iv_load_policy=1&fs=1&hl=en&autohide=2&wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span></div></figure>

So you’ve inherited a WordPress site and you want to start developing for it. But you don’t want to go commando on the production site. Smart.

How do you set up a local development environment?

In this tutorial I’ll walk you through setting up a simple dev environment on Ubuntu desktop.

WordPress *typically* runs off a LAMP stack. Not always, but most sites do. So that’s what we’ll set up.

**LAMP** stands for:

**L** inux – the operating system. In this case Ubuntu.

**A** pache – the web server. Sometimes Nginx is used.

**M** ySQL – the database.

**P** HP – the server-side scripting language.

The first step is to make sure you’re completely up to date.

So let’s open up the terminal and run: `sudo apt-get update`

Now we install the lamp server, run:`sudo apt-get install lamp-server`

Since Ubuntu 10 there’s this. Pretty easy, right?

Type your password. Agree to the packages it’ll install. This will install **ALL** of the modules and packages you’ll need to run a web server locally.

You’ll get a prompt to set a password for the root user for MySQL. Even though this is local, it’s best to keep to best practices, so don’t just press enter.

That was ridiculously easy. Let’s test that by going to [http://localhost/](http://localhost/) in the browser. You *should* get a success apache screen.

Let’s test PHP:

sudo touch /var/www/html/info.php 
sudo nano /var/www/html/info.php
# type: <?php phpinfo();
# Ctrl C to exit.

Then navigate to: [http://localhost/info.php](http://localhost/info.php)

You should see the phpinfo screen.

Also to keep with best practices, once that’s done run:

`sudo /usr/bin/mysql_secure_installation`

Remember that password we just set? You’ll need it now. No, you don’t need to change the password you just set. Say yes to the rest.

Next we’ll need a database for WordPress to use. So type: `mysql -u root -p` Enter the password you set for root.

Then create the database: `create database wordpress;` Then: exit

Now we’re almost ready to install WordPress, we just have to deal with some permissions, so we can code comfortably.

First, we’ll need to grant apache access to the html directory: `sudo chown -R www-data:www-data /var/www/.`

Then we need to add ourselves to apache’s group: `sudo usermod -a -G www-data YOURUSERNAME`

In order for that to take effect, you’ll have to log out and log back in.

Now, we still can’t do anything in the html directory. That’s because we need to grant read/write/execute permissions for the apache group.

`sudo chmod -R 775 /var/www/.`

And Viola! WordPress time!

Download: [http://wordpress.org/latest.zip](https://wordpress.org/latest.zip)

Let’s extract that to: /var/www/html/

If you go to [http://localhost/wordpress](http://localhost/wordpress) in your browser you should see the installation wizard.

Click “Create a Configuration File” then “Let’s go!”

The “Database Name” keep as ‘wordpress’, we just created that. “User Name” is ‘root’. “Password” is whatever you set for that. “Database Host” keep as ‘localhost’.

Usually it’s not a good practice to keep the root user for running your applications, but for expediency we’ll keep it for now.

“Submit”

Aaannnd this: “Sorry, but I can’t write the wp-config.php file.”

No problem. Click back in your browser, and go back to the terminal. Run: `sudo chown -R www-data:www-data /var/www/.`

Again, and we’ll resubmit. Because we copied the WordPress files apache didn’t own that directory. You should be good to go now.

“Run the Install”

Fill out the form. And we can log in now!

Congratulations! You now have your own development server running off your Ubuntu desktop.

Let’s test that out… Yup, all seems to be working just fine.

This site you can now develop for and break with impunity.
