import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { elements } from "./elements";
import { hexToRgb } from "./convert";
import { invokeColorPicker } from './colorpicker';
import { setupFloorPicker } from './floorpicker';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// SET CAMERA AND DISPLAY
camera.position.z = 20;
document.getElementById("currentZoom").innerText = parseFloat(camera.position.z).toFixed(2);

// ADD RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// ADD GLTF FILE
const loader = new GLTFLoader();
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 5;
controls.maxDistance = 50;
controls.zoomSpeed = 1.2;

// ADD LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// CREATE GROUP
const group = new THREE.Group();

// LOAD HOUSE GLTF
let house; 
loader.load( 'obj/house.gltf', function ( gltf ) {
	house = gltf.scene;
	group.add(house);
}, undefined, function ( error ) {
	console.error( error );
});

// LIGHTS
elements.forEach(e => e.create())
elements.forEach(e => group.add(e.treeElement));

// ADD GROUP 
group.rotation.x = 5;
group.rotation.z = 0.8;
scene.add(group);

// REGISTER LISTENERS
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let moveSpeed = 0.2;
document.addEventListener('keydown', (event) => {
    if (group) { // Ensure the house object is loaded before moving
        switch (event.key) {
            case 'ArrowUp':
                group.rotation.x -= moveSpeed; // Move up
                break;
            case 'ArrowDown':
                group.rotation.x += moveSpeed; // Move down
                break;
            case 'ArrowLeft':
                group.rotation.z -= moveSpeed; // Move left
                break;
            case 'ArrowRight':
                group.rotation.z += moveSpeed; // Move right
                break;
        }
    }
});

document.getElementById('moveLeftUp').addEventListener('click', () => {
	if (group) group.rotation.x -= moveSpeed;
	if (group) group.rotation.z -= moveSpeed;
});

document.getElementById('moveUp').addEventListener('click', () => {
	if (group) group.rotation.x -= moveSpeed;
});

document.getElementById('moveRightUp').addEventListener('click', () => {
	if (group) group.rotation.x -= moveSpeed;
	if (group) group.rotation.z += moveSpeed;
});

document.getElementById('moveLeft').addEventListener('click', () => {
	if (group) group.rotation.z -= moveSpeed;
});

document.getElementById('moveHome').addEventListener('click', () => {
	if (group) group.rotation.x = 5;
    if (group) group.rotation.z = 0.8;
});

document.getElementById('moveRight').addEventListener('click', () => {
	if (group) group.rotation.z += moveSpeed;
});

document.getElementById('moveLeftDown').addEventListener('click', () => {
	if (group) group.rotation.x += moveSpeed;
	if (group) group.rotation.z -= moveSpeed;
});

document.getElementById('moveDown').addEventListener('click', () => {
	if (group) group.rotation.x += moveSpeed;
});

document.getElementById('moveRightDown').addEventListener('click', () => {
	if (group) group.rotation.x += moveSpeed;
	if (group) group.rotation.z += moveSpeed;
});

document.getElementById('zoomIn').addEventListener('click', () => {
    if (group) camera.position.z -= moveSpeed;
    document.getElementById("currentZoom").innerText = parseFloat(camera.position.z).toFixed(2);
});

document.getElementById('zoomOut').addEventListener('click', () => {
	if (group) camera.position.z += moveSpeed;
    document.getElementById("currentZoom").innerText = parseFloat(camera.position.z).toFixed(2);
});

// Raycaster for detecting mouse clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the raycaster
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
        for(const element of elements){
            if(intersects[i].object === element.treeElement){
                element.state();
                break;
            }
        }
    }
}

async function onRightMouseClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the raycaster
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
        for(const element of elements){
            if(intersects[i].object === element.treeElement){
                const color = await invokeColorPicker(event.clientX + 20, event.clientY - 40, '#ff0000');
                const {r, g, b} = hexToRgb(color);
                await element.color(r, g, b);
                console.log(color)
                break;
            }
        }
    }
}

window.addEventListener('click', onMouseClick, false);
window.addEventListener('contextmenu', onRightMouseClick, false);

setupFloorPicker(scene);

// ANIMATION LOOP
function animate() {
    controls.update();
    renderer.render(scene, camera);
}