---
title: How to Setup a ShadowSocks VPN Server?
authors: xiaohai
tags: [Docker, VPN]
image: https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Shadowsocks_logo.png/180px-Shadowsocks_logo.png
description: "Setup a ShadowSocks VPN server using Docker in just one command."
---

A fast and reliable VPN server.

<!-- truncate -->

## Setup Server

Copy the following two files into a folder and run `docker-compose up -d`

```yaml title="docker-compose.yaml"
version: "3.7"
services:
  ss-v2ray-service:
    image: teddysun/shadowsocks-libev
    container_name: ss-v2ray
    cap_add:
      - NET_ADMIN
    environment:
      - PUID=1000
      - PGID=1000
    volumes:
      - ./:/etc/shadowsocks-libev # folder of SS config file
    ports:
      - 8333:9000
      - 8333:9000/udp
    restart: always
```

```json title="config.json"
{
  "server": "0.0.0.0",
  "server_port": 9000,
  "password": "xiaohai666",
  "timeout": 300,
  "method": "aes-256-gcm",
  "fast_open": false,
  "nameserver": "8.8.8.8",
  "mode": "tcp_and_udp",
  "plugin": "v2ray-plugin",
  "plugin_opts": "server"
}
```

## Connect to Server

Download the GUI client for these different platforms.

### Android

Download the apks from [GitHub releases](https://github.com/shadowsocks/shadowsocks-android/releases).

### Windows

Download the app from [GitHub releases](https://github.com/shadowsocks/shadowsocks-windows/releases).

### Linux

Download the app from snap store - [shadowsocks-electron](https://snapcraft.io/shadowsocks-electron).

## References

- [teddysun/shadowsocks-libev | DockerHub](https://hub.docker.com/r/teddysun/shadowsocks-libev)
