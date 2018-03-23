---
layout: post
title: Creating a FreeBSD bootable USB on OS X
comments: true
tags: system installation, freebsd
---

It's pretty straightforward but I can't remember some of the
commands like I can on Linux. So I'm creating a little post 
for it so I don't have to keep searching and thinking what did
I do last time every time.


Download the installation media
-------------------------------

Head over to the [download page](https://www.freebsd.org/where.html) 
to and download the memstick image that's right for your 
architecture, in my case it's the amd64 image.

Note: Make sure to verify the checksum, in order to do this you'll
need to download the checksum file. So, at this point I have the 
following 2 files.

```
CHECKSUM.SHA256-FreeBSD-11.1-RELEASE-amd64
FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
```

Extract the image
-----------------

`gunzip FreeBSD-11.1-RELEASE-amd64-memstick.img.xz`

Verify the checksum
-------------------

`openssl dgst -sha256 FreeBSD-11.1-RELEASE-amd64-memstick.img`

Compare the output of this with the values in the checksum file.

Write to a USB device
---------------------

After plugging it in, find out where is it mounted using
`diskutil list`. In my case it was mounted at disk2.

Unmount the usb: `sudo diskutil unmountDisk /dev/disk2`

Finally writing the image!

```
sudo dd if=FreeBSD-11.1-RELEASE-amd64-memstick.img of=/dev/disk2 bs=1m conv=sync
```

Once that's complete you can eject the usb device.


`sudo diskutil eject /dev/disk2`

Now you can enjoy installing, setting up and using your new FreeBSD system.
