const caseSide = document.getElementById("caseSide");
const cpu = document.getElementById("cpu");
cpu.zIndex = 2;
const gpu = document.getElementById("gpu");
gpu.zIndex = 2;
const mobo = document.getElementById("mobo");
mobo.zIndex = 1;
const psu = document.getElementById("psu");
psu.zIndex = 1;

const draggableElements = document.querySelectorAll(".draggable");

function createDragZone(partId) {
	zone = document.createElement("div");
	zone.className = "drag-zone";
	zone.dataset.part = partId;

	const part = document.getElementById(partId);
	zone.style.width = `calc(${getComputedStyle(part).width} + 10px)`;
	zone.style.height = `calc(${getComputedStyle(part).height} + 10px)`;


	if (partId === "cpu") {
		zone.style.top = "30%";
		zone.style.left = "35%";
	} else if (partId === "gpu") {
		zone.style.top = "50%";
		zone.style.left = "7%";
	} else if (partId === "mobo") {
		zone.style.top = "13%";
		zone.style.left = "7%";
	} else if (partId === "psu") {
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

		element.style.zIndex = 3;
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

			const elCenterX = elRect.left + elRect.width / 2;
			const elCenterY = elRect.top + elRect.height / 2;

			if (elCenterX >= zoneRect.left && elCenterX <= zoneRect.right && elCenterY >= zoneRect.top && elCenterY <= zoneRect.bottom) {
				element.style.left = `${zoneRect.left + 5}px`;
				element.style.top = `${zoneRect.top + 5}px`;
				element.dataset.snapped = "true";
			}
		}
	});
});
