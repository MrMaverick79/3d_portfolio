import './style.css'
import * as THREE from 'three';
import { BoxGeometry, CircleGeometry, PointLightHelper, SpotLightHelper } from 'three';
import  { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' //Mouse controls

// Making this into a portfolio


//1. Create infinite gridlines (don't worry about style) [x]

//1a add fog [ x ]


//2. Lock camera and modify controls [ x ]
//TODO: Place camera appropriately

//3. Create BG [  ]
  //-Sun
  //-'ground'
  // -'sky'

//4. Insert objects to scroll pst




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
camera.position.setZ(40);
camera.position.setY(6);
camera.position.setX(40); 

renderer.render(scene, camera)

//Adding objects

//Objects need three things:
//1. Geometry
//2. material
//3. Mesh (geometry + mesh)


//Example: A 'torus' (donut)
// const geometry = new THREE.TorusGeometry(10, 3 , 16, 100)
// const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: false}); //Basic requires no light source --others DO require light source
// const torus = new THREE.Mesh(geometry, material);


// scene.add(torus);


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

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

controls.screenSpacePanning = true
// controls.minDistance = 300
controls.enableKeys = true
controls.enableZoom = true
controls.enablePan = false
controls.maxDistance = 300
controls.minPolarAngle = Math.PI/5
controls.maxPolarAngle = Math.PI/2.2
controls.enableRotate = true

//Testing
const hyperGeometry = new THREE.PlaneGeometry(1000, 1)
const hyperMaterial = new THREE.MeshBasicMaterial({
  color: 0xfa07a1,
  side: THREE.DoubleSide
})






//Manual and infinite grid lines

const lineMaterial = new THREE.MeshBasicMaterial ({   
  color: 0xfa07a1,
})
const gridSize = 30
const gridSpacing = 22
const gridLength = gridSize * gridSpacing
const offset = gridLength * -0.5
let v;
let  h;

//This allows us to position the grid correctly
let group = new THREE.Group()


const addVerticalLine = function (i) {
  const line =new THREE.Mesh(hyperGeometry, hyperMaterial)
  
  line.position.x  =  0 
   line.position.z = offset*2 + i * gridSize
  line.rotateX(Math.PI * -0.2)
  line.rotateY(Math.PI * - 1)

  line.updateMatrix()
  line.matrixAutoUpdate = false
  group.add(line)
}

const addHorizontalLine = function (i) {
  const line = new THREE.Mesh(hyperGeometry, hyperMaterial)

  line.position.x = offset*2 + i * gridSize
  line.position.z = 0 
  line.rotateX(Math.PI * - 0.5)
  line.rotateZ(Math.PI * - 0.5)
  line.updateMatrix()
  line.matrixAutoUpdate = true
  group.add(line)
}

//Adding the lines

for (v = -40; v <= gridSize; v++) {
  addVerticalLine(v)
  
}
for (h = -40; h <= gridSize; h++) {
  addHorizontalLine(h)
  
}

group.rotation.y = Math.PI / 4;
scene.add (group)

// Wireframe cube

const cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true})
const wireCube = new THREE.Mesh(cubeGeometry, cubeMaterial)
wireCube.position.setZ(80)
wireCube.position.setY(50)


scene.add( wireCube)




// SUN
const sunGeometry = new THREE.CircleGeometry( 200, 32)
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFBE00  })
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
sunMesh.rotateY(0.75) //Face the camera
// sunMesh.position.set(-500, 100, -600)
sunMesh.position.set(-500, 100, -500)


//Floor
const floorGeometry = new THREE.PlaneGeometry(5000,  5000);
const floorMaterial = new THREE.MeshBasicMaterial( {color: 0xFFF, side: THREE.DoubleSide} )
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial )
floorMesh.position.set(0, -10, 0)
floorMesh.rotation.x = Math.PI * 0.5
floorMesh.rotation.z = Math.PI * 0.82



scene.add(sunMesh, floorMesh)



//Add box with image
const meTexture = new THREE.TextureLoader().load('./profile.jpg');

const meOnABox = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: meTexture})
  
)



//Animate the Torus
function animate(){
  requestAnimationFrame( animate )
    
  wireCube.rotation.x += 0.01;
  wireCube.rotation.z += 0.005;
  wireCube.rotation.y += 0.01;

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




//Legacy
//Create the stars
// function addStar(){
//   const geometry = new THREE.SphereGeometry(0.25, 24,24);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
//   const star  = new THREE.Mesh( geometry, material);
  
//   const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread( 200 ))

//   star.position.set(x, y, z);
//   scene.add(star)

// };

// Array(1000).fill().forEach(addStar)


//Add backgground image Texture

// const spaceTexture =  new THREE.TextureLoader().load("./bg.jpg");
// scene.background = spaceTexture;




// const moonTexture = new THREE.TextureLoader().load('./moon.jpg')

// const normalTexture = new THREE.TextureLoader().load('./planetTexture.webp')

// const planet = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//       map: moonTexture,
//       normalMap: normalTexture


//   })

// );

// planet.position.setZ(30);
// planet.position.setX(-10);

// scene.add(meOnABox, planet)
