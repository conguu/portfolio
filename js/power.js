document.addEventListener('DOMContentLoaded', () => {
    const caseTop = document.getElementById('caseTop');
    const powerButton = document.getElementById('powerButton');

    overlay.style.opacity = 0;

    powerButton.addEventListener("click", function() {
        overlay.style.opacity = 1;
        overlay.style.pointerEvents = "auto";
        setTimeout(() => {
            window.location.href = "bios.html";
        }, 500);
    });
});