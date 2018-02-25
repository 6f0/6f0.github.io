---
layout: post
title: Building Python on OpenBSD 6.2 
comments: true
tags: development
---

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
