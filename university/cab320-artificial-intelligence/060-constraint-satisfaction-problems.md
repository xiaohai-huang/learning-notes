---
sidebar_label: Constraint Satisfaction Problems
title: Constraint Satisfaction Problems (CSPs)
description: "Constraint Satisfaction Problems (CSP) are a special case of search problems where each state is a partial assignment of values to a set of variables. These assignments are subjected to a number of constraints. Many practical applications like resources allocation and timetabling can be expressed as CSP."
---

A constraint satisfaction problem consists of three components, $\chi$, $D$, and $C$:

- $\chi$ is a set of variables, $\{X_1, \dots, X_n\}$.
- $D$ is a set of domains, $\{D_1, \dots, D_n\}$, one for each variable.
- $C$ is a set of constraints that specify allowable values.

## Domain

A domain, $D_i$ consists of a set of allowable values, $\{v_1, \dots, v_k \}$, for variable $X_i$.

For example, a Boolean variable would have the domain $\{true, false\}$. So different variables can have different domains of different sizes.

## Constraint

Each constraint $C_j$ consists of a pair <scope, relation>

- _scope_ is a tuple of variables that participate in the constraint.
- **rel** is a **[relation](../cab203-discrete-structure/060-relations.mdx#relations)** that defines the values that those variables can take on.

:::tip

A relation can be represented as an **explicit set** of all tuples of values that satisfy the constraint.

Or as a **function** that can compute whether a tuple is a member of the relation.

:::

:::note Example

If $X_1$ and $X_2$ both have the domain $\{1,2,3\}$, then the constraint saying that $X_1$ must be greater than $X_2$ can be written as

$$

\{(X_1,X_2), \{(3,1), (3,2), (2,1) \} \} \\

\text{or} \\

\{ (X_1, X_2), X_1 > X_2  \}


$$

:::

### Unary Constraint

The simplest type of constraints is the **unary constraitn**, which restricts the value of _a single variable_.

:::note Example

In the map-coloring problem, if South Australians won't tolerate the color `green`; we can express that with the **unary constraint** <(SA), $SA \not = green$>

:::

### Binary Constraint

A **binary constraint** relates **two** variables. For example, $SA \not = NSW$ is a binary constraint.

:::info

A **binary CSP** is one with only unary and binary constraints; it can be represented as a [constraint graph](06-map-coloring.md), as in map-coloring example.

:::

### Global Constraint

A constraint involving an _arbitrary_ number of variables is called a **global constraint**. One of the most common global constraints is $Alldiff$, which says that all of the variables involved in the constraint must have different values. e.g. $Alldiff(F,T,U,W,R,O)$

### Preference Constraint

The constraints we have described so far have all been absolute constraints, the violation of these constraints is not allowed.

Many real-world CSPs include **preference constraints** indicating which solutions are preferred.

:::note Example

In a university class-scheduling problem, there are **absolute constraints** that no professor can teach two classes at the same time. But we may allow **preference constraints**: Prof. R might prefer teaching in the morning, whereas Prof. N prefers teaching in the afternoon.

:::

Preference constraints can often be encoded as **costs** on individual variable assignments.

:::note Example

Assigning an afternoon slot for Prof. R costs 2 points against the overall objective function, whereas a morning slot costs 1.

:::

## Assignment

CSPs deal with **assignments** of values to variables, $\{X_i=v_i, X_j = v_j, \dots \}$.

### Consistent Assignment

An assignment that does not violate any constraints is called a **consistent** or legal assignment.

### Complete Assignment

A **complete** assignment is one in which every variable is assigned a value.

### Solution

A **solution** to a **CSP** is a _consistent_, _complete_ assignment.

### Partial Assignment

A **partial assignment** is one that leaves some variables unassigned.

:::info

A **partial solution** is a _partial assignment_ that is consistent.

:::

## References

- Section 5.1 Textbook
