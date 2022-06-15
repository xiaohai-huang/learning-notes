---
sidebar_label: Problem Solving Assignment
description: "Assignment3 report"
---

# Problem Solving Assignment

In this assignment, I choose "Regular languages and finite state automata" and "Linear algebra".

## Regular Languages and Finite State Automata

<!-- For your report, write a short introduction to the regular expressions and functions that you use in your function. You may assume that the reader has knowledge of the material from CAB203. -->

### Regular Expression

The **regular expression** used in the `censor` function is `\b(the|a|an)\b`.

Firstly, a capturing group `()` is used to capture articles in the string. `(the|a|an)` creates a single group containing one of three words. The will be useful when performing substitutions.

Secondly, according to [RegExp.info](https://www.regular-expressions.info/wordboundaries.html), `\b` matches at a position that is called a "word boundary". Place `\b` around the word like this `\bword\b` allows you to perform a "whole word only" search. So, in order to match all articles (i.e., the, a, an), I place these articles inside `\b` like this `\b(the|a|an)\b`.

### Regular Expression Functions

**Regular expression functions** used in `censor` include `re.compile` and `pattern.sub`.

```python
pattern = re.compile(r"\b(the|a|an)\b", flags=re.IGNORECASE)
```

The `re.compile` function is used to compile a regular expression into a regex pattern object. We can modify the expression's behavior by setting the `flags` parameter. In this case, I set the `re.IGNORECASE` flag on. It is used for performing case-insensitive matching. So that all occurrences of a, an, the regardless of capitalization can be matched.

```python
def replace_with_hash(match):
    return "#" * len(match.group())
replaced = pattern.sub(replace_with_hash, s)
```

`pattern.sub` accepts two arguments. The first argument I pass is a replacement function which can perform dynamic replacements based on the length of the matched _article_. The second argument is the string to be processed.

### Solution

This section describes how the functions and syntax are used in solving the problem.

Firstly, compile the regular expression `\b(the|a|an)\b` with `re.IGNORECASE` flag set into a pattern. Secondly use the pattern object to substitute all the articles with #. Finally, if the substituted string is the different from the input string (replacement has been made), then append the student ID to the substituted string.

## Linear Algebra

<!-- Your report should provide a mathematical description of how you solved the problem, including any equations that you use and your method of solving them. You may assume that the reader is familiar with the material in CAB203 -->

The problem can be modeled as 2 linear equations with 2 unknowns.

- $an$ is the amount of nitrogen in 1kg of type A fertiliser
- $ap$ is the amount of phosphate in 1kg of type A fertiliser
- $bn$ is the amount of nitrogen in 1kg of type B fertiliser
- $bp$ is the amount of phosphate in 1kg of type B fertiliser
- $n$ is the amount of nitrogen required by the crop
- $p$ is the amount of phosphate required by the crop
- $a$ is the amount of type A fertiliser required
- $b$ is the amount of type B fertiliser required

We want to solve the following two linear equations. $a$ and $b$ are the unknowns.

$$
\begin{aligned}
an \times a + bn \times b &= n \\
ap \times a + bp \times b &= p
\end{aligned}
$$

For $a$ and $b$. We can represent these two equations in vectors.

$$
\begin{pmatrix}
an & bn\\
ap & bp
\end{pmatrix}

\begin{pmatrix}
a\\
b
\end{pmatrix}
=
\begin{pmatrix}
n\\
p
\end{pmatrix}
$$

Then $a$ and $b$ can be solved by finding the inverse of the matrix and multiply it with $\begin{pmatrix}
n\\
p
\end{pmatrix}$

$$
\begin{pmatrix}
a\\
b
\end{pmatrix}
=

\begin{pmatrix}
an & bn\\
ap & bp
\end{pmatrix}^{-1}

\begin{pmatrix}
n\\
p
\end{pmatrix}
$$

Note: If $\det \begin{pmatrix}
an & bn\\
ap & bp
\end{pmatrix}=0$, then it will not have an inverse (a singular matrix). So there is no solution to the problem.

Secondly, because the farmer cannot add a negative amount of fertiliser, so if $a$ or $b$ is negative then that is not considered as a solution.

## References

Goyvaerts, J. (2022). Regex Tutorial - \b Word Boundaries. Regular-expressions.info. Retrieved 15 June 2022, from https://www.regular-expressions.info/wordboundaries.html

Python Docs. (2022). re — Regular expression operations — Python 3.10.5 documentation. Docs.python.org. Retrieved 15 June 2022, from https://docs.python.org/3/library/re.html.
