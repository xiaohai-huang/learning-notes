---
title: Serve Static Website Stored On Remote Server Using Nginx
authors: xiaohai
tags: [docker, object storage, nginx]
---

I stored the `build` folder of react app on my MiniO server under the path `https://storage.xiaohai-huang.net/website/build/index.html`. I want to serve the web app using a custom domain `pxd.pink`. Here is how I achieve this with the help of Nginx.

<!-- truncate -->

## Setup Nginx Proxy Manager

Use the Docker to setup the [**Nginx Proxy Manager**](https://github.com/NginxProxyManager/nginx-proxy-manager).

1. Create a Docker network

Create a Docker network for the Nginx server and the upstream services. So they can communicate with each other and the services do not need to expose/publish ports to the host.

Create a network, e.g., "`nginx-network`"

```bash
docker network create nginx-network
```

Then add the following to the bottom of the `docker-compose.yaml` of the Nginx Proxy Manager and any other services that need to use the reverse proxy server.

```yaml title="docker-compose.yaml"
networks:
  nginx-network-alias:
    name: nginx-network
    external: true
```

2. Launch the Nginx Proxy Manager

Use the `docker-compose.yaml`. And `docker-compose up -d`

```yaml title="docker-compose.yaml"
version: "3"
services:
  app:
    image: "jc21/nginx-proxy-manager:latest"
    restart: unless-stopped
    ports:
      - "80:80"
      - "81:81"
      - "443:443"
    volumes:
      - ./data:/data
      - /etc/letsencrypt:/etc/letsencrypt

// highlight-start
# connect to the same network
    networks:
      - reverse-proxy-network
// highlight-end

// highlight-start
networks:
  reverse-proxy-network:
    external: true
    name: nginx-network
// highlight-end

```

## Redirect Domain to Subpath

- domain: "[pxd.pink](https://pxd.pink)"
- `build` folder location: "https://storage.xiaohai-huang.net/website/build/"

Write the following config in the `Advanced tab` of the `Edit Proxy Host` menu.

```
location / {
    proxy_intercept_errors on;
    error_page 404 = /index.html;
    proxy_pass http://my-minio-server:9000/website/xiaohai-test-site/dist/;
}
```

The above config makes the Nginx server to return `/index.html` on the storage server if the storage server cannot find the specified object in its bucket. This is necessary in order to make react-router function properly.

## Expose the Storage Service

Let's look at how to expose the storage service to the world.

```yaml title="docker-compose.yaml"
version: "3"
services:
  minio-service:
    hostname: my-minio-server
    image: minio/minio
    restart: always
    command: server /data --address ':9000' --console-address ':9001'
    environment:
      MINIO_ACCESS_KEY: admin
      MINIO_SECRET_KEY: hello-world
      MINIO_SERVER_URL: https://storage.xiaohai-huang.net
      MINIO_BROWSER_REDIRECT_URL: https://storage.xiaohai-huang.net/minio-console
    ports:
      - 9000
      - 9001
    volumes:
      - minio-data:/data

// highlight-start
# connect to the same network
    networks:
      - nginx-network-alias
// highlight-end

// highlight-start
networks:
  nginx-network-alias:
    name: nginx-network
    external: true
// highlight-end


volumes:
  minio-data:
    driver_opts:
      type: none # stands for bind mount
      device: /docker/minio
      o: bind
```

## References

- [NPM | Advanced Configuration](https://nginxproxymanager.com/advanced-config/#best-practice-use-a-docker-network)
