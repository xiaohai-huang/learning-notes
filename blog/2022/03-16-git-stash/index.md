---
title: How to Use git stash?
authors: xiaohai
tags: [study, git]
---

git stash with a stash name.

```bash
git stash push -m "stash_name"
```

stash untracked files

```bash
git stash push -u -m "stash_name"
git stash push --include-untracked -m "stash_name"
```

<!-- truncate -->

show stash list

```bash
xiaohai@DESKTOP-CO17DMM:~/projects/learning-notes$ git stash list
stash@{0}: On search-engine-week1: search-engine-notes
stash@{1}: On AI-week1: AI-week1-stash
```

apply stash through index

```bash
git stash apply stash@{1}
```

delete a stash

```bash
git stash drop            # drop top hash, stash@{0}
git stash drop stash@{n}  # drop specific stash - see git stash list
```

## References

- [stack overflow](https://stackoverflow.com/a/49559472)
- [official document](https://git-scm.com/docs/git-stash)
