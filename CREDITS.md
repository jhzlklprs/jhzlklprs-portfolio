# Credits & Attribution

## 3D model

**"Retro computer"** by **Urpo**

- Source: https://skfb.ly/ou69O
  (https://sketchfab.com/3d-models/retro-computer-f844c0357d284fd8baa1435e9ff31bb2)
- Author: https://sketchfab.com/Urpo
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)
  http://creativecommons.org/licenses/by/4.0/

Suggested credit (as provided by Sketchfab):

> "Retro computer" (https://skfb.ly/ou69O) by Urpo is licensed under
> Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

### Changes made to the original (CC BY 4.0 requires stating these)

The modified file is `models/retro_computer.glb`. The original author, license
and source are kept in the file's own metadata (`asset.extras`).

- Geometry was simplified: the triangle count was reduced by roughly a quarter
  (about 56,000 to about 43,000), and the vertex data was quantized
  (`KHR_mesh_quantization`) to reduce file size. The overall shape is unchanged.
- Textures were re-encoded from PNG/JPEG to WebP (`EXT_texture_webp`).
- The screen's emissive texture was edited so the screen glows with custom text
  instead of the original placeholder text.
- At runtime, `js/scene.js` renders the materials as opaque (the file itself
  still marks them `alphaMode: BLEND`), recentres and rescales the model, and
  lights it. No other changes are made to the model in the browser.

The credit is also shown in the page footer (`js/app.js`).
The original author is not affiliated with, and does not endorse, this site.

## Software

- [three.js](https://threejs.org) r170 (MIT License), bundled in `vendor/`,
  including its `GLTFLoader`, `OrbitControls` and `BufferGeometryUtils` add-ons.
- Fonts loaded from Google Fonts: Geist, Geist Mono and Hanken Grotesk
  (SIL Open Font License 1.1).
