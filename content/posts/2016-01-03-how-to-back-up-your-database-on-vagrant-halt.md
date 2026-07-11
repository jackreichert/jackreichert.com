---
title: "How to Back up Your Database on Vagrant Halt"
date: 2016-01-03
permalink: "/2016/01/03/how-to-back-up-your-database-on-vagrant-halt/"
wp_id: 741
categories: ["Web Development"]
post_tags: ["local development", "server", "sysadmin", "vagrant"]
description: "I’ve been exploring Vagrant lately. At work we need a better development workflow, and at home I’ve been reaping the benefits as well. One of the nice aspects of Vagrant is the ephemeral nature it gives to your environment. You can spin up a development box quickly and easily with a single command v"
featured_image: "/assets/images/seville-cathedral-736367f5.jpg"
layout: post
---

I’ve been exploring [Vagrant](https://vagrantup.com/) lately. At work we need a better development workflow, and at home I’ve been reaping the benefits as well.

One of the nice aspects of Vagrant is the ephemeral nature it gives to your environment. You can spin up a development box quickly and easily with a single command `vagrant up` when you’re not working you can halt the virtual machine with `vagrant halt` and when you’re not working on the project you can destroy the virtual machine and clear up your resources with `vagrant destroy`.

Your environment doesn’t collect clutter from one project to the next. You can tell your clients exactly the settings their server needs, because you *know* exactly what’s there.

This effectively separates the process of development from the content you’re using. You spin up a box with WordPress installed, add whatever posts you need to build the project for your stakeholder, destroy the box when you’re done. Vagrant up, vagrant halt. Zip up the code and archive it.

But what if a month, or week later, there’s just one more change? Now you have to spin the box up again, that’s easy. But what about that content you needed so you’re *designing for content*? Isn’t content king? When you destroyed your vm you lost the database.

That’s where this handy vagrant plugin comes into play, [Vagrant Triggers](https://github.com/emyl/vagrant-triggers). It does what it sounds like. You can now utilize the Sub-Pub pattern in your vagrant config to make sure you can spin up the box just for the 30 minutes you need to make that final change.

**Here’s how it works**

Install the vagrant plugin: `vagrant plugin install vagrant-triggers`.

\# exportdb.sh
sudo mkdir -p /vagrant/backup
echo "Backing up db..."
sudo mysqldump --add-drop-database -u root -p'root' play > /vagrant/backup/db.sql
echo "DB backup done."

\# importdb.sh
if \[ -e /vagrant/backup/db.sql \]
  then
    sudo mysql -p'root' play  < /vagrant/backup/db.sql
    echo "imported db..."
fi

\# Vagrantfile
config.trigger.before :halt do
  info "Dumping the database before shutting down..."
  run\_remote  "bash /vagrant/assets/exportdb.sh"
  run\_remote  "bash /vagrant/assets/gz-wpcontent.sh"
end

Add the `config.trigger.before :halt do` or `before :destroy`, whichever works best for you.

In your bash file you’ll want to add: `mysqldump –add-drop-database -u root -p’root’ play < /vagrant/backup/db.sql`

You can pipe that into gzip if you want it compressed.

Viola! Now you just need to add to your vagrant up bash something to check if there’s a file to import. (see importdb.sh)
