---
layout: post
title: Vulnhub - RickdiculouslyEasy&#58; 1
description: A writeup of my experience with the RickdiculouslyEasy boot2root box.
comments: true
tags: CTF
---

I had some time to play on the computer this weekend, so I decided that I would look into finding a CTF. After poking around [reddit](https://www.reddit.com/r/securityCTF) for a bit I finally remembered [Vulnhub](https://www.vulnhub.com/), how could I have forgotten. Any how, I found [this challenge](https://www.vulnhub.com/entry/rickdiculouslyeasy-1,207/) on the first page and thought it looked pretty interesting. Now let's take a look at solving it.

After booting it up on virtualbox it shows the assigned ip address, perfect. Using that I started an `nmap port scan nmap 192.168.56.102 -O -sV -p- -T4` From this I can see a number of ports I can get to work on and also the first flag!

![nmap output](/imgs/nmap.png)

I thought cockpit looked pretty interesting so I tried looking at that first, another flag but beyond that there doesn't really seem to be anything else to do there. From there I decided to go have a look at port 80, still nothing really there...bummer..but it's early still. Firing up dirbuster, I used the "directory-list-2.3-small.txt" list to search for directories. Pretty quickly robots.txt popped up, I could've kicked myself for not thinking to look if this existed on my own.

![the contents of robots.txt](/imgs/robots.png)

But oh well it's here now and there's some very interesting looking stuff in there! Trying root_shell.cgi first I find that it's under construction. Next up the tracertool.cgi, I immediately think that this looks
juicy. It's pretty easy to combine commands and I find out that it's running as the "apache" user so writing anything useful to the server is out of the
question. But I am able to list files, hmm maybe I could get a list of users on the system? It turns out that someone has replaced the output of cat with a ascii cat, this made me laugh. So I guess I'll have to use head but this gets me what I was looking for, sweet!

![list of users](/imgs/tracertool.png)

By this time dirbuster showed that there's a directory called passwords, that looks pretty promising. And being that directory listing is turned on it's easy to see that there's another flag and then looking at the source of the passwords.html a password that's also a season (matching the summer username). Could it be?
Sure enough, I am able to log right in to the Summer user.

![directory listing](/imgs/passwords_dir.png)

![passwords.html source](/imgs/password_html.png)

At this point I starting poking around the other users home directories. The safe executable (in RickSanchez's directory) looks pretty interesting, so I copied it back to Summer's home directory. But, I can't find anything useful. I tried suppling various command line arguments but I wasn't getting anywhere.
So I moved over to Morty's directory, there are a few interesting looking things in here. I copied the "journal.txt.zip" to Summer's home directory and tried to unzip it but it needs a password. So I move back over and start poking at the "Safe_Password.jpg". My first thought was to run strings on it but strings isn't installed on the server. So I end up just executing "more" against it. Turns out I was pretty lucky not have strings available; I would've been banging my head against the wall awhile longer.

![output of more Safe_Password.jpg](/imgs/safe_password.png)

After unzipping the journal I find another flag and the command line argument that needs to be supplied to the safe executable. Sweet! Another flag and hints on how Rick's password is setup.

![safe executable and password hints](/imgs/safe_executable.png)

I'm not familiar with Rick & Morty so I had to look up the "old band name". It's called "The Flesh Curtains". So throwing together a [quick script](https://gitlab.com/snippets/1687230) to build a list of passwords and then using hydra to run through the list I was able to find Rick's password.

After logging into Rick's account I started thinking what would roots password be but then I remembered that it said "sudo is wheely good" in the output of safe. Based on that I tried "sudo su" and was able to get root! In the root directory I find another flag. Awesome, but I missed some flags along the way...because I only have 110 points even though I have root.

#### Going back for the missed flags

I didn't even bother with port 60000 before, I just so happened to choose the right path and kept finding useful information so I kept going with it. But in order to collect the missing flags I telnet to the port and was able to cat the FLAG.txt which is great but I'm still 10 points away. While I was in there I decided to poke around some more just to make sure I didn't miss an easier path to root, I concluded that I didn't really miss anything by not going that way before.

On to the next flag..maybe try the ftp port? But Kali doesn't have ftp installed by default and I have it set to host only network connection and I'm feeling lazy about rebooting just to install it, especially at this point. But I had root already so I decided to just run a find for files with the name of flag, and I see one under "/var/ftp"; the final flag!