# New Post Guide

## Steps to create a new post

**Step 1 — Create the content partial**

Create `contents/[your-slug].html` — article body only, no HTML shell:

```html
<div class="container">
  <h1>Your Post Title</h1>

  <p>...</p>
</div>
```

**Step 2 — Create the post page**

Copy `posts/javascript-tostring-quirk.html` to `posts/[your-slug].html` and update:

- `<title>` — your post title
- `<meta name="description">` — your description
- `og:url` — `https://varadan13.github.io/posts/[your-slug].html`
- `og:title` — your post title
- `og:description` — your description
- The `fx-action` on `#container-slot` — `../contents/[your-slug].html`

**Step 3 — Add to the posts index**

In `posts.html`, add a new `<li>` at the **top** of `.article-list ul` (newest post first):

```html
<li>
  <a href="/posts/[your-slug].html">Your Post Title</a>
</li>
```

---

## Content partial structure

Everything lives inside one `<div class="container">`.

| Element | Usage |
|---|---|
| `<h1>` | Post title — one per post, at the top |
| `<p>` | Body paragraphs |
| `<pre><code class="language-javascript">` | Code blocks — `<pre>` handles the box, `<code>` carries the language class |
| `<blockquote>` | Callout / rhetorical question / emphasis |
| `<hr />` | Section divider |

**Pattern:**

```html
<div class="container">
  <h1>Title</h1>

  <p>Intro sentence.</p>

  <pre><code class="language-javascript">// code here</code></pre>

  <blockquote>Rhetorical question or callout</blockquote>

  <hr />

  <p>Explanation...</p>
</div>
```

The rhythm is: **introduce → show code → pose a question via blockquote → hr → explain**. Repeat for each concept in the post.
