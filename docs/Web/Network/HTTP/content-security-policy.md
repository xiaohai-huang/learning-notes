---
sidebar_label: Content Security Policy
description: Notes about HTTP response header Content-Security-Policy which can be used to prevent cross-site scripting attacks.
---

# Content Security Policy (CSP)

The HTTP `Content-Security-Policy` response header allows website owners to decide which resources the user agent is allowed to load for a given page. This helps guard against **cross-site scripting** attacks.

:::info

A primary goal of CSP is to mitigate and report XSS attacks.

:::

## Using CSP

There are two ways to configure content security policy.

1. HTTP response header
2. meta tag

:::note

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src https://*; child-src 'none';"
/>
```

:::

## Syntax

```
Content-Security-Policy: <policy-directive>; <policy-directive>
```

`<policy-directive>` consists of `<directive> <value>`.

### Fetch Directives

**Fetch directives** determines the locations that the resources are allowed to fetch.

#### `default-src`

Serves as a fallback for other fetch directives.

#### `script-src`

Specifies the valid sources for JavaScript and WebAssembly resources.

#### `font-src`

Specifies the valid sources of fonts loaded via `@font-face`.

#### `img-src`

Specifies the valid sources of images and favicons.

#### `style-src`

Specifies the valid sources for stylesheets.

### Navigation Directives

These directives control which locations a user can navigate or submit a form.

#### `form-action`

Restricts the URLs which can be used as the target of a form submission.

#### `navigate-to`

Restricts the URLs that the user can navigate to. e.g., `<a>`, `window.location`, `window.open`, etc.

### Reporting Directives

These directives control the reporting process of CSP violations. It is configured by `Content-Security-Policy-Report-Only` header.

#### `report-uri`

#### `report-to`

### Other Directives

#### `trusted-types`

Used to specify an allowlist of trusted policies. It allows applications to lock down **DOM XSS** injection attacks to only accept **typed** values in place of strings.

#### `upgrade-insecure-requests`

Instructs the site to treat all of insecure URLs as they have been replaced with secure URLs.

### Values

#### 🔑 Keyword Values

##### `none`

Won't allow loading of any resources.

##### `self`

Only allow resources from the current **origin**.

##### `strict-dynamic`

Allow scripts which loaded dynamically by trusted scripts to load.

#### 🔗 Hosts Values

It can be either **Host** or **Scheme**.

##### Host

- Only allow loading of resources from a specific host, with optional scheme, port, and path. e.g., `xiaohai.wiki`, `*.xiaohai.wiki`, `https://*.xiaohai.wiki:233/path/src/hello.js`
- Path ends with `/` match any path they are a prefix of. e.g. `xiaohai.wiki/api/` will match URLs like `xiaohai.wiki/api/users`.
- Other path parts in the CSP are matched exactly e.g. `xiaohai.wiki/hello.js` will match `http://xiaohai.wiki/hello.js` and the **https** version of it, but not `https://xiaohai.wiki/yes.js`.

##### Scheme

Only allow loading of resources over a specific scheme, should always end with "`:`".

For example, `https:`, `http:`, `data:` etc.

#### 👽️ Other Values

**nonce-\***

A nonce is an arbitrary number that can be used just once in a cryptographic communication.

The server must generate a unique nonce value each it transmits a policy. This is used in conjunction with the [script](../../HTML/00-script-tag.md) tag's **nonce attribute**.

**sha\*-\***

e.g. `sha256-jzgBGA4UWFFmpOBq0JpdsySukE1FrEN5bUpoK8Z29fY=`

## Injection Defense

### Nonce-Based CSP

`Content-Security-Policy: script-src 'nonce-...' 'strict-dynamic'`

Modify `<script>` tags to include a _nonce_ which changes on each response.

### Trusted Types

`Content-Security-Policy: trusted-types myPolicy`

- Enforce type restrictions for unsafe DOM APIs.
- Create safe types in policy functions.

:::info

**origins & sites**

- Two URLs are `same-origin` if they share the same **scheme**, **host** and **port**.
  - https://xiaohai.wiki/docs
  - https://xiaohai.wiki/docs/Web/JavaScript/memory-management
- Two URLs are `same-site` if they share the same **schema** & **registrable domain**.
  - https://fhfhockey.com/
  - https://cms.fhfhockey.com/
- Otherwise, the URLs are `cross-site`.
  - https://xiaohai.wiki/
  - https://fhfhockey.com/

:::

## References

- [Securing Web Apps with Modern Platform Features (Google I/O ’19)](https://www.youtube.com/watch?v=DDtM9caQ97I)
- [CSP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
