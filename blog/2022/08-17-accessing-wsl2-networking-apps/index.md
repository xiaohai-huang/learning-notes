---
title: Accessing a WSL2 Networking Apps From Your LAN
authors: xiaohai
tags: [technology, WSL]
description: "This blog shows how to access networking apps running on WSL2 from your LAN. This can be useful for making the application available for other devices on the network"
---

When using a WSL 1 distribution, if your computer was set up to be accessed by your LAN, then applications run in WSL could be accessed on your LAN directly.

However, this isn't the default case in WSL2 as it has a virtualized ethernet adapter with its own unique IP address.

<!-- truncate -->

## Motivation

This can be useful for making the application available for other devices on the network, which allows us to debug a web app from mobile devices.

## Solution

### Make the App Accept LAN Connections

> When using remote IP addresses to connect to your applications, they will be treated as connections from the Local Area Network (LAN). This means that you will need to make sure your application can accept LAN connections.

For example, you may need to **bind** your application to `0.0.0.0` instead of `127.0.0.1`.

In the example of a Next.js app, this can be done with the command: `npx next dev -H 0.0.0.0`

### Port Proxy

Here's an example PowerShell command to add a port proxy that listens on port 3000 on the host and connects it to port 3000 to the WSL2 VM with IP address `172.22.94.49`.

```powershell
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=172.22.94.49
```

:::info

When you restart your PC, the IP address of the WSL2 instance will change, you need to delete the old **port proxy** and run the command above again. Below shows how to delete the old **port proxy** which listens on port 3000 on the host.

```powershell
netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=0.0.0.0
```

:::

## References

- [MS Docs](https://docs.microsoft.com/en-us/windows/wsl/networking)
- [Next.js CLI Docs](https://nextjs.org/docs/api-reference/cli#development)
