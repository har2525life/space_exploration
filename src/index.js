import {
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

import "./styles.css";

// sizes
const sizes = {
  width: innerWidth,
  height: innerHeight,
};

// canvas
const canvas = document.getElementById("canvas");

// Scene
const scene = new Scene();

const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
scene.add(camera);

// control
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function animate() {
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
