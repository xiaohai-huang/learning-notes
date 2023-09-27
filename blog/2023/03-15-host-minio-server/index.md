---
title: Host a MinIO Server with Nginx as Reverse Proxy
authors: xiaohai
tags: [docker, object storage]
---
This documentation covers the minimum settings required to configure NGINX to proxy requests to MinIO.

Given domain `storage.xiaohai-huang.net`

- Proxy requests to `https://storage.xiaohai-huang.net` to the MinIO S3 API server listening on `http://my-minio-server:9000`
- Proxy requests to the subpath (`/minio-console`) of the domain `https://storage.xiaohai-huang.net/minio-console` to the MinIO Web Console listening on `http://my-minio-server:9001`

| Host                                              | Container                     |
| ------------------------------------------------- | ----------------------------- |
| `https://storage.xiaohai-huang.net`               | `http://my-minio-server:9000` |
| `https://storage.xiaohai-huang.net/minio-console` | `http://my-minio-server:9001` |

<!-- truncate -->
:::info

`my-minio-server` is defined in `docker-compose.yaml` by `hostname`. This allows nginx to access it using hostname rather than IP.

i.e. `proxy_pass http://my-minio-server:9000/;`

:::
## Get Certificates

Use `certbot` to generate TLS certificates.

```bash
docker run -it --rm --name certbot \
      -v "/etc/letsencrypt:/etc/letsencrypt" \
      certbot/certbot certonly --standalone -d storage.xiaohai-huang.net
```

## Servers Configurations

Things to change:

- `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`
- `MINIO_SERVER_URL` used by Web Console to correctly generate share URL.
- `MINIO_BROWSER_REDIRECT_URL` used by Web Console to redireact correctly even if it is behind a proxy.

### Docker Compose File

```yaml title="docker-compose.yaml"
version: "3"
services:
  minio-service:
    hostname: my-minio-server
    image: minio/minio
    restart: always
    command: server /data --address ':9000' --console-address ':9001'
    environment:
      MINIO_ACCESS_KEY: <user-name>
      MINIO_SECRET_KEY: <password>
      MINIO_SERVER_URL: https://storage.xiaohai-huang.net
      MINIO_BROWSER_REDIRECT_URL: https://storage.xiaohai-huang.net/minio-console
    ports:
      - 9000
      - 9001
    volumes:
      - minio-data:/data
    networks:
      - minio-net

  nginx:
    image: nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - minio-service
    networks:
      - minio-net

networks:
  minio-net:

volumes:
  minio-data:
    driver_opts:
      type: none # stands for bind mount
      device: /docker/minio
      o: bind
```

### Nginx Configuration

```nginx title="nginx.conf"
events {}

http {
  server {
    listen 80;
    server_name storage.xiaohai-huang.net;
    return 301 https://$host$request_uri;
  }

  server {
    listen 443 ssl;
    server_name storage.xiaohai-huang.net;

    ssl_certificate /etc/letsencrypt/live/storage.xiaohai-huang.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/storage.xiaohai-huang.net/privkey.pem;

    location / {
      proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

      proxy_connect_timeout 300;
      # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
      proxy_http_version 1.1;
      proxy_set_header Connection "";
      chunked_transfer_encoding off;

      proxy_pass http://my-minio-server:9000/;
    }

    location /minio-console/ {
      proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header X-NginX-Proxy true;

      # This is necessary to pass the correct IP to be hashed
      real_ip_header X-Real-IP;

      proxy_connect_timeout 300;

      # To support websockets in MinIO versions released after January 2023
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";

      chunked_transfer_encoding off;

    #   rewrite   ^/minio-console/(.*) /$1 break;
      proxy_pass http://my-minio-server:9001/;
    }
  }
}
```

## References

- [Configure NGINX Proxy for MinIO Server](https://min.io/docs/minio/linux/integrations/setup-nginx-proxy-with-minio.html)