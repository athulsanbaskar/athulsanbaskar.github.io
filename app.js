import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const viewer = document.querySelector("#viewer");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  45,
  viewer.clientWidth / viewer.clientHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(viewer.clientWidth, viewer.clientHeight);

viewer.appendChild(renderer.domElement);


// Camera controls

const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;


// Lighting

const ambientLight = new THREE.AmbientLight(
  0xffffff,
  2
);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
  0xffffff,
  3
);

directionalLight.position.set(5, 5, 5);

scene.add(directionalLight);


// -------------------------
// CREATE ATOM
// -------------------------

function createAtom(element, x, y, z) {

  const radius = elementRadii[element] || 0.35;

  const color = elementColors[element] || 0x888888;

  const geometry = new THREE.SphereGeometry(
    radius,
    32,
    32
  );

  const material = new THREE.MeshStandardMaterial({
    color: color
  });

  const atom = new THREE.Mesh(
    geometry,
    material
  );

  atom.position.set(x, y, z);

  // Store useful information on the atom
  atom.userData.element = element;
  atom.userData.x = x;
  atom.userData.y = y;
  atom.userData.z = z;

  scene.add(atom);

  return atom;
}







// Test atom




const geometry = new THREE.SphereGeometry(
  1,
  32,
  32
);

const material = new THREE.MeshStandardMaterial({
  color: 0xff0000
});

const atom = new THREE.Mesh(
  geometry,
  material
);

scene.add(atom);


// Animation

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();


// Resize

window.addEventListener("resize", () => {

  const width = viewer.clientWidth;
  const height = viewer.clientHeight;

  camera.aspect = width / height;

  camera.updateProjectionMatrix();

  renderer.setSize(width, height);

});
