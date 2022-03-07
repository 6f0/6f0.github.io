---
layout: post
title: VBoxManage - Manage VirtualBox VMs From The Command Line
description: Some basic commands to manage VirtualBox Virtual Machines From The Command Line.
comments: true
tags: DevOps Learning, VirtualBox
---

VirtualBox is a fantastic tool, previously I had been using it from the GUI. However, recently I started running it remotely on a server and using VNC to connect and manage the virtual machines. I decided that I would rather use the command line for this task as well. However, remembering all the commands is proving difficult. So I'm going to create a list and hopefully help myself and others along the way.

## List Virtual Machines

```bash
VBoxManage list vms
```

It's also possible to add the "long" argument to see all the information about the virtual machines.

```bash
VBoxManage list vms -l
```

Check which virtual machines are running

```bash
VBoxManage list runningvms
```

## Getting Virtual Machine Information


```bash
VBoxManage showvminfo master-1
```

## Delete a Virtual Machine

It's also possible to delete a VM if it's no longer needed.

```bash
VBoxManage unregistervm --delete master-1
```

## Virtual Machine Locked

Sometimes when doing an operation on the VM it might complain that it's locked.

```bash
vboxmanage startvm master-1 --type emergencystop
```

## Vagrant

If you haven't already check out [vagrant](https://www.vagrantup.com/), it makes managing Virtual Machines really convenient and easy. Sometimes you may still need to use VBoxManage to sort out some issues or to delete a machine though.

