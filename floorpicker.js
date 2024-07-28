export function setupFloorPicker(scene){

    let floorPickerContainer = document.getElementById('floorPickerContainer');
    if (floorPickerContainer) {
        console.log("Appending floors...");
        (async () => {
            const floors = await (await fetch("/floors.json")).json();
            floors.forEach(floor => {
                const floorId = `floor-button-${floor.id}`;
                console.log("Appending: " + `${floor.displayName}`);
                floorPickerContainer.innerHTML += `<div id="${floorId}" style="cursor: pointer; padding: 1rem;">${floor.displayName}</div>`
                document.getElementById(floorId).addEventListener("click", (ev) => {
                    invokeFloorPicker(floor.id);
                })
            });
        })();
    }
    
    function invokeFloorPicker(index) {
    
        console.log("loading floor: ", index);
    
        if(scene){
            console.log(scene)
        }
        // let house; 
        // loader.load( 'obj/house.gltf', function ( gltf ) {
        //     house = gltf.scene;
        //     group.add(house);
        // }, undefined, function ( error ) {
        //     console.error( error );
        // });
    }
}

