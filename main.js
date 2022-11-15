import './style.css'
import * as THREE from 'three';
import { PointLightHelper, SpotLightHelper } from 'three';
import  { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' //Mouse controls

// Making this into a portfolio


//1. Create infinite gridlines (don't worry about style) [x]

//1a add fog


//2. Lock camera and modify controls [ x ]
//TODO: Place camera appropriately


//3. Insert objects to scroll pst


//3. Match bg


//4. Add Portfolio content


//Initialise a scene
const scene = new THREE.Scene()

//Fog
scene.fog = new THREE.Fog(0x400135, 400)


//Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 

//Attatch to the DOM at the <canvas id="bg">
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


//Example: A 'torus' (donut)
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
//TODO: Can this be expanded to create a neon grid? - No because it is locked to 1 pixel
// const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper);

//Allow mouse movement
const controls = new OrbitControls(camera, renderer.domElement);

controls.screenSpacePanning = true
controls.minDistance = 300
controls.enableKeys = false
controls.enableZoom = false
controls.enablePan = false
controls.maxDistance = 300
controls.minPolarAngle = Math.PI/5
controls.maxPolarAngle = Math.PI/2.2


//Manual and infinite grid lines

const lineMaterial = new THREE.LineBasicMaterial ({   
  color: 0xfa07a1,
})
const gridSize = 40
const gridSpacing = 22
const gridLength = gridSize * gridSpacing
const offset = gridLength * -0.5
let v;
let h;




const verticalPoints  = [];
verticalPoints.push(new THREE.Vector3 (0, 0, 0,));
verticalPoints.push(new THREE.Vector3(gridLength*2, 0, 0))
const verticalLine = new THREE.BufferGeometry().setFromPoints(verticalPoints) 

const horizontalPoints = []
horizontalPoints.push(new THREE.Vector3(0, 0, 0,));
horizontalPoints.push(new THREE.Vector3(0, 0, gridLength*2))
const horizontalLine = new THREE.BufferGeometry().setFromPoints(horizontalPoints)
//Remove?

let group = new THREE.Group()


const addVerticalLine = function (i) {
  const line = new THREE.Line (verticalLine, lineMaterial)
  line.position.x  =  offset*2;  line.position.z = offset*2 + i * gridSize
  line.updateMatrix()
  line.matrixAutoUpdate = false
  group.add(line)
}

const addHorizontalLine = function (i) {
  const line = new THREE.Line (horizontalLine, lineMaterial)
  line.position.x =  offset*2 + i * gridSize
  line.position.z = offset*2
  line.updateMatrix()
  line.matrixAutoUpdate = false
  group.add(line)
}

//Adding the lines

for (v = 0; v <= gridSize; v++) {
  addVerticalLine(v)
  
}
for (h = 0; h <= gridSize; h++) {
  addHorizontalLine(h)
  
}

group.rotation.y = Math.PI / 4;
scene.add (group)



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


//Add backgground image Texture

const spaceTexture =  new THREE.TextureLoader().load("./retro_sun.jpg");
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

planet.position.setZ(30);
planet.position.setX(-10);

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

//Set up camera to move on scroll

function moveCamera(){
 
    //Get the current position of the TOP  of the viewport. ALways returns a negative, thus the x * -n in the camera positions
    const t = document.body.getBoundingClientRect().top;

    meOnABox.rotation.y += 0.01;
    meOnABox.rotation.z += 0.01;
    
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;




}


document.body.onscroll = moveCamera //Fires every time the user scrolls
