---
title: How to Setup a VPN Server?
authors: xiaohai
tags: [Docker]
image: https://developers.redhat.com/sites/default/files/styles/article_feature/public/blog/2014/05/homepage-docker-logo.png?itok=zx0e-vcP
description: "Setup a VPN server using Docker in just one command."
---

Just a simple command

```bash
docker run -itd --restart always --cap-add=NET_ADMIN \
           -p 1194:1194/udp -p 7070:8080/tcp \
           -e HOST_ADDR=$(curl -s https://api.ipify.org) \
           -v openvpn_conf:/opt/Dockovpn_data \
           --name dockovpn alekslitvinenk/openvpn
```

Then download the config file from the `http://<public-ip>:7070` and then import the config file (`client.ovpn`) to the [vpn client](https://openvpn.net/vpn-client/).

Clients:

- [Windows](https://6669-first-cloudbase-env-5c619520c1a6-1255762420.tcb.qcloud.la/mind-storage/openvpn-connect-windows.msi)
- [Android](https://6669-first-cloudbase-env-5c619520c1a6-1255762420.tcb.qcloud.la/mind-storage/oepnvpn-android.apk)
