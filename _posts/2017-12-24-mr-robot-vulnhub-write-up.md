---
layout: post
title: Mr Robot - vulnhub write up
description: A writeup of my experience with the Mr Robot boot2root box.
comments: true
tags: CTF
---

After getting this fired up virtualbox, the first thing I did and like to do is run an nmap scan.

Huh, only http(s) ports open.

```
PORT    STATE  SERVICE  VERSION
22/tcp  closed ssh
80/tcp  open   http     Apache httpd
443/tcp open   ssl/http Apache httpd
```

When first visiting the site, I found this in the index source code
`USER_IP='208.185.115.6'`
I was hungup on this for quite a while. I kept thinking I could get more access if my ip address matched this but I finally moved on.

Next up, robots.txt

```
User-agent: *
fsocity.dic
key-1-of-3.txt
```

```
key 1 of 3
073403c8a58a1f80d943455fb30724b9```

The first key, sweet! And a dictionary, the first thing I thought to do with this was to use it with dirb to find some secret directories/files. It found some things, like a zip file 'robot' which contained part of the site but it was called 'robot.com'. Based on that I updated my hosts file but it didn't make any difference.

After some time puzzling about this, I decided to try it in a dictionary attack (using the fsociety.dic) against 'wp-login.php' but what is the username? elliot! Damn! That was pretty simple actually. Finally bumped into the password in there but it was towards the end.

Now that I'm into wordpress, I went straight for the theme editor. I chose to modify the '404.php' file in this case. I removed its current code and placed in a [reverse shell from pentestmonkey](http://pentestmonkey.net/tools/web-shells/php-reverse-shell) and with that I have access to the box and I'm in as the user 'daemon'. Not the greatest but I have access, now I had a look at the other users `cat /etc/passwd`. After that I browsed the home directory and found that there's some interesting looking files in the 'robot' users home directory.

!['robot' users home directory](/imgs/robot_home.png)

In particular the password file, but it's md5 encoded. In no time at all I have the password for the robot user and the 2nd key

```
key 2
822c73956184f694993bede3eb39f959
```

Now I need to make my way to the root user. I can't use the same password to get there (sudo su) so I need to look for something else. There's nothing else really laying around that looks like it could be helpful. I thought let me look for files with the setuid set for root

`find / -perm +4000`

![return of find](/imgs/find.png)

There were some interesting looking files that popped up here and after some quick googling I was able to find an exploit for nmap. Let me see if it works...

`nmap --interactive`

followed by `! sh` gives me root access.

Sweet! Let me grab the last key...

```
key 3
04787ddef27c3dee1ee161b21670b4e4
```

And I'm done here.