document.addEventListener('DOMContentLoaded', () => {
    const caseTop = document.querySelector("#caseTop");
    const powerButton = document.querySelector("#powerButton");
    const help = document.querySelector("#help");

    overlay.style.opacity = 0;

    powerButton.addEventListener("click", function() {
        overlay.style.opacity = 1;
        overlay.style.pointerEvents = "auto";
        setTimeout(() => {
            window.location.href = "boot.html";
        }, 500);
    });

    let inactivityTimer;

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        help.classList.remove("visible");
        powerButton.style.border = "none";

        inactivityTimer = setTimeout(() => {
            help.classList.add("visible");
            powerButton.style.animation = "borderGlow 1s ease infinite";

        }, 4500);
    }

    document.addEventListener("click", resetInactivityTimer);
    resetInactivityTimer();
});