---
layout: post
title: Popunders In The Wild Technical Analysis
comments: true
tags: reverse engineering
---

A more in depth look at what I did when checking out the PornHub popunder. I don't know that I went about things in the right manner it's what I did. Also, I want to note that I did all the analysis using an ubuntu virtual box with chrome installed.

First, I opened the site and clicked around until I experienced a popunder, that didn't take long but I did notice that it wasn't showing me another one. At this point I knew that they were somehow tracking that one had already been shown one. So I went to take a look at the cookies, but I noticed at that point that they were keeping things in local storage. So I reset those values and tried browsing again and sure enough another popunder. I continued with this process a couple more times just to see if anything would change but everything remained the same.

At this point I decided to start digging into the source to see what I could find. Right away I saw this juicy looking bit on top

![puTargetURL looking suspicious](/imgs/suspicious.png)

var puTargetURLvalue = localStorage.getItem('puTargetURL'); but I didn't see any place where it was used right away plus I still needed to find where the other 2 local storage variables were stored. So I started poking around at some of the scripts but there were a total of 24. To me this seemed to be a lot and not something I really wanted to dig through manually, so I created a quick python script using BeautifulSoup to download all the JavaScript. Now with all the scripts stored locally I was able to search through all of them easily. I quickly found where everything was being set and then used. I didn't really want to keep clicking around pornhub so I began creating a little sandbox with these scripts. I'm going to go over this process now.

As I mentioned searching for puTargetURL above I'll keep searching for it now. To do this I ran this in the same directory as all the scripts.
```grep -rnw '.' -e 'puTargetURL'```

![command output](/imgs/puTargetURL.png)

In the screenshot I can now see that I can start looking in application.js, it was minified so I took some time to make it more readable. I tried using a couple beautification tools but none of them seemed to be able to handle it, with these I ended up with a lot of errors each time. Anyway, after making it more readable I was able to see an init function initPopUnderLinks I thought this looked interesting and wanted to look for this next; but first I wanted to finish looking at the rest of this file.
From the screenshot there's a few interesting things, the first thing I noticed were the classes where the popover click event was getting attached. At this point I can start creating my sandbox html and create div's with the following classes (.menuSection, .videoWrapper, .logoWrapper, .pagination) and make a link within each of those. And then oh! I totally missed it a Math.ceil call and what exactly is it doing? Looking at it, it is checking if the pop_under_initial_date localstorage variable is already set and if it is how long ago. It seems that if it was set more then 28800 milliseconds (8 hours, unless I'm confused) ago they will show us another popunder.

One last thing to note here, I didn't realize until later but the addEventHandler function wraps and implements addEventListener in this case it gets passed 2 parameters, one is the element it should listen to and the other is the event it should listen for.
So now let me look for the init function in the other files and hopefully get a better feel for what's going on.

```grep -rnw '.' -e 'initPopUnderLinks'```

Running this I see that the function is called from footer.js, from looking through this file I can see that a lot of information is stored in varObj_footer so I'll make a note that I want to look at that later.

![footer.js](/imgs/footer.png)

I guess I don't fully understand what exactly they're doing here but they seem to be checking if the browser supports localstorage and then calling the 2 init functions from application.js which adds the listeners if needed.

Before continuing to setup my sandbox page, I decided to have another look at the pornhub page for the varObj_footer object:

After looking at it; that it looked pretty interesting and that trafficJunkyurl sitting down there looked suspect; maybe I should have a look for that getting used somewhere.
`grep -rnw '.' -e 'trafficJunkyurl'`

![popunder-build.js](/imgs/popunder-build.png)

Hmm, popunder-build.js why hadn't I noticed that before? Anyway, it seems to be building the URL that will open in the popunder tab. Now it's time, let me finish building the sandbox page and see if it works.

Let me recap my sandbox page, I needed those div's with those classes specified in application.js. I'll need jquery (2.0.3) is what they are using, jquery cookie, and the page seems to be using mg_utils to check the browser and to set the event listeners. Finally I'll need application.js, popunder-build.js, and footer.js.

At this point I'm feeling pretty good that I have something together that's testable but nervous that it won't work at all. So I open it in the browser and oh no; the console is complaining that there's a missing function isAndroid, what the? Where did I miss that? So I go back and have a quick look for it, but I can't seem to find any obvious signs of it anywhere. Hmm, at this point I just want to get it working so I decide to fake it. I see that mg_utils returns a boolean using this `MG_Utils.browser.isAndroidMobileDevice;` so I quickly wrap it in the function isAndroid and move on. Finally here :-D first click (tap) and everything goes according to plan, well..almost anyway. The new tab didn't redirect it just stayed on the current page of the original tab. What did I miss this time? Oh yeah that bit of javascript from the very beginning. I put that on the top of my sandbox page, clear the localstorage variables and try again. Awesome! Everything is working so now I'm ready to dig into what's actually happening.

For this part, I know that I'm looking for click events. So I used chrome dev tools to set an event listener breakpoint (on the sources tab look for event listener breakpoints). In there I decided to look for click events; by setting this chrome will automatically pause execution whenever one of these events fire. So now let me try this again.

![event listener breakpoints mouse events](/imgs/mouse-events.png)

This time I can see that it pauses on application.js line 1, column 782 (I decided to use the minified version for testing). The script checks that it hasn't already shown me a popunder and in this case it hasn't so it continues on and checks the browser type and phone type again, in this case I have it set to chrome and android so it continues on to the else clause and stores the current window location in o, then opens a new window and stores that in t. From there it replaces the location of the new tab with the current location of the original tab. Next it updates the original tabs location to the trafficjanky url, they use some regex to get the url setup from it's stored format. Finally the localstorage variable puTargetURL that was set earlier is used to redirect the new tab to the page that the user (me in this case) actually wanted, it used the bit of javascript I showed at the begining of the post to redirect on the actual new tab page as it can't be done from the original tab.

![else clause code](/imgs/testing.png)

#### Conclusion

In conclusion the whole thing is really simple in operation if not very annoying. However, whoever came up with this; they are ridiculously clever and I'm very impressed that they were able to come up with this. Also, I see parts of the application.js looking for FireFox. The code looks much simpler but I think I'll take the time to check that out and see exactly how it works. I don't know if that will be worthy of a post though.

#### Super Minimal Example

I setup a very stripped down version that uses these concepts, it works on Chrome 61.0.3163.100 for linux (I was running on Ubuntu). Feel free to check out the [minimal demo code here](https://gist.github.com/bmcculley/9f792b80cad10c2790cff754552047f7).

I hope everyone found this useful and also if you happen to have answers to my questions above or just know of a better way to go about this, please let me know in the comments below or any other contact method. I'd really appreciate it.