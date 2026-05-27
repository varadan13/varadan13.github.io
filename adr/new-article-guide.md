# New Article Guide

## Steps to create a new article

**Step 1 — Create the content partial**

Create `contents/[your-slug].html` — article body only, no HTML shell:

```html
<div class="container">
  <h1>Your Article Title</h1>

  <p>...</p>
</div>
```

**Step 2 — Create the article page**

Copy `articles/aws-iam-role-trust-policy-vs-permissions-policy-explained.html` to `articles/[your-slug].html` and update:

- `<title>` — your article title
- `<meta name="description">` — your description
- `og:url` — `https://varadan13.github.io/articles/[your-slug].html`
- `og:title` — your article title
- `og:description` — your description
- The `fx-action` on `#container-slot` — `../contents/[your-slug].html`

**Step 3 — Add to the articles index**

In `articles.html`, add a new `<li>` at the **top** of `.article-list ul` (newest article first):

```html
<li>
  <a href="/articles/[your-slug].html">Your Article Title</a>
</li>
```

---

## Difference between articles and posts

| | Posts (`posts/`) | Articles (`articles/`) |
|---|---|---|
| Index page | `posts.html` | `articles.html` |
| Tone | Personal notes, TILs | Tutoring / educational |
| Content partial | `contents/` | `contents/` (shared) |

Content partials are shared — the same file can back both a post and an article page if needed.

---

## Content partial structure

Same as posts. Everything lives inside one `<div class="container">`.

| Element | Usage |
|---|---|
| `<h1>` | Article title — one per article, at the top |
| `<p>` | Body paragraphs |
| `<pre><code class="language-javascript">` | Code blocks — `<pre>` handles the box, `<code>` carries the language class |
| `<blockquote>` | Callout / rhetorical question / emphasis |
| `<hr />` | Section divider |

The rhythm is: **introduce → show code → pose a question via blockquote → hr → explain**. Repeat for each concept in the article.
