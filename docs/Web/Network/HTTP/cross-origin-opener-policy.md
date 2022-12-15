# Cross-Origin-Opener-Policy

`Cross-Origin-Opener-Policy: same-origin`

Protect your window references from being abused by other websites

```js
const w = window.open("https://victim.example.com");
w.frame.length;
w.location = "jjj";
```

If a cross-origin document with COOP is opened in a new window, the opening document will not have a reference to the new window.
