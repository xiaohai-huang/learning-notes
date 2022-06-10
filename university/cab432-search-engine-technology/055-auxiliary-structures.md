---
sidebar_label: Auxiliary Structures
description: "Inverted lists usually stored together in a single file for efficiency."
---

# Auxiliary Structures

> The inverted file is the primary data structure in a search engine, but usually other structures are necessary for a fully functional system.

An inverted file is just a collection of **inverted lists**.

## Vocabulary or Lexicon

- Contains a lookup table from index terms to the byte offset of the inverted list in the inverted file.

## Statistics

To compute some feature functions, the index needs to contain certain vocabulary statistics, such as the term frequency or document frequency.

When these statistics pertain to **a specific term**, they can be stored at the _start_ of the inverted list.

Collection statistics can be stored in a separate file.
