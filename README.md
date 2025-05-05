# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```bash
npm install
```

### Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
# run a docsearch crawl
npm run scan
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.  
The `.env.local` file needs to contain the following entries retrieved from [algolia](https://www.algolia.com):

```bash
APPLICATION_ID=NIXA4HHO8S
API_KEY=xxx
```
