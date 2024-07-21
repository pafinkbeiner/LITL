function invokeColorPicker(x, y, currentColor) {

    let colorPickerContainer = document.getElementById('colorPickerContainer');
    if (!colorPickerContainer) {
        colorPickerContainer = document.createElement('div');
        colorPickerContainer.id = 'colorPickerContainer';
        colorPickerContainer.innerHTML = `
            <input type="color" id="colorPicker">
            <button id="closeColor">Close</button>
            <button id="submitColor">Submit</button>
        `;
        document.body.appendChild(colorPickerContainer);
    }

    // Set initial coloring
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.value = currentColor;

    // Styling
    colorPickerContainer.style.position = 'absolute';
    colorPickerContainer.style.left = `${x}px`;
    colorPickerContainer.style.top = `${y}px`;

    // Show Container
    colorPickerContainer.style.display = 'block';

    // Return a promise that resolves with the chosen color
    return new Promise((resolve) => {
        const submitButton = document.getElementById('submitColor');
        const closeButton = document.getElementById('closeColor');
        closeButton.onclick = () => {
            colorPickerContainer.style.display = 'none';
            resolve(undefined);
        };
        submitButton.onclick = () => {
            const chosenColor = colorPicker.value;
            colorPickerContainer.style.display = 'none';
            resolve(chosenColor);
        };
    });
}