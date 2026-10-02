# Contributing

This is my personal site, so I am not taking feature or design pull requests.
If you spot a bug or an accessibility problem, an issue is welcome. Tell me the
page, your browser and device, what you expected and what happened.

Security problems go to the address in [SECURITY.md](SECURITY.md), not into a
public issue.

## Running it locally

There is no build step. The page uses ES modules, so serve the folder rather
than opening `index.html` directly:

```bash
python3 -m http.server 8000
```

then visit <http://localhost:8000>. Site text lives in `js/data.js`; page
rendering is in `js/app.js` and the 3D hero in `js/scene.js`.

Reuse of the code and content is covered by [LICENSE](LICENSE).
