---
layout: post
title: Building Python on OpenBSD 6.2 
description: Some notes on compiling python on OpenBSD, get the latest python on OpenBSD.
comments: true
tags: development
---

**Note:** If there are patches for the software you want available in 
the ports tree, you probably want to look at the 
[working with ports](https://www.openbsd.org/faq/ports/ports.html) 
page. However, if you want to customize your build further read on. 

At the time of this writing I am in the process of building python 3.6.4.
The build process could change in the future, but this is current build 
process, hopefully this will give someone the jumpstart they need to get 
going on this. It took me quite a while to find this infomation, not sure 
if I was going about the search in the wrong manner. Anyhow, without further 
ado...

You'll first need the following...

Library dependencies

 * archivers/bzip2
 * archivers/xz
 * databases/sqlite3
 * devel/gettext
 * devel/libffi

Build dependencies

 * devel/autoconf/2.69
 * devel/metaauto

Next pull down the python source code, following by in my case the [necessary
patches](https://cvsweb.openbsd.org/cgi-bin/cvsweb/ports/lang/python/3.6/) thank
you to the maintainers for keeping this going and making things very easy on me. 
Finally apply the patches and build python

**Note:** I ended up running into some issues later on, I wanted to run this from 
my home directory. However this ended up causing issues when trying to create a 
virtualenv. I found this [answer on stackoverflow](https://stackoverflow.com/a/5001555) 
which explained that when running the config you should tell the path you are planning 
to install to. Example:

`./configure --prefix=/home/install/python`

Hope this helps some people save some time and headaches.
