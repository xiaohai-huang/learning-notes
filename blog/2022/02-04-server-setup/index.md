---
title: Server Setup
authors: xiaohai
tags: [other]
---

## How to setup a VPN server?

Just a simple command

```bash
docker run -itd --restart always --cap-add=NET_ADMIN \
           -p 1194:1194/udp -p 7070:8080/tcp \
           -e HOST_ADDR=$(curl -s https://api.ipify.org) \
           -v openvpn_conf:/opt/Dockovpn_data \
           --name dockovpn alekslitvinenk/openvpn
```

Then download the config file from the `http://<public-ip>:7070` and then import the config file (`client.ovpn`) to the [vpn client](https://openvpn.net/vpn-client/).
