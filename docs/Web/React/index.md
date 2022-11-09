# React

A JavaScript library for building user interfaces.

The notes are based on React `v18.2.0`.

## Phrases

```ts
// root === FiberRootNode
function performConcurrentWorkOnRoot(root) {
  // Render phrase
  const existStatus = renderRoot(root);
  const finishedWork = root.current.alternate;
  root.finishedWork = finishedWork;
  // The render completed.

  // Commit phrase
  commitRoot(root);
}
```

## References

- [Source Code of React v.18.2.0](https://github.com/facebook/react/tree/v18.2.0)
