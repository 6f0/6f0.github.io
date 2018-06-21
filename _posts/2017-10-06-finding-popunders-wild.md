---
layout: post
title: Finding Popunders In The Wild
description: Taking a brief look at popunders out in the wild.
comments: true
tags: reverse engineering
---

What better place to find shady practices that wouldn't be tolerated on more mainstream websites than porn sites. In this case we'll check out PornHub and how they use popunders to display ads that may lead to malware? In the cases I found during my research it lead to an android app, I haven't yet finished my analysis of the app. Also of note, I only looked at the mobile site and using chrome on Android. Although this also seems to happen on the full size site but from my very brief look at it; it uses a different method. Looks more like the [Chrome 60 live0verflow](https://www.youtube.com/watch?v=PPzRcZLNCPY) reverse engineering video.

Let's take a closer look at what happens in the mobile version of the site.

  * First it looks for the useragent and checks if it's chrome, from there it checks to see if it's on Android mobile.
  * They attach the on click listener to the links on four different elements of the page. These happen to be places where someone would tap to navigate the site or to watch a video.
  * After clicking on the link the pop under code fires and sets a local storage variable "puTargetURL" which keeps track of what the user is doing and or going.
  * Next it opens a new tab and sends it to the path stored in the variable in the above step.
  * Meanwhile underneath the original tab is sent to an ad url that is stored in varObj_footer.trafficJunkyurl.
    * This is the page I was describing in the introduction that when clicked on sent me to a suspicious looking Android app. People can also be seen asking about these ads on reddit that contain messages of having illegal stuff on your phone or computer and the FBI or some other agency being on the way to arrest you for it if you don't use their app to remove it immediately.
  * If the user was navigating to a new page they might not notice anything because it happens so fast. However, if the user was going to play a video they might notice something isn't right because they'll have to tap the play button again.
  * They seem to only show the pop under once per session, they track this by setting a couple localstorage variables.
  * after a pop under is shown 2 new local storage variables are set
    * pop_under_already_shown - this is a boolean value
    * pop_under_initial_date - the date in the form "Fri Oct 06 2017 08:30:47 GMT-0400 (EDT)"

If you were expecting a more in depth technical analysis, I apologize. I did really dig into the code to find what was going on but nothing was obfuscated so it was relatively straight forward to find what was going on. During this analysis I did stumble on some obfuscated code so I will probably check that out next. I found a post saying that rarbg[.]to also [has popunders](https://www.reddit.com/r/uBlockOrigin/comments/5p2bqk/how_to_block_popunder_on_rarbgto/?st=j8fyinga&sh=f7ee347b), so I think I might give that a look too.