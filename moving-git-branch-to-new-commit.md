---
title: "Moving a Git Branch to a Newer Commit"
description:
  'Foto de <a class="underline"  href="https://unsplash.com/es/fotos/flores-rojas-azules-y-blancas-5TK1F5VfdIk">Europeana </a> en <a class="underline" href="https://unsplash.com/es/fotos/una-pintura-en-el-techo-de-un-edificio-1rBg5YSi00c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  '
icon: "3"
pubDate: "Jul 08 2022"
heroImage: "/src/assets/euro.jpg"
---

To update your branch `initial-exploration` to point to a newer commit (`d293dsfre`) in the commit graph, you can follow these steps:

### 1. Checkout the branch

Make sure you're on the `initial-exploration` branch:

```bash
git checkout initial-exploration
```

### 2. Update the branch to the desired commit

Use the `git reset` command to move the branch pointer to the new commit (`d293dsfre`):

```bash
git reset --hard e3265da1
```

### 3. Verify the branch's new position

You can confirm that the branch now points to the desired commit by running:

```bash
git log --oneline
```

This will show you that `initial-exploration` is now at `d293dsfre`.

### Notes:

- **`--hard` Reset**: This will update both your working directory and index to match the new commit. Be cautious, as any uncommitted changes will be lost.
- If you don't want to lose uncommitted changes, you can use `--soft` instead of `--hard`, which only moves the branch pointer without modifying your working directory or index:
  ```bash
  git reset --soft d293dsfre
  ```

Alternatively, if you want to create a new branch at `d293dsfre` instead of updating `initial-exploration`, you can do:

```bash
git checkout -b new-branch-name d293dsfre
```
