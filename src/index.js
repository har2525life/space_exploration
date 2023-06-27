import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
  AmbientLight,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

import ISS from "./images/ISS.glb"
import earth from "./images/earth.glb"
import "./styles.css";

// sizes
const sizes = {
  width: innerWidth,
  height: innerHeight,
};

// canvas
const canvas = document.getElementById("canvas");

// glb loader
const loader = new GLTFLoader();

// Scene
const scene = new Scene();

const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100000);
camera.position.set(0,0,1000)
scene.add(camera);

// // geometry
// const boxGeometry = new BoxGeometry(1, 1, 1);
// const boxMaterial = new MeshNormalMaterial();
// const box = new Mesh(boxGeometry, boxMaterial);
// scene.add(box);

// load a glb file

loader.load(earth, (glb) => {
    console.log(glb)
    scene.add(glb.scene);
})
loader.load(ISS, (glb) => {
    console.log(glb)
    const iss = glb.scene
    
    scene.add(glb.scene);
})

const light = new AmbientLight(0xffffff)
scene.add(light)

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
