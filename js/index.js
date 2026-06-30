const caseSide = document.getElementById("caseSide");
const cpu = document.getElementById("cpu");
cpu.zIndex = 2;
const gpu = document.getElementById("gpu");
gpu.zIndex = 2;
const mobo = document.getElementById("mobo");
mobo.zIndex = 1;
const psu = document.getElementById("psu");
psu.zIndex = 1;


let moboPlaced = false;
const draggableElements = document.querySelectorAll(".draggable");

function createDragZone(partId) {
	zone = document.createElement("div");
	zone.className = "drag-zone";
	zone.dataset.part = partId;

	const part = document.getElementById(partId);
	zone.style.width = getComputedStyle(part).width;
	zone.style.height = getComputedStyle(part).height;

	if (partId === "cpu") {
		zone.style.top = "23%";
		zone.style.left = "34%";
	} else if (partId === "gpu") {
		zone.style.top = "42%";
		zone.style.left = "4%";
	} else if (partId === "mobo") {
		zone.style.top = "8%";
		zone.style.left = "7%";
	} else if (partId === "psu") {
		zone.style.top = "69%";
		zone.style.left = "6%";
	}

	caseSide.appendChild(zone);
	return zone;
}

draggableElements.forEach((element) => {
	let isDragging = false;
	let offsetX = 0;
	let offsetY = 0;

	const zone = createDragZone(element.id);

	element.addEventListener("mousedown", (e) => {
		if (element.dataset.snapped === "true") return;
		isDragging = true;

		const rect = element.getBoundingClientRect();
		offsetX = e.clientX - rect.left;
		offsetY = e.clientY - rect.top;

		element.style.zIndex = 4;
	});

	document.addEventListener("mousemove", (e) => {
		if (!isDragging) return;
		if (element.dataset.snapped === "true") return;

		const left = e.clientX - offsetX;
		const top = e.clientY - offsetY;

		element.style.left = `${left}px`;
		element.style.top = `${top}px`;
	});

	document.addEventListener("mouseup", () => {
		element.style.zIndex = element.zIndex;

		if (isDragging) {
			isDragging = false;

			const elRect = element.getBoundingClientRect();
			const zoneRect = zone.getBoundingClientRect();

			const elCenterX = elRect.left + elRect.width / 3;
			const elCenterY = elRect.top + elRect.height / 3;

			if ((element.id === "cpu" || element.id === "gpu") && moboPlaced == false) {
				return;
			} else {
				if (elCenterX >= zoneRect.left && elCenterX <= zoneRect.right && elCenterY >= zoneRect.top && elCenterY <= zoneRect.bottom) {
					element.style.left = `${zoneRect.left - 2}px`;
					element.style.top = `${zoneRect.top + 2}px`;
					element.dataset.snapped = "true";

					if (element.id === "mobo") {
						moboPlaced = true;
					}
				}
			}
		}
	});
});
