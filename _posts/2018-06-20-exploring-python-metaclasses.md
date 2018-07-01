---
layout: post
title: Exploring Python Metaclasses
description: Using the type function to define metaclasses dynamically.
comments: true
tags: development, python
---

In this post I will take a look at using the type keyword to create dynamic 
classes on the fly (metaclasses). I'll focus on type first and then look at 
using it as it relates to creating metaclasses.

Type
----

The most widely known use of type is to determine the type of an object. Python 
is an object oriented language which means that everything has a type. Let's 
take a look at some examples:

```
>>> type(0)
<class 'int'>
>>> type('string')
<class 'str'>
>>> type(0.0)
<class 'float'>
```

That all seems pretty straight forward the type of each class is what we would 
expect, let's dig a little deeper though.

```
>>> type(int)
<class 'type'>
```

Whoa, wait a minute. The type of int is type? Let's throw a guick class 
together and check it's type.

```
>>> class Spam(object):
...   pass
...
>>> type(Spam)
<class 'type'>
```

Well now things are starting to make sense, right? The type of all classes is 
type. What about the type of type itself?

```
>>> type(type)
<class 'type'>
```

What the? Under the hood type is actually a metaclass itself that is used to 
build classes. Which means we could use that ourselves to build our own 
classes on the fly. For more information on the type function take a look at 
the [offical python documentation](https://docs.python.org/3/library/functions.html#type).

Creating a Metaclass
--------------------

Let's take a look at creating our own dynamic classes with an example. First 
I'll run through the creation of a trivial class that will print "hello, x".

```
class HelloWorld:
    def __init__(self, who):
        self.who = who
        
    def hello(self):
        print("hello, %s"% self.who)
```

Let's create an instance of this class and see how it works.

`hw = HelloWorld("world")`

Now what is the type?

```
print(type(HelloWorld))
<class 'type'>
```

Ok, that makes sense and lines up with what we discovered before. Let's run the 
hello function from the class.

```
hw.hello()
hello, world
```

Excellent, let's now peak inside the class.

```
print(hw.__dict__)
{'who': 'world'}
```

All of that hopefully makes sense. Now let's look at implementing this as a 
metaclass. In order to create a new metaclass we need to pass 3 arguments to 
the type function name, bases, and namespace. I'm just putting together a 
really simple example here so there will be no base, but let's get started.

```
HelloWorld2 = type('HelloWorld2', (), { 
                '__init__': lambda self,who: self.__setattr__('who', who),
                'hello': lambda self: print("hello, %s"% self.who)})
```

That look awesome, right? Shall we try it out and see how it works?

First let's create an instance of the class

`hw2 = HelloWorld2("world")`

What will the type of our new metaclass be?

```
print(type(HelloWorld2))
<class 'type'>
```

Hopefully you determined that it would be type. Awesome!
Should we now try the hello function to make sure that it works properly?

```
hw2.hello()
hello, world
```

It sure does, how exciting. Let's take a look inside?

```
print(hw2.__dict__)
{'who': 'world'}
```

The exact same as the class we spelled out above, great! If you would like 
more information about metaclasses here is the [official documentation](https://docs.python.org/3/reference/datamodel.html#metaclasses).

What is it good for?
--------------------

While you probably won't find yourself creating these in your everyday coding 
you might find these useful in a larger project. For example the django 
framework uses metaclasses which enables a powerful way to extend the 
framework.

Thanks for indulging in my drivel, hopefully it wasn't all bad and you have 
discovered a powerful way to dynamically extend your programs.
