export function rgbToHex(r, g, b) {
    // Ensure r, g, b are within the valid range
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Convert each component to a 2-digit hexadecimal string
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    // Concatenate and format as 0xRRGGBB
    return `0x${hexR}${hexG}${hexB}`;
}

export function hexToRgb(hex) {
    // Remove the leading # if it's there
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values from the hex string
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

export function rgbToHexNumber(r, g, b) {
    return (r << 16) + (g << 8) + b;
}