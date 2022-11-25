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

The `Promise.all()` method takes an iterable of promises as input and returns a single `Promise`:

- ✅ This returned `Promise` **already** _fulfills_, if the `iterable` passed is empty.
- ✅ This returned `Promise` **asynchronously** _fulfills_ when all of the input promises fulfill, with an array of fulfilled values, in the **order** of the promises passed, regardless of completion order.
- ❌ This returned `Promise` **asynchronously** _rejects_ immediately when any of the input promises rejects, with this **first rejection reason**. This is also known as "Fail-Fast".

#### Implementation

:::caution

`Promise.all` resolves **synchronously** if and only if the `iterable` passed is empty `[]`. In other situations, the returned `Promise` will be _asynchronously_ fulfilled or _asynchronously_ rejected.

```js
const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

const p = Promise.all(resolvedPromisesArray);
// Immediately logging the value of p
// highlight-next-line
console.log(p); //  Promise { <state>: "pending" }

// Using setTimeout, we can execute code after the queue is empty
setTimeout(() => {
  console.log("the queue is now empty");
  // highlight-next-line
  console.log(p); // Promise { <state>: "fulfilled", <value>: Array[2] }
});
```

:::

```js
function all(promises) {
  // `Promise.all` resolves synchronously if and only if the iterable passed is empty
  if (promises.length === 0) return Promise.resolve(promises);

  // return a single `Promise`
  return new Promise((resolve, reject) => {
    // fulfill with an array of fulfilled values
    const result = [];

    promises.forEach((promise, i) => {
      if (promise instanceof Promise) {
        promise.then(
          (value) => {
            // the fulfilled value is in the order of the promises passed
            result[i] = value;
            // fulfill the promise when all the promises fulfill
            if (result.length === promises.length) resolve(result);
          },
          (reason) => {
            // reject immediately, when any of the promises rejects
            reject(reason);
          }
        );
      } else {
        // if the iterable contains non-promise values,
        // they will still be included in the returned promise array
        // as if the promise is fulfilled
        result[i] = promise;
        if (result.length === promises.length) resolve(result);
      }
    });
  });
}
```

:::note

The implementation above does not satisfy the asynchronously fulfilled/rejected requirement.

:::

### `Promise.allSettled()` {#allSettled}

The `Promise.allSettled()` method takes an `iterable` of promises as input and returns a single `Promise`:

- ✅ This returned `Promise` **already** _fulfills_, if the `iterable` passed is empty.
- ✅ This returned `Promise` **asynchronously** _fulfills_ when all of the input promises settle.
- ✅ This returned `Promise` **WILL NOT REJECT**.

This method is used:

- when you have multiple asynchronous tasks that are not dependent on each other to complete.
- Or you want to know the result of each promise.

```js
const promises = [
  Promise.resolve(2),
  new Promise((resolve) => setTimeout(() => resolve(233))),
  Promise.reject(new Error("The reason is that I want it to fail")),
  "niu b",
];

Promise.allSettled(promises).then((values) => console.log(values));
/*
[
    {
        "status": "fulfilled",
        "value": 2
    },
    {
        "status": "fulfilled",
        "value": 233
    },
    {
        "status": "rejected",
        "reason": new Error("The reason is that I want it to fail")
    },
    {
        "status": "fulfilled",
        "value": "niu b"
    }
]
*/
```

### `Promise.any()` {#any}

The `Promise.any()` method takes an `iterable` of promises as input and returns a single `Promise`:

- ❌ This returned `Promise` **synchronously** _rejects_ when the input array is empty `[]`.
- ✅ This returned `Promise` **asynchronously** _fulfills_ when **ANY** of the input promises ✅ fulfills.
- ❌ This returned `Promise` **asynchronously** _rejects_ when **ALL** of the input promises ❌ reject, with an [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) containing an array of rejection reasons in `e.errors` field.

> This method is useful for returning the **FIRST** promise that fulfills. It **short-circuits** after a promise fulfills, so it does not wait for the other promises to complete once it finds one.

In short, `Promise.any()` takes the first fulfilled `Promise`.

:::note

Unlike `Promise.all()` and `Promise.allSettled()`, which returns an array, `Promise.any()` only return **one** fulfilled value (assuming at least one promise fulfills).

:::

#### Implementation

```js
function any(promises) {
  if (promises.length === 0)
    return Promise.reject(new AggregateError("Empty input."));
  const errors = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((value) => {
          resolve(value);
        })
        .catch((reason) => {
          errors.push(reason);
          if (errors.length === promises.length)
            reject(new AggregateError(errors, "All promises were rejected"));
        });
    });
  });
}
```

### `Promise.race()` {#race}

The `Promise.race()` method takes an `iterable` of promises as input and returns a single `Promise`:

- ⏳️ This returned `Promise` remains pending ♾️ forever if the `iterable` passed is empty `[]`.
- ✅ This returned `Promise` asynchronously _fulfills_ if the first promise to settle is fulfilled.
- ❌ This returned `Promise` asynchronously _rejects_ if the first promise to settle is rejected.

The method is used when you want the first async task to complete, but do not care about its eventual state (i.e. it can either `fulfilled` or `rejected`).

In short, `Promise.race()` takes the first settled `Promise`.

:::note

Unlike `Promise.all()` and `Promise.allSettled()`, which returns an array, `Promise.race()` only return **one** fulfilled value (assuming the first promise to settle is fulfilled).

:::

:::info

`Promise.race()` is always asynchronous: it never settles synchronously, even when the input is empty `[]`.

:::

#### Use Cases

##### Using `Promise.race()` to Implement Request Timeout

```js
const data = Promise.race([
  fetch("/api"),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), 5000)
  ),
])
  .then((res) => res.json())
  .catch((err) => console.log(err));
```

- If the `data` promise fulfills, it will contain the data fetched from `/api`.
- Otherwise, it will reject if the `fetch` operation takes more than 5 seconds because it loses the **race** with the `setTimeout` timer.

##### Using `Promise.race()` to Detect the State of a Promise

```js
function getPromiseState(promise) {
  const obj = {};
  return Promise.race([promise, obj])
    .then((value) => (value === obj ? "pending" : "fulfilled"))
    .catch(() => {
      return "rejected";
    });
}
```

adapted from [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race#using_promise.race_to_detect_the_status_of_a_promise)

- If the `promise` is pending, the second value, `obj`, which is a non-promise, becomes the result of the **race**.
- If the `promise` is already fulfilled, the `value` becomes the fulfilled value of the `promise`.
- If the `promise` is already rejected, the `onrejected` callback will be invoked.

:::note

The `getPromiseState` function still runs asynchronously, because there is no way to get a promise's value without `.then` or `await`, even when it is already settled.

:::

### `Promise.resolve()` {#resolve}

The `Promise.resolve()` method can take three types of input.

- If the input is a `Promise`, that promise is returned.
- If the input is a `thenable`, `Promise.resolve()` will call the `then()` method with two callbacks it prepared.
- Otherwise, returns a `Promise` fulfilled with the input. (i.e. `Promise.resolve(5)`)

#### Resolving Another Promise

```js
const originalPromise = Promise.resolve(233);
const newPromise = Promise.resolve(originalPromise);

newPromise.then((v) => console.log(v)); // 233
console.log(originalPromise === newPromise); // true
```

#### Resolving Thenable

```js
const obj = {
  then(onfulfilled, onrejected) {
    console.log("inside then method");
    onfulfilled("6666");
  },
};

const p = Promise.resolve(obj); // cast thenable to promise
console.log(p); // p is an instance of Promise
p.then((v) => console.log(v));
```

### `Promise.reject()` {#reject}

The `Promise.reject()` method returns a `Promise` object that is rejected with a given reason.

It is useful to make `reason` an instance of `Error`.

## Instance Methods

### `Promise.prototype.then()`

### `Promise.prototype.catch()`

### `Promise.prototype.finally()`

## Examples

## References

- [Promise | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Using Promises | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
