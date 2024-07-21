import * as THREE from 'three';
import { rgbToHex, rgbToHexNumber } from "./convert";

const baseElement = {
    treeElement: undefined,
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

export const elements = [
    {
        ...baseElement,
        geometry: {
            x: 0.1,
            y: 8,
            z: 0.1
        },
        material: {
            color: 0x00ff00
        },
        position: {
            x: -1.4,
            y: 0,
            z: 4.5
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0.039
        },
        init: async function() {
            const self = this;
            const currentState = await (await fetch("http://10.0.0.167/json/state")).json();
            if(currentState.on){
                const [r, g, b] = currentState.seg[0].col[0];
                self.treeElement.material.color.set(rgbToHexNumber(r, g, b));
            } else {
                self.treeElement.material.color.set(0xff0000);
            }
        },
        state: async function () {
            const self = this;
            const currentState = await (await fetch("http://10.0.0.167/json/state")).json();
            const nextState = !currentState.on;
            await fetch("http://10.0.0.167/json/state", {method: "POST", body: JSON.stringify({
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
            await fetch("http://10.0.0.167/json/state", {method: "POST", body: JSON.stringify({
                "seg": [{"col": [[r, g, b], [0, 0, 0], [0, 0, 0]]}]
            })});
            self.treeElement.material.color.set(rgbToHexNumber(r, g, b));
        }
    },
    {
        ...baseElement,
        geometry: {
            x: 0.1,
            y: 2,
            z: 0.1
        },
        material: {
            color: 0x00ff00
        },
        position: {
            x: 3.7,
            y: 5,
            z: 3.5
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        init: async function() {
            const self = this;
            const currentState = await (await fetch("http://10.0.0.33/json/state")).json();
            if(currentState.on){
                const [r, g, b] = currentState.seg[0].col[0];
                self.treeElement.material.color.set(rgbToHexNumber(r, g, b));
            } else {
                self.treeElement.material.color.set(0xff0000);
            }
        },
        state: async function () {
            const self = this;
            const currentState = await (await fetch("http://10.0.0.33/json/state")).json();
            const nextState = !currentState.on;
            await fetch("http://10.0.0.33/json/state", {method: "POST", body: JSON.stringify({
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
            await fetch("http://10.0.0.33/json/state", {method: "POST", body: JSON.stringify({
                "seg": [{"col": [[r, g, b], [0, 0, 0], [0, 0, 0]]}]
            })});
            self.treeElement.material.color.set(rgbToHexNumber(r, g, b));
        }
    }
]