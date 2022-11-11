---
sidebar_label: Prototype
description: JavaScript prototype notes.
---

# Prototype

Every object has a built-in property, which is `prototype`. The `prototype` itself is an object, so the prototype will have its own prototype, making what's called a **prototype chain**.

The prototype chain ends when we reach a prototype that has `null` for its own prototype.

:::note

The standard way to access an object's prototype is `Object.getPrototypeOf(obj)` method.

:::

## Prototype Chain

When you try to access a property of an object:

- If the property cannot be found on the object **itself**, the prototype is searched for the property.
- If the property still cannot be found, the **prototype's prototype** is searched, and so on.
- If the **end** of the **prototype chain** is reached, the property still cannot be found, in this case `undefined` is returned.

Let's illustrate the above steps using a concrete example.

```js
const person = {
  name: "dan",
  sayHello() {
    console.log(`Hello mate, my name is ${this.name}`);
  },
};

person.sayHello();
console.log(person.toString());
```

When we call `person.toString()`, the JS engine

1. Looks for `toString` in `person` object.
2. Cannot find it, so looks in the **prototype** of `person` for `toString`.
3. Finds `toString` in person's **prototype**, which is `Object.prototype` and calls it.

## Setting a Prototype

There are many ways of setting an object's prototype in JS.

- `Object.create(obj)`
- constructor

### `Object.create`

The `Object.create` method creates a new object and allows you to specify an object that will be used as the new object's prototype.

```js
const personPrototype = {
  sayHello() {
    console.log(`Hello mate, my name is ${this.name}`);
  },
};

const p = Object.create(personPrototype);
p.name = "xiaohai";

p.sayHello();
```

The above code create a object with `personPrototype` as its prototype. We are able to call `sayHello()` on the new object because the prototype provides the its implementation.

### Constructor

In JS, all functions have a property called `prototype`. When you call a function as a constructor, this property (`prototype`) is set as the prototype of the newly constructed object. (`obj.__proto__`)

```js
const personPrototype = {
  sayHello() {
    console.log(`Hello mate, my name is ${this.name}`);
  },
};

function Person(name) {
  this.name = name;
}
console.log(Person.prototype);

Object.assign(Person.prototype, personPrototype);
console.log(Person.prototype);

const p = new Person("dan=dan");
p.sayHello();
Object.getPrototypeOf(p) === personPrototype;
```

:::note

`Object.assign` is used to preserve the `Person.prototype.constructor` property.

The behavior of `instanceof` is controlled by `Symbol.hasInstance`, not constructor:

```js
const arr = [];
arr.constructor = String;
arr instanceof String; // false
arr instanceof Array; // true
```

:::

#### Own Property

The `p` object created above has 2 properties:

1. a `name` property, which is set in the constructor, so it appears directly on the object.
2. a `sayHello` property, which is set in the prototype.

**Properties** that are defined directly in the object, like `name` here, are called **own properties**. We can check if a property is an **own property** using `Object.hasOwn(obj, prop)`.

```js
const p = new Person("xiaohai");

console.log(Object.hasOwn(p, "name")); // true
console.log(Object.hasOwn(p, "sayHello")); // false
```

## Inheritance

## References
