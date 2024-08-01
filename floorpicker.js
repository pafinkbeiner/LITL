import { floors } from "./elements";
import { loadFloor } from "./main";

export function setupFloorPicker() {
    let floorPickerContainer = document.getElementById('floorPickerContainer');
    if (floorPickerContainer) {
        floors.forEach((floor, index) => {
            const floorId = `floor-button-${index}`;
            const floorButton = document.createElement('div');
            floorButton.id = floorId;
            floorButton.style.cursor = 'pointer';
            floorButton.style.padding = '1rem';
            floorButton.style.display = "flex";
            floorButton.style.alignItems = "center";
            floorButton.style.justifyContent = "space-between";
            floorButton.innerText = floor.displayName;

            const imgElement = document.createElement('img');
            imgElement.style.height = '2rem';
            imgElement.style.zIndex = 2;
            imgElement.src = `data:image/png;base64,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`
            floorButton.appendChild(imgElement);
            imgElement.addEventListener("click", (ev) => {
                ev.stopPropagation();
                const activeFloor = floors.find(f => f.active);
                if(activeFloor !== undefined){
                    activeFloor.elements.forEach(e => e.state())
                }
            })

            floorPickerContainer.appendChild(floorButton);

            floorButton.addEventListener("click", async (ev) => {
                await loadFloor(index);
            });
        });
    }
}