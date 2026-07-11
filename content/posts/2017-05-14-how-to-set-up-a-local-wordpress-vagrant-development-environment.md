---
title: "How to set up a local WordPress Vagrant development environment"
date: 2017-05-14
permalink: "/2017/05/14/how-to-set-up-a-local-wordpress-vagrant-development-environment/"
wp_id: 886
categories: ["Web Development"]
post_tags: ["nginx", "PHP", "vagrant", "WordPress"]
description: "Setting up a Vagrant box can be painstaking. Here is the process: Install a basic box. SSH into said box. Run a command. If it works, add the command to a provision file. Destroy your box. Run the box again and see if the command works via a provisioning file too. Whether it works, or […]"
featured_image: "/assets/images/o-google-1111489d.jpg"
layout: post
---

Setting up a Vagrant box can be painstaking.

Here is the process:

1.  Install a basic box.
2.  SSH into said box.
3.  Run a command.
4.  If it works, add the command to a provision file.
5.  Destroy your box.
6.  Run the box again and see if the command works via a provisioning file too.
7.  Whether it works, or doesn’t work, back to step 2 and try a new command or try the same command another way – depending of if it worked or not.

This is a really good way to get to know what your system’s administrator does every day. It includes a lot of reading manuals and playing with configurations.

If you want to understand your server better, there is no better (and safer) way. An added benefit is that doing this will also give you confidence in your development skills, as you’ll understand more of what goes on beneath the surface.

**Warning:** This process will take you days. At least at first.

[VVV](https://github.com/Varying-Vagrant-Vagrants/VVV) is great, if you don’t want to think about what you’re running. Its imprint as a local environment is bit heavy though.

Since I’m partially responsible for running the server at work (together with our security professional), and I run the server that this site (and a few others) is hosted on, I \_do\_like to think about my server. I think about it a lot.

## Disclosure

Please don’t consider contents from this post as best pratice for running a production server. There’s a whole lot more security and settings involved.

I just updated my [local development vagrant box](https://github.com/jackreichert/vagrant-ubuntu-wp-dev-env). I thought I’d share what I learned upgrading it so that you don’t have to go through steps 2-7 above 80 gazillion times.

## Current Versions:

-   Ubuntu 16.04 (Xenial)
-   Python 3
-   Nginx 1.13
-   PHP 7.1
-   Percona 5.7
-   NVM

## How do I get started with Vagrant?

[Vagrant](https://www.vagrantup.com) automates setting up a server. What this means is that you can clone a git repository with the settings to run a specific environment, type `vagrant up` and you don’t have to know any more than whether you trust the person who designed that environment.

It’s also free, unless you need to use it with VMware. Which makes it very popular among use developers who love free software.

To get started with Vagrant all you need to do is download the latest version of [Vagrant](https://www.vagrantup.com/downloads.html), and [VirtualBox](https://www.virtualbox.org/wiki/Downloads). Make a folder somewhere and go to it in your terminal. Then type `vagrant init` and then `vagrant up`.

## How do I use your repo, I don’t care how it works?

Simple.

1.  Download and install Vagrant and Virtual box.
2.  [Clone the github repo](https://github.com/jackreichert/vagrant-ubuntu-wp-dev-env)
3.  Run `vagrant up` from the directory.
4.  Add `192.168.33.10 play.lcl` to your hosts file. (See *“What is a hosts file?”* below for details.)
5.  Go to [http://play.lcl](http://play.lcl) in your browser.

## Why should I run Ubuntu Xenial on my Vagrant box?

Ubuntu is one of the easier, and stable, Linux distributions to maintain. The apt package manager is simple to use and has a great community contributing to its upkeep. In addition, it tends to offering later releases of tools than most other distributions.

One alternative, CentOS, uses yum as their package manager, which is also pretty good, but doesn’t offer as many recent releases of packages as apt does. I’ve used it a lot. One great benefit is that CentOS has an Enterprise edition ([Redhat](https://www.redhat.com/en/technologies/linux-platforms)). If you are required by your company to use Enterprise software, so that you can blame someone if something goes wrong, CentOS/Redhat is not a bad way to go.

I’ve had to use SUSE as well, I *had* to for a while. Pity me.

As of the last time I used it, there was *no* meaningful package manager. That means that if you want something that’s not already packaged with SUSE you had to hope that someone (who you had to trust) had compiled a version that would work… Or you had to compile it yourself. Not safe or fun.

So let’s start with the box itself. Hashicorp, the creator of Vagrant, [provides a basic Ubuntu box](https://atlas.hashicorp.com/ubuntu/boxes/xenial64) for most major releases. Other people release boxes as well, but I like mine clean so that I know what’s on the box when I begin with it.

Your basic install will go like this: `vagrant init ubuntu/xenial64`.

This will create your most basic configuration file. I recommend reading that file. It will give you an idea of what you can do with your configurations. If you type `vagrant up` you’ll have Ubuntu 16.04 running.

Ubuntu alone, though, won’t help you with your development much. You’ll need git to get other tools, you’ll need a server to serve files to your browser, some compiling language to run your code and serve to your file server, a database… But a basic OS is a good start.

## What is a hosts file? How to I run my local site from a URL and not an IP address?

When your browser tries to load a domain it goes out to a DNS (Domain Name Server) which is a database of domains that point to IP addresses, then your browser goes to that ip address to load the content from the server that hosts the site you are looking for.

Before it goes out to the DNS, your broswer checks a file on your computer called the hosts file. In your hosts file you can tell it any IP address and a domain, and your browser will go to *that* IP address when you type the domain into your browser. So if you want to use a domain that doesn’t exist you can edit your hosts file and add the domain you want.

You can also override existing domains this way. This can be used nefariously, as I’m sure you can imagine. But it can also be helpful. I’ve used this several times when I wanted to set up a new server. I pointed my local hosts file to the new server’s IP address and set everything up there. Once it was all good, I told my domain hosting provider the new location of my site. BOOM. That’s it.

So if you want to develop locally on google.com you can point google.com in your hosts file to your virtual machine’s local IP address. But it will get confusing if you need to look something up, you won’t be able to access the *real* google.com until you change it back.

**Note:** If you play around with this some browsers (ahem Chrome) cache the ip addresses and even if you change it back in your hosts file [you need to flush various caches](http://www.download3k.com/articles/How-to-Flush-or-Clear-Reset-Google-Chrome-s-DNS-Cache-and-Sockets-00853) of your browser to access the proper servers again.

I personally like to use something like play.lcl. I’d recommend to use a TLD (top level domain, i.e. .com/.net) that doesn’t exist so you never try to reach a site that you’ve overridden the domain locally.

In order for your hosts file to work, though, you need to point the local domain to an IP address. You \_can \_start up your vagrant server, SSH in, run `ifconfig` and get your IP address that way. But if you reload your local server that ip address might change, and will from time to time.

Enter the static ip: `config.vm.network “private_network”, ip: “192.168.42.10”`

If you add this line to your Vagrantfile, you’re telling Vagrant to always set up the server to use that IP address. You can choose anything in the [private address spaces](https://en.wikipedia.org/wiki/Private_network). What this will do is make sure your box runs of that same IP address each time. So when you reload your box, or shut it down for a week, it will be the same IP address when you `vagrant up` again.

**Note:** If you are running multiple boxes simultaneously, make sure you use a different IP address, or shut down the other boxes.

Now [edit your hosts file](https://support.rackspace.com/how-to/modify-your-hosts-file/) and add the line: `192.168.33.10 play.lcl`

I like to use [Gas Mask](https://github.com/2ndalpha/gasmask) to manage my hosts file on my mac.

Once your server is up and running you’ll be able to access it in your browser from the URL [http://play.lcl](http://play.lcl). Sometimes the first time you type it in you need to add the http:// otherwise your browser will search for the domain in your default browser instead of looking it up in the hosts file.

## How do I not lose my code files when I destroy my Vagrant box?

One of the benefits of Vagrant is the built-in functionality for synchronizing folders. Back before I was using Vagrant I had to jump through hoops to back up my files on my local environment, now it’s baked-in.

In your Vagrant file add `config.vm.synced_folder “./html”, “/var/www/html”, create: true`

This will synchronize the files in the html on your computer to /var/www/html. Which is usually where servers run their code from. If the folder doesn’t exist, it will create it for you.

## How do I customize the amount of memory my vagrant box has?

If you’re running a local server with programs that need more than a default amount of memory, or less for that matter, you can add the following to your Vagrantfile…

config.vm.provider “virtualbox” do |vb|
 vb.memory = “1024”
 end

This will set aside 1gb of your computer’s memory for your box.

## How do I tell Vagrant to run install scripts when it starts up?

There are two ways to do this: The first is inline.

config.vm.provision “shell“, inline: <<-SHELL # run some code here like…
  apt-get update
SHELL

The other way is in separate files.

`config.vm.provision :shell, path: “assets/clean-update.sh”`

What this does is let you keep [all your code neat and easy to find](https://github.com/jackreichert/vagrant-ubuntu-wp-dev-env/tree/master/assets). You won’t have to sort through files that are hundreds of lines long to reconfigure one little thing.

## Why does my Vagrant box break when I upgrade everything?

[I like to keep things up-to-date.](https://github.com/jackreichert/vagrant-ubuntu-wp-dev-env/blob/master/assets/clean-update.sh) It’s a good way to protect yourself from security issues, or use the latest and greatest features. It’s also a good way to break your code or server. But if you’re running a local server, then there’s no problem there. Test it locally, if it works, apply on production. The beauty of a local server.

Here’s how you play:

-   Copy the entire vagrant folder somewhere else.
-   Halt all other boxes.
-   Run vagrant up in the new copy.
-   Play… `apt-get clean all apt-get update apt-get -y upgrade –with-new-pkgs apt-get -y dist-upgrade apt-get -y autoremove`

This updates and cleans up pretty much everything. Some of these commands are redundant, I have them in there so I can comment one or the other out and provision.

The problem with many base Vagrant base boxes is if you run this, you’re likely to destroy some local configuration and your box won’t continue to run as it had been. That’s why I like using the basic boxes as my base… `vagrant init ubuntu/xenial64`. Other people/companies provide basic preconfigured boxes, but if you want to play around with Linux configurations you will want to start with something clean.

**Note:** [If you’ve cloned this repo](https://github.com/jackreichert/vagrant-ubuntu-wp-dev-env) and are using it locally to develop your code you don’t want to run `vagrant reload –provision` without first testing your code elsewhere.

## How do I install the *latest* version of Git on Ubuntu Xenial?

If you’re going to install other packages on your box you’re going to want Git to get started. By default Ubuntu doesn’t come with the latest version of Git. It’s pretty recent, but not the latest. If you *want* the latest you can use the [ppa](https://askubuntu.com/questions/4983/what-are-ppas-and-how-do-i-use-them) for git-core.

apt-add-repository ppa:git-core/ppa
apt-get update
apt-get install -y git

You’ll notice no `sudo` that’s because vagrant provision files by default will run as a sudoer. If you *don’t* want it to, like if you’re installing node packages, you’ll need to add `privileged:false` to the end of the line in your Vagrantfile, like so:

`config.vm.provision :shell, path: “assets/node.sh”, privileged: false`

## Why isn’t Python 3 the default Python for Ubuntu?

Python 3 is a pretty awesome update over Python 2. There are lot of new things under the hood, but a lot of other features athat are not100% backwards compatible. Since so many tools have been built in python 2, most default installations are python 2. Nonetheless, the transition [is on the roadmap](https://wiki.ubuntu.com/Python) for future releases of Ubuntu. If you want it now, you can easily run python 3 on your sever.

`apt-get install -y python3-software-properties python3-pip python3-dev`

As in life, you really only need to know what you’re looking for in order to find the answer. There are versions of most of the tools for python with a 3 appended to the install command.

## How do I install the latest version of Nginx on Ubuntu Xenial?

### First, why nginx?

Nginx is ridiculously fast at serving static files. It was built from the ground up to do so, and at its inception was basically trying to solve the issues that apache had.

[If you *do* go with nginx](https://github.com/jackreichert/vagrant-ubuntu-wp-dev-env/blob/master/assets/nginx.sh), you’ll need to run something for your dynamic content – like PHP. This isn’t a big deal, you can run php-fpm and you’re good to go. PHP traditionally is a module running *on top* of Apache. PHP-fpm runs along side the server instead of on top of it. The benefit of doing this is that php it will make a smaller imprint on your resources.

### Ok, how do I install it?

Like git, the *latest* nginx does not come with apt out of the box. But Chris Lea has compiled it for you all to use.

add-apt-repository -y ppa:chris-lea/nginx-devel
apt-get update
apt-get install -y nginx

## How do I install a self-signed cert on Vagrant? How do I get ssl/https on Vagrant?

With Google giving preference to ssl secured sites it’s a good idea to be able to develop and test your code in similar circumstances. You can automatically create a self-signed ssl certificate like so:

mkdir -p /etc/pki/ssl
cd /etc/pki/ssl
openssl genrsa -out play.lcl.key 2048
openssl req -new -x509 -key play.lcl.key -out play.lcl.cert -days 3650 -subj /CN=play.lcl

Then you can add the following to your nginx site .conf file:

listen 443 ssl;
ssl\\\_certificate /etc/pki/ssl/play.lcl.cert;
ssl\\\_certificate\\\_key /etc/pki/ssl/play.lcl.key;

Just keep in mind, your browser is smarter than that, you’ll have to disable and affirm your kitchen sink and first-born child in the settings in order for it to load your local site over ssl. This is fine, because, do you really want insecure certs easily circumvented? Think of the non-technical people in your life…

## How do I install php-fpm on my Vagrant box?

Now that you have nginx running you can’t install the apache module for PHP and expect it to run. Ondřej Surý provides a ppa for php-fpm’s latest release.

add-apt-repository -y ppa:ondrej/php
apt-get update
apt-get install -y php7.1 php7.1-bcmath php7.1-cli php7.1-common php7.1-curl php7.1-dev php7.1-fpm php7.1-gd php7.1-json php7.1-mbstring php7.1-mcrypt php7.1-mysql php7.1-tidy php7.1-xml php7.1-xmlrpc php7.1-zip

This line above will give you everything under the sun along with php, as well as a kitchen sink. Which is fine for a development server. When it comes to a production server it’s best to install the minimum and add only what you need. Otherwise you’ll have a lot to keep an eye on when you audit your sever and code for security issues.

## What is Percona and why would I use it instead of MySQL?

[From their site](https://www.percona.com/software/mysql-database/percona-server)…

> Percona Server for MySQL® is a free, fully compatible, enhanced, open source drop-in replacement for MySQL that provides superior performance, scalability and instrumentation.

I met some of the good people who work there. Basically the back story is thus. A number of developers working on building MySQL were frustrated with the performance of MySQL and frustrated that the company was not implementing their ideas. So they forked it and improved it.

If you were to [benchmark it](https://www.percona.com/software/mysql-database/percona-server/benchmarks) you can confirm that it truly is superior.

### How do I install Percona on a Vagrant box?

This is the tricky part. Percona has some configurations that you *need* to enter as you’re installing it. But you don’t want to have to do that if you’re running a vagrant box. I would vehemently recommend against most of the practices you need to automate these installations when setting up a production server. But for the convenience of a local development server, here you go.

cd ~/
wget \[https://repo.percona.com/apt/percona-release\\\_0.1-4.$(lsb\\\_release\](https://repo.percona.com/apt/percona-release\_0.1-4.$(lsb\_release) -sc)\\\_all.deb
dpkg -i percona-release\\\_0.1-4.$(lsb\\\_release -sc)\\\_all.deb
apt-get -y update

echo “percona-server-server-5.7 mysql-server/root\\\_password password root” | debconf-set-selections
echo “percona-server-server-5.7 mysql-server/root\\\_password\\\_again password root” | debconf-set-selections
DEBIAN\\\_FRONTEND=noninteractive apt-get -y install percona-server-server-5.7

This will download the package to your home folder, add it to apt then update apt. Next you’re setting the response to the configuration. Finally, you’re installing the Percona server with the noninteractive flag.

**Note:** This one took a long while to figure out, so thank me.

If you follow the installation script while it’s happening you’ll notice that there are commands you need to run to get the full benefits of Percona. Here’s how to run them in your provisioning script.

\# restart after reconfig
service mysql restart
mysql -e “CREATE FUNCTION fnv1a\\\_64 RETURNS INTEGER SONAME ‘libfnv1a\\\_udf.so’;”
mysql -e “CREATE FUNCTION fnv\\\_64 RETURNS INTEGER SONAME ‘libfnv\\\_udf.so’;”
mysql -e “CREATE FUNCTION murmur\\\_hash RETURNS INTEGER SONAME ‘libmurmur\\\_udf.so’;”
sudo mysql -D mysql -e”update user set plugin=‘mysql\\\_native\\\_password’;”
sudo mysql -D mysql -e”flush privileges;”

## How do I install NVM on my Vagrant box?

This is another one that took some time to figure out.

### What is NVM?

[NVM stands for Node Version Manager](https://github.com/creationix/nvm). It’s a really simple tool for installing and jumping in between different versions of node. If you want to use the latest version of node you only type `nvm install node` then `nvm use node` and boom. You’re using the latest node. You can also specify a version. This was more helpful when Node had been forked and you wanted to test IOJS. Node has matured somewhat since then, and there’s less of a need. But it’s still helpful for building packages or troubleshooting.

cd ~/
curl -o- \[https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh\](https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh) | bash
source ~/.nvm/nvm.sh
echo “source ~/.nvm/nvm.sh” >> ~/.bashrc
nvm install node
nvm use node

This will run the nvm install script, then it loads it into your bash profile so that you can use it immediately in your script.

When installing node packages you should make sure to install them using the Unix user that you’ll be developing with. So [when I run this file](https://github.com/jackreichert/vagrant-ubuntu-wp-dev-env/blob/master/assets/node.sh) I run it set privileged: false, as I explained above.

## How do I automatically install WordPress on my Vagrant box?

You have web server (nginx) a PHP compiler (php-fpm) and a database (percona) running. You’re missing WordPress. Enter [wp-cli](https://wp-cli.org).

wp-cli is a command-line interface for maintaining WordPress. With it, you can install and update WordPress core, plugins, and themes.

Let’s start my installing wp-cli…

cd ~/
curl -O \[https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar\](https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar)
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp
wp –info

This will install wp-cli on your box. Again, so that you can use it with your vagrant user run this in a non-privileged provision.

Next install WordPress:

cd /var/www/html
wp core download
wp core config –dbname=play\\\_lcl –dbuser=root –dbpass= –dbhost=localhost
wp db create play\\\_lcl
wp core install –url=play.lcl –title=Playground –admin\\\_user=admin –admin\\\_password=admin –admin\\\_email=admin@example.com
wp theme update –all
wp plugin update –all

This downloads the core to your html folder, yes, the one we synchronised before. It then creates the configuration file. Next it installs WordPress with the user: `admin` and password: `admin`. Finally, it updates the plugins and themes.

You no longer have to log into your dashboard and click update on all your plugins. Now one simple command does the trick.

## In summary

If you’ve stuck around till here, thanks! Tweet: “Ooogaah Boogah” [@jackreichert](https://twitter.com/jackreichert) to let me know and show your appreciation…

Well that was a long brain dump. I update this project [from time to time](https://github.com/jackreichert/vagrant-ubuntu-wp-dev-env). I probably won’t go back to this blog post and update it. But I *will* push my changes. So you can star the repo for future reference.
