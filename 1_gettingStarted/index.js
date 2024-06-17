import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera.
const width = window.innerWidth;
const height = window.innerHeight;

// creating a scene
const scene = new THREE.Scene();

// setting up camera angles
const fov = 75; // field of view -> extend of the scene visible on the display
const aspect = width / height; // almost always width/height
const near = 0.1;
const far = 10;
// objects closer than near and further from far are not rendered
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
// By default, when we call scene.add(), the thing we add will be added to the coordinates (0,0,0). This would cause both the camera and the icosahedron to be inside each other. To avoid this, we simply move the camera out a bit.

// creating a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

//  we add the renderer element to our HTML document. This is a <canvas> element the renderer uses to display the scene to us.
document.body.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1.0, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});

// A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geometry, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

// controls so that we can control the movement of our geometry using mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampoingFactor = 0.03;

// adding lighting to our scene
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

// render or animation loop that will actually display everything on the browser
function animate(t = 0) {
  // this function will run every frame like 60fps or 60 times per second
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
