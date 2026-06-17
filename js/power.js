document.addEventListener('DOMContentLoaded', () => {
    const caseTop = document.getElementById('caseTop');
    const powerButton = document.getElementById('powerButton');

    function startPC() {
        caseTop.style.opacity = 0;
    }

    powerButton.addEventListener("click", function() {startPC()});
});