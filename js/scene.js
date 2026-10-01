import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer, RenderPass, EffectPass, BloomEffect, VignetteEffect, BrightnessContrastEffect } from "../vendor/postprocessing.bundle.js";

// CRT terminal drawn to a canvas and used as the screen's emissive map, so bloom makes it glow.
// The screen's UVs cover the whole texture, but the glass is 1.23x wider than tall. Layout is done in a
// 1262x1024 space that is squeezed onto the square canvas, so the text looks undistorted on the glass.
const BLINK = true; // false = fully static text (no cursor blink)
function makeTerminal(renderer) {
  const P = (window.SITE && window.SITE.profile) || {};
  const name = (P.name || "Jahzeel Kiel").toUpperCase();
  const role = (P.role || ".NET Developer").toUpperCase();
  // follow the site's accent (--lavender-b), lightened a little so it blooms like a lit phosphor
  const css = getComputedStyle(document.documentElement).getPropertyValue("--lavender-b").trim() || "#a597ff";
  const INK = "#" + new THREE.Color(css).lerp(new THREE.Color("#fff1e0"), 0.3).getHexString();
  // dark tints of the accent for the screen glass, so the CRT background matches the theme
  const accentHex = new THREE.Color(css).getHexString();
  const tint = (k) => "#" + [0, 2, 4].map((i) => Math.round(parseInt(accentHex.substr(i, 2), 16) * k).toString(16).padStart(2, "0")).join("");
  const FONT = '"Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace';
  const LW = 1262, LH = 1024, PADX = 135;
  const words = name.split(" ");
  const nameSize = Math.min(170, Math.floor((LW - PADX * 2) / (0.62 * Math.max(...words.map((w) => w.length)))));
  // boot-log line: dots are padded so every "OK" lines up in the monospace font
  const logLine = (label) => "> " + label + " " + ".".repeat(Math.max(3, 26 - label.length)) + " OK";
  // [text, px size, gap above, alpha, line height, weight]
  const rows = [
    ["> BOOT " + name.replace(" ", "."), 34, 0, 0.65, 1.3, 400],
    [logLine(".NET / C# / SQL"), 34, 0, 0.65, 1.3, 400],
    [logLine("SOFTWARE DEVELOPER"), 34, 0, 0.65, 1.3, 400],
    [logLine("BUSINESS SYSTEMS"), 34, 0, 0.65, 1.3, 400],
    ...words.map((w, i) => [w, nameSize, i === 0 ? 38 : 0, 1, 1.0, 700]),
    [role, 70, 16, 0.9, 1.15, 400],
    ["> READY", 34, 34, 0.65, 1.3, 400],
  ];
  const blockH = rows.reduce((n, [, size, gap, , lh]) => n + gap + size * lh, 0);

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1024;
  const g = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  function draw(cursor) {
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = tint(0.02); g.fillRect(0, 0, 1024, 1024);
    g.setTransform(1024 / LW, 0, 0, 1, 0, 0);
    const bg = g.createRadialGradient(LW / 2, LH / 2, 60, LW / 2, LH / 2, 760);
    bg.addColorStop(0, tint(0.15)); bg.addColorStop(1, tint(0.04));
    g.fillStyle = bg; g.fillRect(0, 0, LW, LH);
    g.textBaseline = "top"; g.fillStyle = INK; g.shadowColor = INK; g.shadowBlur = 18;
    let y = (LH - blockH) / 2, cx = PADX, cy = y, cs = 34;
    rows.forEach(([text, size, gap, alpha, lh, weight], i) => {
      y += gap;
      g.font = `${weight} ${size}px ${FONT}`; g.globalAlpha = alpha;
      g.fillText(text, PADX, y);
      if (i === rows.length - 1) { cx = PADX + g.measureText(text).width; cy = y; cs = size; }
      y += size * lh;
    });
    g.globalAlpha = 0.9;
    if (cursor) g.fillRect(cx + 10, cy + cs * 0.08, cs * 0.55, cs * 0.85);
    g.globalAlpha = 1; g.shadowBlur = 0;
    g.fillStyle = "rgba(0,0,0,0.3)"; // scanlines
    for (let sy = 0; sy < LH; sy += 6) g.fillRect(0, sy, LW, 2);
    texture.needsUpdate = true;
  }

  let last = null;
  if (document.fonts && document.fonts.load) Promise.all([document.fonts.load('400 34px "Geist Mono"'), document.fonts.load('700 100px "Geist Mono"')]).then(() => { last = null; }).catch(() => {});
  draw(true); // full text is visible immediately; only the cursor blinks

  const material = new THREE.MeshStandardMaterial({
    color: 0x000000, roughness: 0.5, metalness: 0, // rougher glass = softer glare, so the text stays readable
    emissive: 0xffffff, emissiveMap: texture, emissiveIntensity: 2.0,
  });
  return {
    material,
    update(t) {
      const cursor = BLINK ? Math.floor(t * 1.8) % 2 === 0 : true;
      if (cursor !== last) { last = cursor; draw(cursor); }
    },
  };
}

// Mounts the IBM 3278 terminal into `host`. Returns {start, stop} so the loop can pause off-screen.
export function mountComputer(host, modelUrl, onError) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0x000000, 0); // transparent so the CSS .glow shows through
  // no renderer tone mapping: the composer below renders to a float buffer, which is how the reference is graded
  renderer.domElement.style.touchAction = "pan-y";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 2.59, 9.67);

  // warm key + lavender rim + warm fill
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const spot = new THREE.SpotLight(0xffe9d2, 130, 0, 0.5, 1, 2);
  spot.position.set(-6, 7, 7);
  scene.add(spot);
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--lavender").trim() || "#8b7cf6";
  const lavender = new THREE.PointLight(new THREE.Color(accent), 45, 0, 2);
  lavender.position.set(7, 1, 4);
  scene.add(lavender);
  const fill = new THREE.PointLight(0xffb27a, 22, 0, 2);
  fill.position.set(0, 1, 7);
  scene.add(fill);

  // bloom lifts the CRT glow; vignette + slight contrast grade it into the theme
  let composer = null;
  try {
    composer = new EffectComposer(renderer, { frameBufferType: THREE.HalfFloatType, multisampling: 4 });
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new EffectPass(camera,
      new BrightnessContrastEffect({ brightness: -0.01, contrast: 0.06 }),
      new BloomEffect({ mipmapBlur: true, intensity: 0.7, luminanceThreshold: 0.6, luminanceSmoothing: 0.25 }),
      new VignetteEffect({ eskil: false, offset: 0.3, darkness: 0.8 })));
  } catch (e) {
    console.warn("post-processing unavailable, rendering plain", e);
    composer = null;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
  }

  let terminal = null;
  const pivot = new THREE.Group();
  scene.add(pivot);

  new GLTFLoader().load(modelUrl, (gltf) => {
    const model = gltf.scene;
    // the 3278 faces +X in its file; turn it to face +Z (the camera). Then scale by measured size,
    // since the model is ~38 units wide (keeps it framed if the model is swapped again)
    model.rotation.y = -Math.PI / 2;
    model.updateMatrixWorld(true);
    const size0 = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
    model.scale.setScalar((window.matchMedia("(max-width: 1024px)").matches ? 3.7 : 3.3) / Math.max(size0.x, size0.z));
    // exported materials are alphaMode BLEND (see-through); force opaque
    model.traverse((o) => {
      if (!o.isMesh) return;
      if (o.material && o.material.name === "display") {
        terminal = makeTerminal(renderer);
        o.material = terminal.material;
        return;
      }
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
        m.metalness = Math.min(m.metalness, 0.3); // no environment map here, so full metal would render black
        m.transparent = false;
        m.depthWrite = true;
        m.alphaTest = 0;
        m.needsUpdate = true;
      });
    });
    // recenter (drei <Center>)
    model.updateMatrixWorld(true);
    const c = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3());
    model.position.sub(c);
    pivot.add(model);
    host.classList.add("ready");
  }, undefined, (err) => { console.warn("model failed to load", err); onError && onError(); });

  const coarse = window.matchMedia("(any-pointer: coarse)").matches;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enabled = !coarse; // touch: swipe scrolls the page instead
  // OrbitControls forces touch-action:none when it connects, which blocks page scrolling over the canvas on phones; restore it
  renderer.domElement.style.touchAction = coarse ? "auto" : "pan-y";
  controls.minPolarAngle = Math.PI / 2.4;
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.update();

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    composer ? composer.setSize(w, h) : renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.zoom = Math.min(1, camera.aspect / 0.95); // zoom out on narrow canvases so the model is not cropped
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  const clock = new THREE.Clock();
  let raf = 0;
  const loop = () => {
    raf = requestAnimationFrame(loop);
    const t = clock.getElapsedTime();
    pivot.rotation.y = -0.45 + Math.sin(t * 0.6) * 0.12; // turned toward the key light; idle drift keeps the CRT readable
    terminal && terminal.update(t);
    pivot.rotation.x = -0.03 + Math.sin(t * 0.46) * 0.025;
    controls.update();
    composer ? composer.render() : renderer.render(scene, camera);
  };
  return {
    start() { if (!raf) loop(); },
    stop() { cancelAnimationFrame(raf); raf = 0; },
    // free the WebGL context so navigating Home repeatedly doesn't leak renderers
    dispose() {
      cancelAnimationFrame(raf); raf = 0; ro.disconnect(); controls.dispose();
      composer && composer.dispose();
      scene.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); [].concat(o.material).forEach((m) => { Object.values(m).forEach((v) => v && v.isTexture && v.dispose()); m.dispose(); }); } });
      renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    },
  };
}