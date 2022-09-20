---
description: Introduction to the reflow and repaint.
---

# Reflow and Repaint

How the browser renders the document?

1. Receives the data (bytes) from the server.
1. Parses and converts into tokens (<, TagName, Attribute, AttributeValue, >).
1. Turns tokens into nodes.
1. Turns nodes into the DOM tree.
1. Builds CSSOM tree from the `css rules`.
1. CSSOM and DOM trees are combined into a **Render Tree**.
   - Computes which elements are visible and their computed styles.
   - Starting from the root of the dom tree.
   - Not visible elements like (`meta`, `script`, `link`) and `display: none` are omitted from the render tree.
   - For each visible node, find the appropriate matching CSSOM rules and apply them.

## Repaint

Occurs when changes affect the visibility. For example, `opacity`, `color`(the alpha channel), `background-color`, `visibility`.

## Reflow (Layout)

- Occurs when the changes affect the layout.
- Triggers: `width`, `position`, `float`, change DOM, scrolling.
- Recalculate of positions and sizes.
- Has a **bigger** impact, changing a single element can affect all children, ancestors, and siblings or the whole document.

## Minimizing Repaints and Reflows

- Batch DOM changes
- Don't ask for computed styles repeatedly, cache them into variable.
- Use ID-Based Selectors.

## References

- [DOM Performance](https://gist.github.com/faressoft/36cdd64faae21ed22948b458e6bf04d5)
