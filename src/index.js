import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
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
camera.position.set(0,0,10)
scene.add(camera);

// geometry
const boxGeometry = new BoxGeometry(1, 1, 1);
const boxMaterial = new MeshNormalMaterial();
const box = new Mesh(boxGeometry, boxMaterial);
scene.add(box);

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
