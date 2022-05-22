---
title: Turn a Tablet into a Secondary Monitor
authors: xiaohai
tags: [technology, monitor, WebRTC]
description: "This blog shows how to turn a tablet into a secondary monitor/display on Windows."
---

This blog shows how to turn a tablet into a secondary monitor.

<!-- truncate -->

## Step 1: Activate a Secondary Display

Create a virtual monitor.

Download the virtual display driver from [https://github.com/xiaohai-huang/resources/blob/master/xiaohai.wiki/blog-data/usbmmidd_v2.zip](https://github.com/xiaohai-huang/resources/blob/master/xiaohai.wiki/blog-data/usbmmidd_v2.zip)

Run `CMD` as Administrator.

```bash title="install the virtual display driver"
deviceinstaller64 install usbmmidd.inf usbmmidd
```

```bash title="activate a virtual monitor"
deviceinstaller64 enableidd 1
```

```bash title="deactivate a virtual monitor"
deviceinstaller64 enableidd 0
```

To completely remove the drivers from your system, run the following commands.

```bash
deviceinstaller64 stop usbmmidd
deviceinstaller64 remove usbmmid
```

At this point, we should be able to see the secondary monitor that appears in the **Display Settings**.

![Screenshot shows the secondary monitor exists in Display Settings](virtual-monitor.png)

## Share the Secondary Display

In this example, I use **WebRTC** to share the screen.

Navigate to this website [https://screen.xiaohai-huang.net](https://screen.xiaohai-huang.net)

- Tablet goes the the **Slave** page.
- PC goes to the **Master** page.

In the **Master** page, click the "share screen" button and share your secondary display.

![Screenshot shows how to share the screen](share-screen.png)

## Result

Here is the final result.

![Final result](final-result.jpg)

## References

- [Activating a Secondary Display on Windows 10 when no Monitor is Connected](https://www.amyuni.com/forum/viewtopic.php?t=3030)
- [screen-share app](https://github.com/xiaohai-huang/screen-share)
