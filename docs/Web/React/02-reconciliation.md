---
sidebar_label: Reconciliation
description: "How does React reconcile components?"
---

# React Reconciliation Algorithm

Because React is declarative and we don't have to worry about exactly what changes on every update. For example, if we reorder a list item within a list, React will iterate over the old list and the new list and figure out how to efficiently update the UI to match the most recent list.

Those efficient updates are achieved by the **reconciliation** algorithm. The reconciliation algorithm always starts from the `FiberRootNode` fiber using one of the following [functions](https://github.com/facebook/react/blob/v18.2.0/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L1663):

```ts
const exitStatus = shouldTimeSlice
  ? renderRootConcurrent(root, lanes)
  : renderRootSync(root, lanes);
```

However, React will attempt to bail out (skip) fibers which meet the following conditions:

- `oldProps === newProps` && `workInProgress.type === current.type`
- no pending updates and context.

> [details of bail out conditions](https://github.com/facebook/react/blob/v18.2.0/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3685)

If the above conditions are all satisfied, React will invoke `bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)` on the current fiber and `beginWork` on its child.

This significantly improves the performance of the app. For example, if you call `setState` deep in the components tree, React will start from the top but quickly skip over the parents until it gets to the component that had its `setState` called.

## Two Assumptions

1. Two elements of different types will produce different trees.
2. The developer can hint at which child elements may be stable across different renders with a `key` prop.

:::note

By default, every React Element will have `key` set to `null`.

:::

## `ChildReconciler`

```ts title="ReactChildFiber.new.js"
function ChildReconciler(shouldTrackSideEffects) {}
const reconcileChildFibers = ChildReconciler(true);
const mountChildFibers = ChildReconciler(false);
```

### `reconcileSingleElement`

```ts
function reconcileSingleElement(
  returnFiber,
  currentFirstChild,
  element,
  lanes
) {}
```

- If this is a new element, mark the fiber with `Update` flag.

### `reconcileChildrenArray`

```ts
function reconcileChildrenArray(
  returnFiber,
  currentFirstChild,
  newChildren,
  lanes
) {}
```

This determines if the orders, insertions, deletions of elements in the children array.

## References

- [ReactChildFiber.new.js](https://github.com/facebook/react/blob/v18.2.0/packages/react-reconciler/src/ReactChildFiber.new.js)
- [Reconciliation | React docs](https://reactjs.org/docs/reconciliation.html)
- [Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react)
