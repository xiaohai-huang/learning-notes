---
title: ByteDance Interview Round 3
authors: xiaohai
tags: [study, interview]
---

When we are discussing about my projects. The interviewer asked the following questions:

1. How do you achieve infinite play effect in a carousel?
2. Use JS to achieve `#id`'s scroll to element effect.
3. CSS animation.

After done talking my projects, I was asked a few questions about `Promise`, linked list, and heap sort, insertion sort.

<!-- truncate -->

## Programming Questions

Promisify `setTimeout`. Implement `wait(seconds).then(()=>{})`

```js wait.js
function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

wait(3).then(() => {
  console.log(1);
});
```

Implement a `timeout` function.

```js timeout.js
function timeout(promise, seconds) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject();
    }, seconds * 1000);

    promise.then(() => {
      clearTimeout(timer);
      resolve();
    });
  });
}

timeout(wait(3), 4)
  .then(() => {
    console.log("the p was completed within 4s");
  })
  .catch(() => {
    console.log("the p execution time exceed 4s");
  });
```

Implement a priority queue. This relates to `heap` data structure.

```js
class PQ {
  push() {}
  pop() {}
}
```

## Feedback

房产-app H5 页面，中后台

房产交易
家具

sort
场景，遍历对象，复杂数据结构 获取数据

多实践

heap sort

轮播，滚动，多总结

重新实现组件
