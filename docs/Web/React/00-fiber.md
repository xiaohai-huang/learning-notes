---
sidebar_label: Fiber
description: "React fiber."
---

# React Fiber

Fiber is a single **unit of work** in React. And a Fiber is **work** on a Component that needs to be done or was done.

:::info

What does **work** mean?

_Ans_: When a function is invoked, a new **stack frame** is added to the call stack. The **stack frame** represents the **work** that is performed by that function.

:::

## Goal

The goals of React Fiber include the following:

- the ability to split rendering work into chunks and spread it out over multiple frames.
- the ability to pause, abort, or reuse work as new updates come in.
- the ability to assign **priority** to different types of updates. (**outdated?**).
- new concurrency primitives.

## Structure

### `FiberRootNode`

```ts title="react/packages/react-reconciler/src/ReactInternalTypes.js"
export type FiberRoot = {
  // The type of root (legacy, batched, concurrent, etc.)
  tag: RootTag; // ConcurrentRoot(createRoot()) | LegacyRoot(render())

  // Any additional information from the host associated with this root.
  containerInfo: any; // <div id="root"></div>
  // The currently active root fiber. This is the mutable root of the tree.
  current: Fiber; // A fiber with tag HostRoot.

  // A finished work-in-progress HostRoot that's ready to be committed.
  finishedWork: Fiber | null;

  // Node returned by Scheduler.scheduleCallback. Represents the next rendering
  // task that the root will work on.
  callbackNode: *;
  callbackPriority: Lane;
  eventTimes: LaneMap<number>;
  expirationTimes: LaneMap<number>;
};
```

The `FiberRootNode` is created by `ReactDOM.createRoot()`.

```jsx
const root = ReactDOM.createRoot(document.getElementById("container"));
// fiberRootNode = root._internalRoot
root.render(<App />);
// updateContainer(<App />, fiberRootNode) -> scheduleUpdateOnFiber(fiberRootNode, fiberRootNode.current)
```

### `FiberNode`

```ts title="react/packages/react-reconciler/src/ReactFiber.new.js"
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  // ConcurrentMode | BlockingMode(deprecated) | StrictLegacyMode | StrictEffectsMode
  mode: TypeOfMode
) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null; // Used in component wrapped by React.memo().
  this.type = null;
  this.stateNode = null;

  // Fiber - Singly Linked List Tree Structure
  this.return = null;
  this.child = null; // Represents the element returned when we call render() on the component.

  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null; // The state used to create the output
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags; // Placement
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // Double Buffering
  this.alternate = null;
}
```

> source code: [react/packages/react-reconciler/src/ReactFiber.new.js](https://github.com/facebook/react/blob/9e3b772b8cabbd8cadc7522ebe3dde3279e79d9e/packages/react-reconciler/src/ReactFiber.new.js#L118-L155)

### `WorkTag`

```ts title="react/packages/react-reconciler/src/ReactWorkTags.js"
export type WorkTag = 0 | 1 | 2 | 3 | 4 | ...;

export const FunctionComponent = 0; // <App /> <Button />
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostRoot = 3; // Root of a host tree. root.current
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5; // <main> <div> <span>
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
```

> source code: [react/packages/react-reconciler/src/ReactWorkTags.js](https://github.com/facebook/react/blob/v18.2.0/packages/react-reconciler/src/ReactWorkTags.js)

### `Flags`

```ts title="react/packages/react-reconciler/src/ReactFiberFlags.js"
export type Flags = number;

export const NoFlags = /*            */ 0b00000000000000000000000000;
export const PerformedWork = /*      */ 0b00000000000000000000000001;
export const Placement = /*          */ 0b00000000000000000000000010;
export const Update = /*             */ 0b00000000000000000000000100;
export const ChildDeletion = /*      */ 0b00000000000000000000001000;
export const ContentReset = /*       */ 0b00000000000000000000010000;
export const Callback = /*           */ 0b00000000000000000000100000;

export const MutationMask =
  Placement |
  Update |
  ChildDeletion |
  ContentReset |
  Ref |
  Hydrating |
  Visibility;

export const LayoutMask = Update | Callback | Ref | Visibility;
```

> source code: [react/packages/react-reconciler/src/ReactFiberFlags.js](https://github.com/facebook/react/blob/v18.2.0/packages/react-reconciler/src/ReactFiberFlags.js)

During reconciliation, use `reconcileChildren(current, workInProgress, nextChildren, renderLanes)`

- `placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes))`
- `reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes)`

to determine if the fiber need to have `Placement` | `Update` etc. flags.

During the commit phrase, use `commitMutationEffects(root, finishedWork, lanes)`

- `commitMutationEffectsOnFiber(finishedWork, root)`
  - `recursivelyTraverseMutationEffects(root, finishedWork);`
  - `commitReconciliationEffects(finishedWork)`

to flush the changes to the DOM.

## Traverse Fiber Tree

We only need to traverse the fiber tree during the render phrase.

[demo](https://stackblitz.com/edit/js-ntqfil?file=index.js)

```ts
type FiberNode = {
  name: string;
  child: FiberNode | null;
  sibling: FiberNode | null;
  return: FiberNode | null;
};
const a1: FiberNode = { name: "a1", child: null, sibling: null, return: null };
const b1: FiberNode = { name: "b1", child: null, sibling: null, return: null };
const b2: FiberNode = { name: "b2", child: null, sibling: null, return: null };
const b3: FiberNode = { name: "b3", child: null, sibling: null, return: null };
const c1: FiberNode = { name: "c1", child: null, sibling: null, return: null };
const c2: FiberNode = { name: "c2", child: null, sibling: null, return: null };
const d1: FiberNode = { name: "d1", child: null, sibling: null, return: null };
const d2: FiberNode = { name: "d2", child: null, sibling: null, return: null };

a1.child = b1;
b1.sibling = b2;
b2.sibling = b3;
b2.child = c1;
b3.child = c2;
c1.child = d1;
d1.sibling = d2;

b1.return = b2.return = b3.return = a1;
c1.return = b2;
d1.return = d2.return = c1;
c2.return = b3;

let workInProgress: FiberNode | null = a1;

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork: FiberNode) {
  console.log(`performUnitOfWork on fiber: ${unitOfWork.name}`);

  const next = beginWork(unitOfWork); // return the child

  if (next === null) {
    // If this doesn't spawn new work, complete the current work.
    // try to get to sibling
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}

function beginWork(unitOfWork: FiberNode): FiberNode | null {
  console.log(`beginWork on fiber: ${unitOfWork.name}`);

  return unitOfWork.child;
}

/**
 *  Attempt to complete the current unit of work, then move to the next
    sibling. If there are no more siblings, return to the parent fiber.
 * @param unitOfWork work
 */
function completeUnitOfWork(unitOfWork: FiberNode): void {
  console.log(`completeUnitOfWork on fiber: ${unitOfWork.name}`);

  let completedWork: FiberNode | null = unitOfWork;

  do {
    const returnFiber = completedWork.return;

    completeWork(completedWork);

    const siblingFiber = completedWork.sibling;
    if (siblingFiber !== null) {
      workInProgress = siblingFiber;
      return;
    }

    completedWork = returnFiber;
    workInProgress = completedWork;
  } while (completedWork !== null);
}

function completeWork(unitOfWork: FiberNode) {
  console.log(`completeWork on fiber: ${unitOfWork.name}`);
  return null;
}

workLoopSync();
```

```js title="base"
let root = fiber;
let node = fiber;
while (true) {
  // Do something with node
  if (node.child) {
    node = node.child;
    continue;
  }
  if (node === root) {
    return;
  }
  while (!node.sibling) {
    if (!node.return || node.return === root) {
      return;
    }
    node = node.return;
  }
  node = node.sibling;
}
```

## References

- [Source Code of React v.18.2.0](https://github.com/facebook/react/tree/v18.2.0)
- [A (Mostly) Complete Guide to React Rendering Behavior](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#measuring-react-component-rendering-performance)
- [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
- [Exploring how virtual DOM is implemented in React](https://indepth.dev/posts/1501/exploring-how-virtual-dom-is-implemented-in-react)
- [Fiber Principles: Contributing To Fiber #7942](https://github.com/facebook/react/issues/7942)
- [A deep dive into React Fiber](https://blog.logrocket.com/deep-dive-react-fiber/#how-react-fiber-work)
