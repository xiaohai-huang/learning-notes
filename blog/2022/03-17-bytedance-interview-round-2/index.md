---
title: ByteDance Interview Round 2
authors: xiaohai
tags: [study, interview]
---

- **React fiber**
- Event loop
  - why do we need two **task queues**? (priority)
- CSS animation vs. JS animation
- Some questions about CSS animation
- How Does JS Achieve Async?
- CSS Grid
- CSS Float
- Depth First Search
- Prototype

<!-- truncate -->

## Coding Questions

```js title="event loop question"
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");
```

```js title="prototype question"
function Foo() {
  try {
    console.log(this);
    console.log("内部1", this.a());
  } catch (e) {}

  this.a = function () {
    console.log("内部2", 1);
  };

  Foo.a = function () {
    console.log("内部3", 2);
  };
  return Foo;
}

Foo.a = function () {
  console.log("外部", 4);
};
Foo.prototype.a = function () {
  console.log("外部5", 5);
};

Foo.a();

const obj = new Foo();

obj.a();
Foo.a();
```

```bash title="Algorithm"
给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
全排列：从 n 个不同元素中任取 m（m≤n）个元素，按照一定的顺序排列起来，
叫做从 n 个不同元素中取出 m 个元素的一个排列。当 m=n 时所有的排列情况叫全排列。

示例 1:
输入：nums = [1,2]
输出：
[[1,2],
 [2,1]]
示例 2:
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
示例 3:
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```
