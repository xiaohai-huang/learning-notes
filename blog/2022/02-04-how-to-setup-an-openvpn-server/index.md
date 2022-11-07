---
title: How to Setup a OpenVPN Server?
authors: xiaohai
tags: [Docker, VPN]
image: https://developers.redhat.com/sites/default/files/styles/article_feature/public/blog/2014/05/homepage-docker-logo.png?itok=zx0e-vcP
description: "Setup a OpenVPN server using Docker in just one command."
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

<!-- truncate -->

## How to Backup VPN Data

The **VPN** container uses **named volume** to store configuration data.
So we can use the `volume-backup` utility to backup data. [https://github.com/loomchild/volume-backup](https://github.com/loomchild/volume-backup).

1. **Backup**. The following command will store the vpn data in `"$(pwd)/vpn_config_data.tar.bz2"`.

```bash title="backup.sh"
docker run -v openvpn_conf:/volume \
           -v $(pwd):/backup --rm \
           loomchild/volume-backup backup vpn_config_data.tar.bz2
```

2. **Restore**. The following command will use `"$(pwd)/vpn_config_data.tar.bz2"` to populate and override the volume named `openvpn_conf`.

```bash title="restore.sh"
docker run -v openvpn_conf:/volume \
           -v $(pwd):/backup --rm \
           loomchild/volume-backup restore -f vpn_config_data # without extension
```
