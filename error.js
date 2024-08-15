export function logError(message) {
    const errorContainer = document.getElementById('error-container');

    if (!errorContainer) {
        console.error('Fehlercontainer nicht gefunden!');
        return;
    }

    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerText = message;

    errorContainer.appendChild(errorMessage);

    // Kleines Timeout, um den Fade-In-Effekt zu ermöglichen
    setTimeout(() => {
        errorMessage.style.opacity = '1';
    }, 10);

    // Entfernen der Nachricht nach 3 Sekunden mit Fade-Out-Effekt
    setTimeout(() => {
        errorMessage.style.opacity = '0';
        setTimeout(() => {
            errorContainer.removeChild(errorMessage);
        }, 300); // Timeout für den Fade-Out-Effekt
    }, 3000);
}