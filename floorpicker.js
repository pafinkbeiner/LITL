import { floors } from "./elements";
import { loadFloor } from "./main";

export function setupFloorPicker() {
    let floorPickerContainer = document.getElementById('floorPickerContainer');
    if (floorPickerContainer) {
        console.log("Appending floors...", floors.length);
        floors.forEach((floor, index) => {
            const floorId = `floor-button-${index}`;
            const floorButton = document.createElement('div');
            floorButton.id = floorId;
            floorButton.style.cursor = 'pointer';
            floorButton.style.padding = '1rem';
            floorButton.innerText = floor.displayName;

            floorPickerContainer.appendChild(floorButton);

            floorButton.addEventListener("click", async (ev) => {
                await loadFloor(index);
            });
        });
    }
}