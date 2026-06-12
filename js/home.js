document.addEventListener('DOMContentLoaded', () => {
    const caseSprite = document.getElementById('caseSprite');
    const cpuSprite = document.getElementById('cpuSprite');
    const gpuSprite = document.getElementById('gpuSprite');
    const moboSprite = document.getElementById('moboSprite');
    const psuuSprite = document.getElementById('psuSprite');

    setPosition(caseSprite, "50%", "50%");
    setSize(caseSprite, "75%", "75%");

    setSize(cpuSprite, "20%");
    setSize(gpuSprite, "50%");
    setSize(moboSprite, "50%");
    setSize(psuuSprite, "50%");

    const draggableElements = document.querySelectorAll('.draggable');

    draggableElements.forEach(element => {
        console.log("Click detected on:", element.id);
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            
            const rect = element.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            element.style.zIndex = 1000;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const left = e.clientX - offsetX;
            const top = e.clientY - offsetY;

            element.style.left = `${left}px`;
            element.style.top = `${top}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
            isDragging = false;
            }
        });
    });
});