import './style.css'
import * as THREE from 'three';
import { PointLightHelper, SpotLightHelper } from 'three';
import  { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' //Mouse controls


//Initrialise a scene

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 

//Attatch to the DOM at the <canvas>
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),

});

// Set pixel ration and device height
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); //full screen
camera.position.setZ(30); 

renderer.render(scene, camera)


//Adding objects

//Objects need three things:
//1. Geometry
//2. material
//3. Mesh (geometry + mesh)

const geometry = new THREE.TorusGeometry(10, 3 , 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: false}); //Basic requires no light source --others DO require light source
const torus = new THREE.Mesh(geometry, material);


scene.add(torus);


//Add light to the scene

//Example 1: to light up a small area(like a single object)
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20)

// scene.add(pointLight)

//Example 2: Ambient light to light up a whole scene
const ambientLight = new  THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

//#####DEV HELPERS ######

//We can use light helper to help us during development to see the where the lighht is
const lightHelper = new THREE.PointLightHelper(pointLight)

//Grid helper
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper) 

//Allow mouse movement
const controls = new OrbitControls(camera, renderer.domElement);

//Create the stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24,24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
  const star  = new THREE.Mesh( geometry, material);
  
  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread( 200 ))

  star.position.set(x, y, z);
  scene.add(star)

};

Array(1000).fill().forEach(addStar)


//Add BG Texture

const spaceTexture =  new THREE.TextureLoader().load("./52374360369_721d344032_o.png");
scene.background = spaceTexture;

//Add box with image
const meTexture = new THREE.TextureLoader().load('./profile.jpg');

const meOnABox = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: meTexture})
  
)

const moonTexture = new THREE.TextureLoader().load('./moon.jpg')

const normalTexture = new THREE.TextureLoader().load('./planetTexture.webp')

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture


  })

);

scene.add(meOnABox, planet)


//Animate the Torus
function animate(){
  requestAnimationFrame( animate )
  
  torus.rotation.x += 0.01;
  torus.rotation.z += 0.005;
  torus.rotation.y += 0.01;

  renderer.render(scene, camera)
};

animate();
