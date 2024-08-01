import * as THREE from 'three';
import { rgbToHexNumber } from "./convert";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const baseFloor = {
    active: false,
    threeElement: undefined,
    file: "",
    displayName: "",
    elements: [],
    init: function(){
        const self = this;
        console.log("Initialising Floor: "+ this.displayName)
    },
    create: async function(){
        const self = this;
        if(self.treeElement === undefined){
            const loadModel = () => {
                return new Promise((resolve, reject) => {
                    loader.load(
                        'obj/' + self.file, 
                        function (gltf) {
                            resolve(gltf.scene);
                        },
                        undefined, 
                        function (error) {
                            reject(error);
                        }
                    );
                });
            };
            try {
                const scene = await loadModel();
                self.threeElement = scene;
                self.init();
            }catch(e){
                console.error(error);
            }
        }
    }
}

const baseElement = {
    treeElement: undefined,
    ipAddress: "",
    geometry: {
        x: 0,
        y: 0,
        z: 0
    },
    material: {
        color: 0x00ff00
    },
    position: {
        x: 0,
        y: 0,
        z: 0
    },
    rotation: {
        x: 0,
        y: 0,
        z: 0
    },
    init: function () {
        const self = this;
    },
    state: function () {
        const self = this;
    },
    color: function () {
        const self = this;
    },
    create: function(){
        const self = this;
        if(self.treeElement === undefined){
            const geometry = new THREE.BoxGeometry(self.geometry.x, self.geometry.y, self.geometry.z);
            const material = new THREE.MeshBasicMaterial({ color: self.material.color});
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(self.position.x, self.position.y, self.position.z);
            cube.rotation.set(self.rotation.x, self.rotation.y, self.rotation.z);
            self.treeElement = cube;
            self.init();
        }
    }
}

const wledElement = {
    ...baseElement,
    init: async function() {
        const self = this;
        const currentState = await (await fetch(`http://${self.ipAddress}/json/state`)).json();
        if(currentState.on){
            const [r, g, b] = currentState.seg[0].col[0];
            self.treeElement.material.color.set(rgbToHexNumber(r, g, b));
        } else {
            self.treeElement.material.color.set(0xff0000);
        }
    },
    state: async function () {
        const self = this;
        const currentState = await (await fetch(`http://${self.ipAddress}/json/state`)).json();
        const nextState = !currentState.on;
        await fetch(`http://${self.ipAddress}/json/state`, {method: "POST", body: JSON.stringify({
            "on": nextState,
            "bri":255
        })});
        if(nextState){
            const [r, g, b] = currentState.seg[0].col[0];
            self.treeElement.material.color.set(rgbToHexNumber(r, g, b));
        } else {
            self.treeElement.material.color.set(0xff0000);
        }
    },
    color: async function (r, g, b) {
        const self = this;
        await fetch(`http://${self.ipAddress}/json/state`, {method: "POST", body: JSON.stringify({
            "seg": [{"col": [[r, g, b], [0, 0, 0], [0, 0, 0]]}]
        })});
        self.treeElement.material.color.set(rgbToHexNumber(r, g, b));
    }
}

export const floors = [
    {
        ...baseFloor,
        file: "1.OG.gltf",
        displayName: "Obergeschoss",
        elements: [
            {
                ...wledElement,
                ipAddress: "10.0.0.167",
                geometry: {
                    x: 0.1,
                    y: 8,
                    z: 0.1
                },
                material: {
                    color: 0xaaaaaa
                },
                position: {
                    x: -2,
                    y: -1,
                    z: 2.8
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0.039
                }
            },
            {
                ...wledElement,
                ipAddress: "10.0.0.33",
                geometry: {
                    x: 0.2,
                    y: 2,
                    z: 0.2
                },
                material: {
                    color: 0xaaaaaa
                },
                position: {
                    x: 5,
                    y: 7,
                    z: 1.3
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }
        ]
    },
    {
        ...baseFloor,
        file: "EG.gltf",
        displayName: "Erdgeschoss",
        elements: [
                {
                    ...wledElement,
                    ipAddress: "10.0.0.220",
                    geometry: {
                        x: 0.1,
                        y: 0.9,
                        z: 0.5
                    },
                    material: {
                        color: 0xaaaaaa
                    },
                    position: {
                        x: -1.6,
                        y: -6.2,
                        z: 1.3
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                }
        ]
    },

]