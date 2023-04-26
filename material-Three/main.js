import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

let scene, camera, renderer, pointLight, controls, sphere, plane, octahedron;

window.addEventListener("load", init);

function init() {
  //シーン
  scene = new THREE.Scene();

  //カメラ
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);

  //レンダラー
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  //ジオメトリ
  const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
  const planeGeometry = new THREE.PlaneGeometry(1, 1);
  const octahedronGeometry = new THREE.OctahedronGeometry(0.5);

  //テクスチャ
  const texture = new THREE.TextureLoader().load("./textures/3DImage.jpg");

  //マテリアル
  // const material = new THREE.MeshBasicMaterial({
  //   color: 0x0000ff,
  //   map: texture,
  // });

  const material = new THREE.MeshBasicMaterial();
  material.map = texture;
  // material.color.set("blue");
  // material.wireframe = true;
  material.side = THREE.DoubleSide; //Planeの裏側を見る　重要!!!
  material.opacity = 0.6;
  material.transparent = true;

  // const material = new THREE.MeshNormalMaterial(); //光を必要としない
  // material.flatShading = true;

  // const material = new THREE.MeshStandardMaterial(); //物理の法則に従う, 影がつく, UnityやUEなどで使用されている, 金属の光沢なども表現可
  // // material.color.set("#049ef4");
  // material.roughness = 0.6;
  // material.metalness = 0.64;
  // material.map = texture;

  // const material = new THREE.MeshPhongMaterial(); //反射をコントロール
  // material.shininess = 100;
  // material.specular = new THREE.Color("red"); //反射光の色

  //明かりを追加

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); //方向を持たない光,全体を照らす光,影がつかない
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.7);
  pointLight.position.set(1, 2, 3);
  scene.add(pointLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  scene.add(pointLightHelper);

  //メッシュ化
  sphere = new THREE.Mesh(sphereGeometry, material);
  plane = new THREE.Mesh(planeGeometry, material);
  octahedron = new THREE.Mesh(octahedronGeometry, material);

  sphere.position.x = -1.5;
  octahedron.position.x = 1.5;

  scene.add(sphere, plane, octahedron);

  //マウス操作
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime(); //animate関数が呼ばれてからどれだけ時間が経過したか
  // console.log(elapsedTime);

  //オブジェクトを回転させる
  sphere.rotation.x = elapsedTime;
  plane.rotation.x = elapsedTime;
  octahedron.rotation.x = elapsedTime;

  sphere.rotation.y = elapsedTime;
  plane.rotation.y = elapsedTime;
  octahedron.rotation.y = elapsedTime;

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
