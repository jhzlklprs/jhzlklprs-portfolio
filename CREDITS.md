# Credits & Attribution

## 3D model

**"IBM 3278 terminal"** by **maxdragonn**

- Source: https://skfb.ly/6XW9w
  (https://sketchfab.com/3d-models/ibm-3278-terminal-b0470478089a4462afb4d5c4dd827b22)
- Author: https://sketchfab.com/maxdragon
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)
  http://creativecommons.org/licenses/by/4.0/

Suggested credit (as provided by Sketchfab):

> "IBM 3278 terminal" (https://skfb.ly/6XW9w) by maxdragonn is licensed under
> Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

### Changes made to the original (CC BY 4.0 requires stating these)

The modified file is `models/ibm_3278.glb`. The original author, license and
source are kept in the file's own metadata (`asset.extras`).

- The screen's baked-in artwork (its colour and emissive textures) was removed
  from the file. At runtime, `js/scene.js` replaces the screen material with a
  canvas-drawn terminal display (emissive, with scanlines).
- At runtime `js/scene.js` also rotates, rescales and recentres the model, and
  lights it. The geometry is unchanged.

The credit is shown on the site's Credits page (`#/credits`), linked from the footer (`js/app.js`).
The original author is not affiliated with, and does not endorse, this site.

## Software

- [three.js](https://threejs.org) r170 (MIT License), bundled in `vendor/`,
  including its `GLTFLoader`, `OrbitControls` and `BufferGeometryUtils` add-ons.
- Fonts, self-hosted in `assets/fonts/`: [Geist](https://github.com/vercel/geist-font) and Geist Mono (Copyright 2024 The Geist Project Authors) and [Hanken Grotesk](https://github.com/marcologous/hanken-grotesk) (Copyright 2021 The Hanken Grotesk Project Authors). SIL Open Font License 1.1; the licence text is in `assets/fonts/OFL.txt`.
- Full licence texts for these libraries are in `THIRD-PARTY-LICENSES.txt`.
- [postprocessing](https://github.com/pmndrs/postprocessing) (Zlib License), bundled as
  `vendor/postprocessing.bundle.js` for the bloom, vignette and contrast effects.