---
sidebar_label: Content Security Policy
description: Notes about HTTP response header Content-Security-Policy.
---

# Content Security Policy (CSP)

## Injection Defense

### Nonce-Based CSP

`Content-Security-Policy: script-src 'nonce-...' 'strict-dynamic'`

Modify `<script>` tags to include a _nonce_ which changes on each response.

block inline script.
nonce-based CSP

### Trusted Types

`Content-Security-Policy: trusted-types myPolicy`

- Enforce type restrictions for unsafe DOM APIs.
- Create safe types in policy functions.

## Isolation Defense

### 🤔 Why Do We Need Isolation?

#### Attacks on Resources

The attacker can make requests to your application that will be sent with your user's cookies, but will be embedded into an attacker controlled page.

#### Attacks on Windows

Open your page in their website.

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

### Fetch Metadata Request Headers

> Let the server make security decisions based on the source and context of each HTTP request.

- Reject resource requests that come from unexpected resources.
- Use the following request headers:
  - `Sec-Fetch-Site`
  - `Sec-Fetch-Mode`

### Cross-Origin Opener Policy

`Cross-Origin-Opener-Policy: same-origin`

Project your window references from being abused by other websites

```js
const w = window.open("https://victim.example.com");
w.frame.length;
w.location = "jjj";
```

## References

- [Securing Web Apps with Modern Platform Features (Google I/O ’19)](https://www.youtube.com/watch?v=DDtM9caQ97I)
- [CSP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
