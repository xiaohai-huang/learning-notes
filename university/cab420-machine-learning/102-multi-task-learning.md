---
sidebar_label: Multi-Task Learning
description: Multiple outputs from a deep neural network.
---

# Multi-Task Learning

The same network can usually do different things, we just need to change the output shape and/or loss.

## Pros and Cons

**Pros**

- Usually has a low overhead
  - Can just append a couple of extra layers to get another output
  - Cheaper than having a network for each task
- Usually helps learning
  - One task helps to regularize the other
  - Particularly if tasks are **related**

**Cons**

- We now need two sets of labels

## Loss Weights

We can change the loss weights to help the network consider all tasks differently.

This can be achieved by providing a list or dict of loss weights to the compile command when we build the model.

```python
model_cnn.compile(loss=['mean_squared_error', keras.losses.SparseCategoricalCrossentropy(from_logits=True)],
                  loss_weights=[1, 100],
```
