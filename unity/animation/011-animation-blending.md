---
sidebar_label: Animation Blending
title: Animation Blending
description: "This page is about animation blending."
---

When you play more than one __Animation Clip__ at the same time, Unity blends them together. The result of the blend is then applied to the bindings.

Animation blending is the process of making a smooth transition between two or more animations on a single character or object. This technique is used to create more realistic and fluid movements in animations. For example, blending can be used to go from an "idle" animation to a "walk" animation.

## Animator Contoller

The __Animator Controller__ in Unity can be used to blend animations. It manages various __Animation Clips__ and the __Transitions__ between them using a State Machine. The __transitions__ between animations can be set up to create smooth blending between different animations.

### Transitions

Transitions are used to blend two animations together. They blend animation they start from into the animation they end with.

#### Exit Time

The `Exit Time` property in transition' settings represents the exact time at which the transition can take effect. This is represented in normalized time (e.g., an exit time of 0.75 means the transition will occur at the exact momemet when 75% of the animation has been completed)

#### Transition Offset

__Transition Offset__ is a setting that determines at what point in destination state's animation it will start playing after the transtion from the previous state is complete. For example, if the __Transition Offset__ is set to 0.5 (which is equivalent to 50%), then after the transition from State A to State B is complete, State B's animation will start playing from its midpoint (50% of its duration), instead of starting from the begining.

## Blend Tree

You can blend between different animations using __Blend Tree__.