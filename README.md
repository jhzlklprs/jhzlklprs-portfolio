# Jahzeel Kiel · Portfolio

The personal portfolio of Jahzeel Kiel, a .NET developer who builds desktop and web applications with VB.NET, ASP.NET, and SQL Server for day-to-day business operations.

https://jahzeelkiel.vercel.app

---

## What this is

A hand-written portfolio in plain HTML, CSS, and JavaScript. There is no framework, no bundler, and no build step: open the folder through any static server and it runs. It is meant to show my work clearly, load quickly, and give desktop visitors an interactive 3D hero.

## Highlights

- **A 3D terminal hero.** An IBM 3278 terminal model rendered with three.js, with a canvas-drawn boot screen that uses my name and role. Weak hardware (2 CPU cores or fewer) or a browser without WebGL gets a still poster image instead. The render loop pauses when the hero is offscreen or the tab is hidden.
- **One content file.** Profile, about text, experience, skills, and every project live in `js/data.js`. Pages are rendered from it, so adding a project means adding one entry.
- **Dynamic project pages.** There is a single project template, not one HTML file per project. Routes use the URL hash (`#/projects/<slug>`), so it works on any static host without rewrite rules.
- **Mailto contact.** The contact form opens the visitor's email client with the message prefilled. There is no server and no data store.
- **Basics covered:** a skip link, reduced-motion styles, and responsive layouts.

## Structure

```
index.html            shell: nav, <main>, footer, import map
css/style.css         base styles and theme
css/pages.css         page and component styles
js/data.js            all site content (window.SITE)
js/app.js             hash router, page renderers, footer, contact form
js/scene.js           three.js scene for the 3D hero
models/               3D model (.glb)
vendor/               three.js and add-ons, postprocessing (bundled locally)
assets/               images, project covers, resume
assets/fonts/         Geist, Geist Mono, Hanken Grotesk (self-hosted) and their OFL licence
CREDITS.md            attribution and changes made to third-party work
THIRD-PARTY-LICENSES.txt
```

## Running locally

The site uses ES modules and an import map, so opening `index.html` by double-click will not work. Serve the folder instead:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Adding a project

1. Put a cover image in `assets/projects/<slug>/cover.jpg`.
2. Add an entry to `projects` in `js/data.js` with a unique `slug`, a `name`, a `stack` list, and the text fields.
3. To feature it on the home page, add its slug to `FEATURED_ORDER`.

## Deploying

It is a static site, so any static host works. On Vercel, import the folder as a project with no framework preset and no build command.

## Credits

Third-party work, including the 3D model (CC BY 4.0), three.js, postprocessing, and fonts, is credited in [CREDITS.md](CREDITS.md), with licence texts in [THIRD-PARTY-LICENSES.txt](THIRD-PARTY-LICENSES.txt).

## License

<!-- TODO: choose a license and add a LICENSE file, then name it here. -->

## Citation

See [CITATION.cff](CITATION.cff).

## Author

**Jahzeel Kiel**, .NET developer, Lucena City, Philippines

<!-- TODO: add links, e.g. Website · GitHub · LinkedIn · Email -->
