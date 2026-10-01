# Contributing

This is a personal portfolio, so it is not open to new features, redesigns, or
dependency-update pull requests. Reports are welcome in two areas:

- **Bugs and accessibility problems.** Open an issue that says what you
  expected, what happened, your browser and OS, and a screenshot if useful.
  Contrast, keyboard, screen-reader, and reduced-motion issues all count.
- **Security problems.** Please follow [SECURITY.md](SECURITY.md) instead of
  opening a public issue.

## Reusing the code

The source is available to read under the terms in [LICENSE](LICENSE). Learning
from it is fine; publishing it as your own site is not.

## Running it locally

There is no build step. Serve the folder with any static server, because the
ES modules and import map do not work from `file://`:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## If you send a fix

- Try the pages you touched at desktop and phone widths.
- Confirm the hero shows the still image when WebGL is unavailable or when
  reduced motion is on.
- Put text changes in `js/data.js` instead of hard-coding them in `js/app.js`.
