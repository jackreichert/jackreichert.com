---
title: "How to Globally Ignore files from git"
date: 2016-10-03
permalink: "/2016/10/03/how-to-globally-ignore-files-from-git/"
wp_id: 806
categories: ["Web Development"]
post_tags: ["Git"]
description: "TLDR; nano ~/.gitignore git config –global core.excludesfile ‘~/.gitignore’ Background Git is all the rage, why wouldn’t it be? You can save every iteration of your work; it’s the persistent undo button for developers. Seriously, if you’re not using it, start now. Find a tutorial, stop everything yo"
featured_image: "/assets/images/eiffel-b88ed20f.jpg"
layout: post
---

### TLDR;

1.  `nano ~/.gitignore`
2.  `git config –global core.excludesfile ‘~/.gitignore’`

### Background

Git is all the rage, why wouldn’t it be? You can save every iteration of your work; it’s the persistent undo button for developers. Seriously, if you’re not using it, start now. Find a tutorial, stop everything you’re doing and get on that. It will make your work 1000% more efficient.

One issue I came across with my workflow is that my Mac, like everyone else’s, places a .DS\_Store file in every directory. There is absolutely no situation in which I could possibly my .DS\_Store files to be included in my repo.

### The Solution?

Global .gitignore files.

If you’re new to git, a .gitignore file (don’t forget that preceding period) is placed in your git repo. When you are committing git will ignore all the files in that directory, and deeper, that are listed in the .gitignore file.

If you’ve never used it before, [here’s how .gitignore works](https://git-scm.com/docs/gitignore). Typically you would add directories that hold dependencies that can easily be fetched again and take up space.

You can also set a global .gitignore for the files you know you will never want to include in any repo (like the .DS\_Store files).

The first line in the [TLDR](https://www.jackreichert.com/2016/10/how-to-globally-ignore-files-from-git/#tldr) above creates the file that will be used as the global .gitignore in a good location for such a file. Typically config files for a specific user are placed in that user’s home directory. `~/` is a shortcut to that location.

The second line sets the .gitignore file you just created to be used in the global config. This way you never have to add the file specified there to any local .gitignore files in the future.

### Warning

Just like with all global config settings, make sure you only put there things you’ll never want to include in any project whatsoever. Down the line, you might wish you hadn’t set a config file when you’re pulling your hair out trying to figure out why file X or Y isn’t getting included in your project.

*About the image: Yes, that was taken in Paris…*
