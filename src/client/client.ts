import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: true,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = Stats();

document.body.appendChild(stats.dom);

const gui = new GUI();
const sphereFolder = gui.addFolder("Sphere");
const sphereRotationFolder = sphereFolder.addFolder("Rotation");
sphereRotationFolder.add(sphere.rotation, "x", 0, Math.PI * 2);
sphereRotationFolder.add(sphere.rotation, "y", 0, Math.PI * 2);
sphereRotationFolder.add(sphere.rotation, "z", 0, Math.PI * 2);
sphereFolder.open();
sphereRotationFolder.open();

const spherePositionFolder = sphereFolder.addFolder("Position");
spherePositionFolder.add(sphere.position, "x", -10, 10, 0.01);
spherePositionFolder.add(sphere.position, "y", -10, 10, 0.01);
spherePositionFolder.add(sphere.position, "z", -10, 10, 0.01);
sphereFolder.open();
spherePositionFolder.open();

const sphereScaleFolder = sphereFolder.addFolder("Scale");
sphereScaleFolder.add(sphere.scale, "x", -5, 5);
sphereScaleFolder.add(sphere.scale, "y", -5, 5);
sphereScaleFolder.add(sphere.scale, "z", -5, 5);
sphereFolder.add(sphere, "visible");
sphereScaleFolder.open();

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.001;

  stats.update();

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
