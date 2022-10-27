// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require("path");
// const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Xiaohai's Mind Palace",
  url: "https://xiaohai.wiki",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "xiaohai-huang", // Usually your GitHub org/user name.
  projectName: "Learning Notes", // Usually your repo name.

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: "university",
        path: "university",
        routeBasePath: "university",
        editUrl: "https://github.com/xiaohai-huang/learning-notes/tree/master",
        sidebarPath: require.resolve("./sidebarsUniversity.js"),
        remarkPlugins: [math],
        rehypePlugins: [katex],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    async function plugin(context, options) {
      return {
        name: "docusaurus-plugin-module-alias",
        configureWebpack() {
          return {
            resolve: {
              alias: {
                "@src": path.resolve(__dirname, "src"),
              },
            },
          };
        },
      };
    },
    "docusaurus-plugin-sass",
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/xiaohai-huang/learning-notes/tree/master",
          remarkPlugins: [math],
          rehypePlugins: [katex],
          // Equivalent to `enableUpdateBy`.
          showLastUpdateAuthor: true,
          // Equivalent to `enableUpdateTime`.
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/xiaohai-huang/learning-notes/tree/master",
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      algolia: {
        appId: "NIXA4HHO8S",
        apiKey: "0e434f5d05dd96ad91008f11f2903066",
        indexName: "xiaohai-mind-palace-index",
      },
      navbar: {
        title: "Home",
        hideOnScroll: true,
        logo: {
          alt: "My Site Logo",
          src: "img/favicon.ico",
        },
        items: [
          {
            to: "/docs",
            position: "left",
            label: "Notes",
          },
          {
            to: "/university",
            label: "University",
            position: "left",
          },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/showcase", label: "Showcase", position: "left" },
          { to: "/about", label: "About", position: "right" },
          {
            href: "https://github.com/xiaohai-huang/learning-notes",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Notes",
                to: "/docs",
              },
              {
                label: "University",
                to: "/university",
              },
              {
                label: "Todos",
                to: "/todos",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },

              {
                label: "Resources",
                href: "https://github.com/xiaohai-huang/resources",
              },
              {
                label: "GitHub",
                href: "https://github.com/xiaohai-huang",
              },
              { to: "/about", label: "About" },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Xiaohai's Mind Palace, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  themes: ["@docusaurus/theme-live-codeblock"],
  i18n: {
    // 2020/08/19 (year/month/day)
    defaultLocale: "en-ZA",
    locales: ["en-ZA"],
  },
  scripts: [
    "https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js",
    "/aegis/init-script.js",
  ],
  trailingSlash: false,
};
module.exports = config;
