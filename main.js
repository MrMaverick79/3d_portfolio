import './style.css'
import * as THREE from 'three';
import { BoxGeometry, CircleGeometry, MathUtils, PointLightHelper, SpotLightHelper } from 'three';
import  { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' //Mouse controls
import PalmGenerator from './src/PalmGenerator';



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


//CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 

//Attatch to the DOM at the <canvas id="bg">
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,

});

//Camera and Renderer options
renderer.setClearColor( 0x000000, 0 );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); //full screen
camera.position.setZ(50);
camera.position.setY(20);
camera.position.setX(50); 


//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = true
controls.minDistance = 0
controls.enableKeys = true
controls.enableZoom = true
controls.enablePan = false
controls.maxDistance = 300
controls.minPolarAngle = Math.PI/5
controls.maxPolarAngle = Math.PI/2.2
controls.enableRotate = true
// controls.target = new THREE.Vector3(0,500,0)


//Adding objects

//Objects need three things:
//1. Geometry
//2. material
//3. Mesh (geometry + mesh)

//TREE

//Set variable for x y z  so we can generate multiple
//TODO add one more segment and straighten


function createpalmTree(x,y,z, rot){
  
   
  var geometry = new THREE.BoxGeometry(100, 100, 25 );
  // geometry.translate(0,50,100);
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00, transparent: true, opacity: 0} );
  var palmTree = new THREE.Mesh( geometry, material );

  

  //Base
  var geometry = new THREE.CylinderGeometry(35, 45, 50, 600
    );
  var material = new THREE.MeshNormalMaterial( { color: 0x948C75 } );
  var palmBase = new THREE.Mesh(geometry, material);
  palmTree.add(palmBase);

  //Segment 1
  var geometry = new THREE.CylinderGeometry(25, 35, 50, 400
    );
  var material = new THREE.MeshNormalMaterial( { color: 0x948C75 } );
  var palmMidLow = new THREE.Mesh(geometry, material);
  palmMidLow.position.set(-.25,40, .0);
  palmTree.add(palmMidLow);
    
  //Segment II
  var geometry = new THREE.CylinderGeometry(15, 24, 50, 60);
  var palmMid = new THREE.Mesh(geometry, material);
   palmMid.position.set(-.25, 85, 0);
   palmMid.rotation.set(0, 0, 0);
   palmTree.add(palmMid);
  
   //TOP Segment
  var geometry = new THREE.CylinderGeometry(5, 10, 30, 60);
  var palmTop = new THREE.Mesh(geometry, material);
    palmTop.position.set(-10, 123, .0);
    palmTop.rotation.set(0, 0, .35);
    palmTree.add(palmTop);


  
  //TIP 
  var geometry = new THREE.CylinderGeometry(0.15, 4, 12, 60);
    var palmTrunkTop = new THREE.Mesh(geometry, material);
    palmTrunkTop.position.set(-18, 140, 1);
    palmTrunkTop.rotation.set(.2, .1, .5);
    palmTree.add(palmTrunkTop);
    
    //LEAVES
  var leafShape = new THREE.Shape();
  leafShape.quadraticCurveTo(0, 5.5, 10, 5.5);
  leafShape.quadraticCurveTo(0, -5.5, 0, 2);
    
    var extrudeSettings = {
    steps: 1,
    amount: .005,
    bevelEnabled: true,
    bevelThickness: .025,
    bevelSize: .50,
    bevelSegments: .5
  };
  
  
  var geometry = new THREE.ExtrudeGeometry( leafShape, extrudeSettings );
  
  var material = new THREE.MeshNormalMaterial( { color: 0x0CA4A5 } );
  var Leaf = new THREE.Mesh( geometry, material);
    Leaf.scale.set(5, 5, 10);
    Leaf.position.set(-23, 148, 1);
    Leaf.rotation.set(18.5, 2.5, 2);
    palmTree.add( Leaf );
  
     let pL = Leaf.clone();
     pL.position.set(-23, 148, 1);
     pL.rotation.set(8.8, .5, 2);
     palmTree.add(pL);
    
     pL = Leaf.clone();
     pL.position.set(-23, 148, 1);
     pL.rotation.set(-.85, -3.5, .5);
     palmTree.add(pL);
    
  
    palmTree.position.set(x,y,z)
    palmTree.rotateY(rot)
    scene.add( palmTree );
    palmTree.scale.set(.35,.35,.35);
    
    
    
  }
  let x = 50;
  let y = 8;
  let z = -100;

  let xa = 0;
  let ya = 8;
  let za = -140;

  let xb = 100;
  let yb = 8;
  let zb = -60;
 
function createWestGrove(){
  let x = 200;
  let y= 8;
  let z = 20
  for (let i = 0; i < 8; i++) {
    createpalmTree(x,y,z, 89)
    x -= 50;
    z -=40
    
  }

}
createWestGrove()


//Example: A 'torus' (donut)
// const geometry = new THREE.TorusGeometry(10, 3 , 16, 100)
// const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: false}); //Basic requires no light source --others DO require light source
// const torus = new THREE.Mesh(geometry, material);


// scene.add(torus);


//Add light to the scene

//Example 1: to light up a small area(like a single object)
// const pointLight = new THREE.PointLight(0x9105ff);
// pointLight.position.set(20,20,20)

// scene.add(pointLight)

//Example 2: Ambient light to light up a whole scene
const ambientLight = new THREE.AmbientLight({
  color: 0x9105ff,
  intensity: 0.5,
});
scene.add(ambientLight)

//#####DEV HELPERS ######

//We can use light helper to help us during development to see the where the lighht is
// const lightHelper = new THREE.PointLightHelper(pointLight)

// const axesHelper = new THREE.AxesHelper( 25 );
// scene.add( axesHelper );

//Grid helper
//TODO: Can this be expanded to create a neon grid? - No because it is locked to 1 pixel
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper);


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

// Wireframe cube(s)?

const cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true})
const wireCube = new THREE.Mesh(cubeGeometry, cubeMaterial)
wireCube.position.setZ(80)
wireCube.position.setY(50)
scene.add( wireCube)

//CITY
let cityGroup = new THREE.Group();

//Establsih size and shape of buildings

function createCity(){
  
    

    for (let i = 0; i < 40; i++) {
      const cityH = MathUtils.randInt(0, 200)
      const cityW = MathUtils.randInt(15, 20)
    
      const cityGeometry = new THREE.PlaneGeometry(cityW, cityH)
      const cityMaterial = new THREE.MeshBasicMaterial({
        color:  0x000,
        side: THREE.DoubleSide
      })
      const cityMesh = new THREE.Mesh(cityGeometry, cityMaterial)
      
      cityMesh.position.setZ(i*8)
      cityMesh.rotateY(30)
      cityGroup.add(cityMesh)
      
    }
    
    cityGroup.rotateY(Math.PI *  0.7)
    // cityGroup.rotateY()
    cityGroup.position.set(-449,0, -260)

    scene.add(cityGroup)
}


createCity()


// SUN

const sunGeometry = new THREE.CircleGeometry( 200, 32)
const sunMaterial = new THREE.MeshBasicMaterial({ 
  color: 0xFFBE00,  
})

const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
sunMesh.rotateY(0.75) //Face the camera
// sunMesh.position.set(-500, 100, -600)
sunMesh.position.set(-500, 100, -500)


//FLOOR
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

renderer.render(scene, camera)


//Animate the wireCube
function animate(){
  requestAnimationFrame( animate )
    
  wireCube.rotation.x += 0.01;
  wireCube.rotation.z += 0.005;
  wireCube.rotation.y += 0.01;

  renderer.render(scene, camera)
};

animate();

//Set up camera to move on scroll

// function moveCamera(){
 
//     //Get the current position of the TOP  of the viewport. ALways returns a negative, thus the x * -n in the camera positions
//     const t = document.body.getBoundingClientRect().top*2
  

//     meOnABox.rotation.y += 0.01;
//     meOnABox.rotation.z += 0.01;
    
  
//     camera.position.x = t* -0.005;
//     camera.position.y = t* -0.005;
//     camera.position.z = t * -0.005;
   



// }


// document.body.onscroll = moveCamera //Fires every time the user scrolls




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
