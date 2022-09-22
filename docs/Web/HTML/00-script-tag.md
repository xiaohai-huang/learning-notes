---
sidebar_label: Script
description: Notes about HTML script tag. This article includes async, defer, type attributes.
---

# Script

The `<script>` tag.

## Defer

A Boolean attribute that is set to indicate a browser that the script is meant to be executed after the document has been parsed, but **before** firing `DOMContentLoaded`.

:::info

Scripts with the `defer` attribute will execute in the **order** in which they appear in the document.

:::

### Usage

In practice, `defer` is used for scripts that need the whole **DOM** and /or their **relative execution order** is important.

## Async

`async` scripts load in the background and run **when ready**.

So an `async` script is completely independent:

- `DOMContentLoaded` and `async` scripts don't wait for each other.
- Other scripts don't wait for `async` scripts, and `async` don't wait for them.

### Usage

The `async` attribute is used for independent scripts, like counters or ads. And their relative execution order does not matter.

## References

- [MDN `<script>`: The Script element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
- [Scripts: async, defer](https://javascript.info/script-async-defer)
