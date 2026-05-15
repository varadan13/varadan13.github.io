# varadan13.github.io

## Adding a new article or post

Run the scaffold script from the repo root:

```bash
./new.sh article "Your Article Title Here"
./new.sh post    "Your Post Title Here"
```

This creates two files:

| File | Purpose |
|---|---|
| `articles/your-title.html` or `posts/your-title.html` | Page shell — layout, nav, content loader |
| `contents/your-title.html` | Body — write your content here |

Then open `contents/your-title.html` and fill in the body inside the `<div class="container">`.
