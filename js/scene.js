import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Mounts the retro computer into `host`. Returns {start, stop} so the loop can pause off-screen.
export function mountComputer(host, modelUrl, onError) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.domElement.style.touchAction = "pan-y";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 2.59, 9.67);

  // warm key + ember rim, same grading as the original
  scene.add(new THREE.AmbientLight(0xffffff, 0.55 * Math.PI));
  const spot = new THREE.SpotLight(0xffe9d2, 130, 0, 0.5, 1, 2);
  spot.position.set(-6, 7, 7);
  scene.add(spot);
  const ember = new THREE.PointLight(0xd9663d, 45, 0, 2);
  ember.position.set(7, 1, 4);
  scene.add(ember);
  const fill = new THREE.PointLight(0xffb27a, 22, 0, 2);
  fill.position.set(0, 1, 7);
  scene.add(fill);

  const pivot = new THREE.Group();
  scene.add(pivot);

  new GLTFLoader().load(modelUrl, (gltf) => {
    const model = gltf.scene;
    model.scale.setScalar(window.matchMedia("(max-width: 1024px)").matches ? 1.5 : 1.3);
    // exported materials are alphaMode BLEND (see-through); force opaque
    model.traverse((o) => {
      if (!o.isMesh) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
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
  controls.minPolarAngle = Math.PI / 2.4;
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.update();

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(host);
  resize();

  const clock = new THREE.Clock();
  let raf = 0;
  const loop = () => {
    raf = requestAnimationFrame(loop);
    const t = clock.getElapsedTime();
    pivot.rotation.y = 4.4 + Math.sin(t * 0.6) * 0.1; // idle drift keeps the CRT readable
    pivot.rotation.x = -0.03 + Math.sin(t * 0.46) * 0.025;
    controls.update();
    renderer.render(scene, camera);
  };
  return {
    start() { if (!raf) loop(); },
    stop() { cancelAnimationFrame(raf); raf = 0; },
  };
}
