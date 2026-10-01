# Contributing

This is my personal portfolio, so I am not looking for new features. A few things are welcome:

- **Bugs.** If something is broken, mis-rendered, or behaves oddly, open an issue with steps to reproduce, your browser and OS, and a screenshot if it helps.
- **Accessibility issues.** Contrast, keyboard traps, screen-reader problems, or reduced-motion regressions.
- **Security issues.** See [SECURITY.md](SECURITY.md) and email me instead of opening a public issue.

Not wanted: redesigns, new features, or dependency-bump PRs.

<!-- TODO: add a sentence about forking and reuse once you pick a LICENSE. -->

## Running it locally

There is no build step or `npm install`. Serve the folder with any static server (ES modules and the import map need http, not `file://`):

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Before opening a PR

- Check the pages you touched in a desktop and a mobile viewport.
- Check the 3D hero still falls back to the poster image when WebGL is unavailable.
- Keep content changes in `js/data.js` rather than hard-coding them in `js/app.js`.
