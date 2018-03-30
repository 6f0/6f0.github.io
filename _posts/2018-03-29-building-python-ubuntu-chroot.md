---
layout: post
title: Building Python on Ubuntu (16.04)
comments: true
tags: development, chroot
---

For this post I am specifically working on Ubuntu 16.04 but I'm sure it 
could work on other versions as well, however a little while back I wrote 
another post about building python on docker.

In this post I'm going to look at creating a chroot environment and then 
setting that up to complete the build. To setup the chroot environment I 
am going to be following along with this community post https://help.ubuntu.com/community/BasicChroot
Let's get started by installing the necessary packages

`sudo apt-get install -y schroot debootstrap`

After that create a directory where the chroot will reside

`sudo mkdir /var/xenial`

Next edit the `/etc/schroot/schroot.conf` file (as sudo)for the new chroot environment

```
[xenial]
description=Ubuntu Xenial
location=/var/xenial
priority=3
users=your_username
groups=sbuild
root-groups=root
```

Next find a mirror site that works best from here and using that url 
run the following (where `http://mirror.example.com/ubuntu/` is replaced by 
the appropriate url)

`sudo debootstrap --variant=buildd --arch amd64 xenial /var/xenial/ http://mirror.example.com/ubuntu/`

In order to have network connection copy the following into the chroot:

`sudo cp /etc/resolv.conf /var/xenial/etc/resolv.conf`

Mount the `/proc` directory to manage processes:

`sudo mount -o bind /proc /var/xenial/proc`

Update the available sources list in the chroot environment

`sudo cp /etc/apt/sources.list /var/xenial/etc/apt/sources.list`

Finally get a root shell inside the chroot:

`sudo chroot /var/xenial`

Setting up the build environment
--------------------------------

Now that a chroot environment is setup, it's time to setup the build 
environment.

```
apt-get update
apt-get install -y build-essential checkinstall
apt-get install libreadline-gplv2-dev libffi-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev wget
```

Getting the python source of the desired version 

`wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0b3.tar.xz`

Next extract the source

`tar vxf Python-3.7.0b3.tar.xz`

Finally move into the python source directory, configure and build:

```
./configure
make
make test
```

Install and enjoy!
