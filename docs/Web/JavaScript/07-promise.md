---
sidebar_label: Promise
description: Notes about JavaScript promise.
---

# Promise

A **Promise** is an object representing the eventual ✅*completion* or ❌*failure* of an asynchronous operation. It allows you to attach handlers (`onfulfilled`, `onrejected`) via `.then()` to the object to deal with the eventual **success** value or **failure** reason.

## Three States

A `Promise` is in one of these 3 states:

- ⏳️ _pending_: initial state and it is neither fulfilled nor rejected.
- ✅ _fulfilled_: meaning that the async operation was completed successfully.
- ❌ _rejected_: meaning that the async operation failed.

A promise is said to be **_settled_** if it is either ✅fulfilled or ❌rejected, but not ⏳️*pending* (Being **_settled_** is not a state, just a linguistic convenience).

:::info

"resolved" promises are often equivalent to "fulfilled" promises.

:::

## Constructor

`new Promise(executor)`

## Static Methods

- [`Promise.resolve()`](#resolve)
- [`Promise.reject()`](#reject)

There are 4 static methods that take an _iterable_ of **promises** and return a new promise.

- [`Promise.all()`](#all)
- [`Promise.allSettled()`](#allSettled)
- [`Promise.any()`](#any)
- [`Promise.race()`](#race)

### `Promise.all()` {#all}

### `Promise.allSettled()` {#allSettled}

### `Promise.any()` {#any}

### `Promise.race()` {#race}

### `Promise.resolve()` {#resolve}

### `Promise.reject()` {#reject}

## Instance Methods

### `Promise.prototype.then()`

### `Promise.prototype.catch()`

### `Promise.prototype.finally()`

## Examples

## References

- [Promise | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Using Promises | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
