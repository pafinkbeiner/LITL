import * as THREE from 'three';

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
                self.treeElement.material.color.set(0x00ff00);
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
                self.treeElement.material.color.set(0x00ff00);
            } else {
                self.treeElement.material.color.set(0xff0000);
            }
        },
        color: async function () {
            const self = this;
            // TODO
        }
    },
    // {
    //     ...baseElement,
    //     geometry: {
    //         x: 2,
    //         y: 2,
    //         z: 2
    //     },
    //     material: {
    //         color: 0x00ff00
    //     },
    //     position: {
    //         x: -5,
    //         y: 0,
    //         z: 1
    //     },
    //     rotation: {
    //         x: 0,
    //         y: 0,
    //         z: 0.039
    //     }
    // }
]