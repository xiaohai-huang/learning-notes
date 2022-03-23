---
sidebar_label: Bits
title: Bits
description: "notes about bit strings, bit operations, bit-wise operations, bit manipulation."
---

> The bit is the most basic unit of information in computing and digital communications. The name is a portmanteau of **binary digit** (bit).

> The bit represents a logical state with one of _two_ possible values. These values are most commonly represented as either "1" or "0".

- A bit is something that has 2 states.
- Usually we label the 2 states as "0" and "1'.
- A bit is a mathematical object used to model some real world property.

## Bit String

Bits are small. So we usually use many bits together in **strings**.

Examples of bit strings:

- 0
- 0000
- 101011101110
- 11111111

The **length** of a bit string is the number of symbols.

### Notation

$\bar{x}$ is used to indicate a string. (bar)

The *j*th bit in $\bar{x}$ is $\bar{x}_j$ (j starts at 0)
The bit at index 0 of a bit string, is the rightmost bit. In most situations, We count from the **right**.

The set of all strings of length $n$ is $\{0, 1\}^n$ (also called n-bit strings).

### Number of n-bit Strings

How many different **bit strings** of length $n$ are there?

Ans: There will be $2^n$ possible bit strings of length $n$.

:::note

Explanation:

| Length  | Number of Bit Strings | Bit Strings                      |
| ------- | :-------------------: | -------------------------------- |
| $n = 1$ |           2           | 0,1                              |
| $n = 2$ |           4           | 00,01, 10,11                     |
| $n = 3$ |           8           | 000,001,010,011, 100,101,110,111 |
| $n = 4$ |          16           |                                  |

- For $\bar{x}_0$, there are 2 choices.
- For each choice of $\bar{x}_0$, there are 2 choices for $\bar{x}_1$. 4 in total.
- For each choice of $\bar{x}_0\bar{x}_1$, there are 2 choices for $\bar{x}_2$. So in total, there are $4 \times 2 = 8$ choices. Each choice will generate 2 extra new choices.

:::

## Bit Operations

Two types of bit operations:

- Operations on a single bit or pairs of bits. (bit-wise operation)
- Operations on bit strings. (bit shift)

### Operators

An **operator** or **operation** is a mathematical object that transforms other objects.

Examples of operators:

- $+$ is a binary operator (transforms two objects)
- $-$ stands for two different operators (**operator overload**):
  - binary operator (transforms two object), $-$ is subtraction.
  - unary operator (transforms one object), $-$ is negation.

### NOT

NOT flips a bit: 0 becomes 1. 1 becomes 0.

|  x  | ~x  |
| :-: | :-: |
|  1  |  0  |
|  0  |  1  |

### AND

AND is like multiplication.

|  x  |  y  | x&y |
| :-: | :-: | :-: |
|  0  |  0  |  0  |
|  0  |  1  |  0  |
|  1  |  0  |  0  |
|  1  |  1  |  1  |

### OR

OR is like addition.

|  x  |  y  | x \| y |
| :-: | :-: | :----: |
|  0  |  0  |   0    |
|  0  |  1  |   1    |
|  1  |  0  |   1    |
|  1  |  1  |   1    |

### XOR

If both of the operands are the same, then it is `false`. Otherwise, it is `true`.

|  x  |  y  | x ^ y |
| :-: | :-: | :---: |
|  0  |  0  |   0   |
|  0  |  1  |   1   |
|  1  |  0  |   1   |
|  1  |  1  |   0   |

### Bit-wise Operations

We can apply bit operations ([NOT](#not), [AND](#and), [OR](#or), and [XOR](#xor)) bit-wise to strings of the same length.

Example:

$$
\bar{z} = \bar{x} \& \bar{y} \implies \bar{z}_j = \bar{x}_j \& \bar{y}_j
$$

Operations are performed on pairs of bits.

### Bit Shifts

We can move bits around in a string.

#### Left Shift

Left shift by `m` bits means drops the leftmost `m` bits and adds `m` 0's on the right.

$$
011010 << 1 = 110100 \\
100001 << 3 = 001000
$$

#### Right Shift

Right shift by `m` bits means drops the rightmost `m` bits and adds `m` 0's on the left.

$$
011011 >> 1 = 001101 \\
100000 >> 3 = 000100
$$

### Bit Manipulation

Most CPUs work on 8, 32, or 64 bits at a time rather than individual bits. In order to work on a group of bits, we need to use bit-wise operations and **bitmask**.

Here are some examples of bit manipulations that we can do:

- Turn on bits (set the bit to 1)
- Turn off bits (set the bit to 0)
- Flip bits (NOT the bit), aka **toggle** the bit
- Test if a bit is 0

A **bitmask** can be used to manipulate groups of bits.

A 4 bit string, $\bar{x} = 1100$. Mask for bits 0 and 2: $\bar{mask} = 0101$

| Task                                 |             Formula             | Answer |
| ------------------------------------ | :-----------------------------: | :----: |
| Turn on bits 0 and 2                 |   $\bar{x} \vert \bar{mask}$    |  1101  |
| Turn off bits 0 and 2                | $\bar{x} \& (\lnot \bar{mask})$ |  1000  |
| Turn of all bits except bits 0 and 2 |     $\bar{x} \& \bar{mask}$     |  0100  |
| Toggle bits 0 and 2                  |   $\bar{x} \oplus \bar{mask}$   |  1001  |
| **Test if bit 2 is on **             | `is_on = ( x & (1 << 2) ) != 0` |  True  |

## Python

`0b` is the prefix for binary constants.

`bin(num)` returns the binary representation of an integer as a string.

```python title="bit strings and bit operations"
>>> help(bin) # Return the binary representation of an integer.
>>> bin(2796202)
'0b1010101010101010101010'
>>> bin(0b1100)
'0b1100'

>>> bin(0b1100 & 0b1010) # AND
'0b1000'

>>> bin(0b1100 | 0b1010) # OR
'0b1110'

>>> bin(0b1100 ^ 0b1010) # XOR
'0b110'

>>> bin(~0b1100) # NOT all bits
'-0b1101'
```

```python title="bit mask"
x = 0

# create a mask for bit 0 and 2
mask = (1 << 0) | (1 << 2) # `0b101'

# flip/toggle bit 0 and 2
x = x ^ mask # x == 0b101

# flip/toggle again
x = x ^ mask # x == 0b0

# turn off bit 0 and 2
x = x & (~mask) # x == 0b0

# turn on bit 0 and 2
x = x | mask # x == 0b101

# test if bit 2 is 0
mask_for_bit_2 = 1 << 2
is_on = (x & mask_for_bit_2) != 0
```
