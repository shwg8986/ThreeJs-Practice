import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.18/+esm";

/**
 * UIデバッグ
 */
const gui = new GUI();
// console.log(gui);

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//ジオメトリを作成。
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

//マテリアル
const material = new THREE.MeshBasicMaterial({
  color: "red",
});

//メッシュ化
const box = new THREE.Mesh(boxGeometry, material);
scene.add(box);

// デバッグ

//フォルダーの定義
const positionFolder = gui.addFolder("Position");
const otherFolder = gui.addFolder("Others");
// gui.add(box.position, "x", -3, 3, 0.01);

//上と同じ
positionFolder
  .add(box.position, "x")
  .name("transformX")
  .min(-3)
  .max(3)
  .step(0.01);

positionFolder
  .add(box.position, "y")
  .name("transformY")
  .min(-3)
  .max(3)
  .step(0.01);

positionFolder
  .add(box.position, "z")
  .name("transformZ")
  .min(-3)
  .max(3)
  .step(0.01);

positionFolder
  .add(box.rotation, "x")
  .name("rotationX")
  .min(-3)
  .max(3)
  .step(0.01);

positionFolder
  .add(box.rotation, "y")
  .name("rotationY")
  .min(-3)
  .max(3)
  .step(0.01);

positionFolder
  .add(box.rotation, "z")
  .name("rotationZ")
  .min(-3)
  .max(3)
  .step(0.01);

otherFolder.add(box, "visible"); //表示するかしないか

otherFolder.add(material, "wireframe"); //ワイアフレームの表示にするかどうか

otherFolder.addColor(material, "color"); //色の設定　便利！

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

animate();
