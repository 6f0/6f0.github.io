---
layout: post
title: Building a VirtualBox ISO with Packer
description: Encounter 'NS_ERROR_FAILURE (0x80004005)' when building a vagrant base box image with packer.
comments: true
tags: DevOps Learning, VirtualBox, Docker
---

I wanted to try building my own Vagrant base box, I decided to use one of the chef bento templates for ease.

It was moving along nicely, downloaded the ISO, verified the checksum and suddenly this error appears.

```bash 
VBoxManage: error: Details: code NS_ERROR_FAILURE (0x80004005), component MachineWrap, interface IMachine packer
```

Not quite sure where to start I decided to do a quick Google, read some posts about VirtualBox modules. I was quite sure that wasn't my issue. So I went to GitHub where I saw a couple of issues that said set headless to true. Being new to packer, I didn't really understand what that meant. After more reading I finally found it and decided I'd make this quick post about it.

```bash
$ cd packer_templates/ubuntu
$ packer build -var 'headless=true' -only=virtualbox-iso ubuntu-18.04-amd64.json
```

That's all I needed and likely all you need if you're having this issue as well. As long as you have ran `sudo /sbin/vboxconfig` and have the modules successfully loaded.

## Use the Packer Image with Vagrant

Either move into or copy the image to your current directory and use the following commands.

```bash
vagrant box add ubuntu18 ubuntu-1804.box

vagrant init ubuntu18

vagrant up
```

Enjoy your new Virtual Box!
