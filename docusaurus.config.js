// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require("path");
// const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");
module.exports = async function createConfigAsync() {
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
          editUrl:
            "https://github.com/xiaohai-huang/learning-notes/tree/master",
          sidebarPath: require.resolve("./sidebarsUniversity.js"),
          remarkPlugins: [(await import("remark-math")).default],
          rehypePlugins: [(await import("rehype-katex")).default],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
      ],
      [
        "@docusaurus/plugin-content-docs",
        /** @type {import('@docusaurus/plugin-content-docs').Options} */
        {
          id: "unity",
          path: "unity",
          routeBasePath: "unity",
          editUrl:
            "https://github.com/xiaohai-huang/learning-notes/tree/master",
          sidebarPath: require.resolve("./sidebarsUnity.js"),
          remarkPlugins: [(await import("remark-math")).default],
          rehypePlugins: [(await import("rehype-katex")).default],
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
            remarkPlugins: [(await import("remark-math")).default],
            rehypePlugins: [(await import("rehype-katex")).default],
            // Equivalent to `enableUpdateBy`.
            showLastUpdateAuthor: true,
            // Equivalent to `enableUpdateTime`.
            showLastUpdateTime: true,
          },
          blog: {
            showReadingTime: true,
            editUrl:
              "https://github.com/xiaohai-huang/learning-notes/tree/master",
            remarkPlugins: [(await import("remark-math")).default],
            rehypePlugins: [(await import("rehype-katex")).default],
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
          title: "Mind Palace",
          hideOnScroll: true,
          logo: {
            alt: "My Site Logo",
            src: "img/favicon.ico",
            width: 32,
            height: 32,
            style: { borderRadius: "var(--ifm-global-radius)" },
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
            {
              to: "/unity",
              label: "Unity",
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
                  label: "Unity",
                  to: "/unity",
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
          additionalLanguages: ["csharp", "nginx"],
        },
      }),
    stylesheets: [
      {
        href: "/katex/katex.min.css",
        type: "text/css",
      },
    ],
    themes: ["@docusaurus/theme-live-codeblock"],
    i18n: {
      // 2020/08/19 (year/month/day)
      defaultLocale: "en-ZA",
      locales: ["en-ZA"],
    },
    clientModules: [require.resolve("./src/aegis/init-script.js")],
    trailingSlash: false,
  };
  return config;
};
