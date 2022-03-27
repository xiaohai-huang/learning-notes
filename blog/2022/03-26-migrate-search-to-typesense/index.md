---
title: Self-Hosted typesense Service
authors: xiaohai
tags: [Docker, search engine]
description: "Self-host a typesense search server to perform document search for xiaohai.wiki. 
This is an alternative to Algolia."
image: https://typesense.org/_nuxt/img/typesense_logo.b12edde.svg
---

[typesense](https://typesense.org/) is a open source Algolia alternative. This blog shows how to run a self-hosted `typesense` server on my own server.

<!-- truncate -->

## Setup a `typesense` Server Using Docker

Run the server with `docker-compose up`

```yml title="docker-compose.yml"
version: "3.9"
services:
  typesense:
    image: typesense/typesense:0.22.2
    environment:
      - TYPESENSE_DATA_DIR=/data
      - TYPESENSE_ENABLE_CORS=true
      - TYPESENSE_API_KEY=test-key
    ports:
      - "8108:8108"
    volumes:
      - /t-data:/data # /t-data is used to store search engine data
```

see "how to configure the server using [environment variables](https://typesense.org/docs/0.22.2/api/server-configuration.html#using-environment-variables)".

## Crawl the Site

1. Create a `docsearch-config.json` config file which contains the information about the document website.

   1. [Download](https://github.com/algolia/docsearch-configs/blob/master/configs/docusaurus-2.json) config file.
   2. Update the `index_name` and domain name.

2. Create a `.env` file which contains the information about the [typesense server](#setup-a-typesense-server-using-docker) created in the previous step.

```bash title=".env"
TYPESENSE_API_KEY=test-key
TYPESENSE_HOST=xiaohai-huang.net
TYPESENSE_PORT=8108
TYPESENSE_PROTOCOL=http
```

3. Run the scraper using Docker.

```sh
CONFIG="$(cat docsearch-config.json)" # Retrieved from step 1
docker run -i --rm \
        --env-file=$(pwd)/.env \ # .env created at step 2
        -e CONFIG="${CONFIG}" \
        typesense/docsearch-scraper
```

## Add `typesense` Search Bar

Install the package.

```bash
yarn add docusaurus-theme-search-typesense@next
```

Add the following to `docusaurus.config.js` file:

```js
{
  themes: ['docusaurus-theme-search-typesense'],
  themeConfig: {
    typesense: {
      typesenseCollectionName: 'xiaohai-mind-palace-index', // the index_name in `docsearch-config.json`

      typesenseServerConfig: {
        nodes: [ // typesense server info
          {
            host: 'xiaohai-huang.net',
            port: 8108,
            protocol: 'http',
          },

        ],
        apiKey: 'test-key', // TYPESENSE_API_KEY specified in docker-compose.yml
      },

      // Optional: Typesense search parameters: https://typesense.org/docs/0.21.0/api/documents.md#search-parameters
      typesenseSearchParameters: {},

      // Optional
      contextualSearch: true,
    },
  }
}
```

## References

- [Official Instructions](https://typesense.org/docs/guide/docsearch.html#step-1-set-up-docsearch-scraper)
- [Generate API keys for admin and user](https://typesense.org/docs/0.22.2/api/api-keys.html#create-an-api-key)
- [Add Search Bar](https://typesense.org/docs/guide/docsearch.html#option-a-docusaurus-powered-sites)
