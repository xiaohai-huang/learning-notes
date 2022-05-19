---
sidebar_label: Functions
title: Functions
description: "Week 6: Functions"
toc_max_heading_level: 4
---

A function is a relation $f$ between $A$ and $B$ where for each $a \in A$ there is a **exactly one** $b \in B$ such that $(a,b) \in f$. In other words:

$$
((a,b) \in f \land (a,c) \in f) \mapsto b = c \\
\forall a \in A \exists !b \in B (a,b) \in f
$$

We write

$$
f : A \mapsto B
$$

## Domain & Range

For a function $f : A \mapsto B$, $A$ is the **domain** of $f$ and $B$ is the **co-domain**.

The set $\{f(x): x \in A \}$ is the **range** of $f$.

:::tip

- $A$ is the possible inputs of $f$
- $B$ is the return type of $f$
- **range** is the all possible outputs from $f$

:::

### Domain Problem

Consider the function $f(x) = \frac{1}{x}$, $f$ is not defined for $x=0$, but we still call it a function with domain $\mathbb{R} \setminus \{0\}$

$$
f : \mathbb{R} \setminus \{0\} \mapsto \mathbb{R}
$$

## Function Examples

- $\{(1, \pi), (2, \beta), (3,\gamma)\}$
- $\{(1, \pi), (2, \pi), (3,\pi)\}$
- $\{(a,b) \in \mathbb{R}^2 : b = a^2 \}$

## Non-Math Function Examples

- $f(x)$ - input a student number, output the last name of the QUT student
- $f(x)$ - input a bit string $x$, output the MD5 hash of the bit string.

## Non-Function Examples

:::danger

- $\{(1, \pi), (1, \gamma)\}$
- $\{(a,b) \in \mathbb{R}^2 : a = b^2 \}$
  - let $a=4$, then $b$ could be 2 or -2.
- $\leq, \geq$

:::

## Composing Functions

Suppose we have $f : A \mapsto B$, $g : B \mapsto C$. Then we can define:

$$
(g \circ f)(x) = g(f(x))
$$

This is called $g$ of $f$ of $x$.

## Inverse Function

Some functions have a partner, called its **inverse**. Give $f : A \mapsto B$, the inverse $f^{-1} : B \mapsto A$ is a function such that:

$$
\forall x \in A (f^{-1} \circ f(x) = x )
$$

:::note

- The range of $f$ must match the domain of $f^{-1}$
- The domain of $f$ must match the range of $f^{-1}$

:::

Not all functions have inverses. For example, $f(x) = 0$ has no inverse.

## Functions in Python

Python has its own notion of what a function is, and it isn't the same!

However, Functions in Python that are _side-effect free_ and _deterministic_ are also functions in the mathematical sense.

:::note

What is side-effect?

- modify the state of the program (including I/O).

What is a deterministic function?

- **Deterministic** means that there is no randomness.

:::

### Function Examples in Python

```python
# function in the mathematical sense
def f(x):
    return x + 1

x = 10
# modifies state, not a function in mathematical sense
def changeX():
    global x
    x += 1

# not deterministic, not a function in mathematical sense
import random
def rand():
    return random.randint(1,6)
```

## Partial Functions

A partial function $f$ from a set $A$ to a set $B$ is a function from a subset of $A$ to $B$.

In terms of relation, partial function $f$ contains at most one pair (a,b) for every $a \in A$. This is different from a function which requires exactly one pair.

Dictionaries as Partial Functions

## References

- [QUT Materials](https://github.com/xiaohai-huang/resources/tree/master/QUT/Discrete-Structure/week6)
