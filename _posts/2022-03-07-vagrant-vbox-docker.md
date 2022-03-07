---
layout: post
title: Vagrant Ubuntu with Docker install
description: Setup a VirtualBox using Vagrant and install docker.
comments: true
tags: DevOps Learning, VirtualBox, Docker
---

Creating an Ubuntu VirtualBox and installing Docker.

Vagrantfile

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  
  config.vm.define "docker-1" do |node|
    node.vm.hostname = "docker-1"
    config.vm.box_check_update = false
    config.vm.network "public_network"
    config.vm.provider "virtualbox" do |vb|
      vb.name = "docker-1"
      vb.memory = "2048"
      vb.cpus = "2"
    end

    node.vm.provision "install-docker", type: "shell", :path => "ubuntu/install-docker-2.sh"
  end
  
end
```

install-docker-2.sh

```bash
cd /tmp
curl -fsSL https://get.docker.com -o get-docker.sh
sh /tmp/get-docker.sh
```

```bash
vagrant up
```

Wait for the virtual machines to get created and started. Then ssh into it.

```bash
vagrant ssh docker-1
```

Add the vagrant user to the docker group (this could probably be added to the script).

```bash
sudo usermod -aG docker vagrant
```

Changing the groups of a user does not change existing logins, terminals, and shells that a user has open. To avoid logging out and back in, run the following:

```bash
newgrp docker
```

