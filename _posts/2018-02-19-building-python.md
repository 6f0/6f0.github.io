---
layout: post
title: Building Python on Ubuntu 14.04
comments: true
tags: development
---

While hunting for the source of a bug earlier, I thought that it might be the 
cause of a bad binary. To rememdy this I thought that I would build python 
from source and now I'm creating this post for some documentation on the 
process. During this I was using Ubuntu 14.04 (trusty) running on docker.

First, install all the packages that will be needed for the build:

```
# apt-get install build-essential libz-dev libssl-dev
# apt-get build-dep python3
```

#### Notes:

 * libz-dev is only needed if you want/need zlib support
 * libssl-dev is only needed if you require ssl support.

Both of the above are needed if you want to use pip.

Next the `Modules/Setup` file needs to be tweaked to enable zlib and 
ssl support.

#### zlib support

uncomment the following line

`zlib zlibmodule.c -I$(prefix)/include -L$(exec_prefix)/lib -lz`

#### ssl support

uncomment the following code block (also make sure to pay attention to the 
comments, make sure that the other socket above this block is commented.)

```
SSL=/usr/local/ssl
_ssl _ssl.c \
        -DUSE_SSL -I$(SSL)/include -I$(SSL)/include/openssl \
        -L$(SSL)/lib -lssl -lcrypto
```

Finally follow the rest of the build instructions as included in the README:

```
$ ./configure
$ make
$ make test
# make install
```

Enjoy! If you see anything that needs to be adjusted let me know so I can 
get it fixed.