const overlay = document.querySelector("#overlay");
const caseSide = document.querySelector("#caseSide");
const cpu = document.querySelector("#cpu");
cpu.zIndex = 2;
const gpu = document.querySelector("#gpu");
gpu.zIndex = 2;
const mobo = document.querySelector("#mobo");
mobo.zIndex = 1;
const psu = document.querySelector("#psu");
psu.zIndex = 1;

let installed = [];

let moboPlaced = false;
const draggableElements = document.querySelectorAll(".draggable");

function createDragZone(partId) {
	zone = document.createElement("div");
	zone.className = "drag-zone";
	zone.dataset.part = partId;

	const part = document.getElementById(partId);
	zone.style.width = getComputedStyle(part).width;
	zone.style.height = getComputedStyle(part).height;

	const caseRect = caseSide.getBoundingClientRect();

	if (partId === "cpu") {
		zone.style.top = `${caseRect.top + caseRect.height * 0.195}px`;
		zone.style.left = `${caseRect.left + caseRect.width * 0.385}px`;
	} else if (partId === "gpu") {
		zone.style.top = `${caseRect.top + caseRect.height * 0.4}px`;
		zone.style.left = `${caseRect.left + caseRect.width * 0.02}px`;
	} else if (partId === "mobo") {
		zone.style.top = `${caseRect.top + caseRect.height * 0.03}px`;
		zone.style.left = `${caseRect.left + caseRect.width * 0.06}px`;
	} else if (partId === "psu") {
		zone.style.top = `${caseRect.top + caseRect.height * 0.72}px`;
		zone.style.left = `${caseRect.left + caseRect.width * 0.03}px`;
	}

	document.body.appendChild(zone);
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
		zone.classList.add("shown");
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
			zone.classList.remove("shown");

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

					if (element.id === "cpu") {
						mobo.innerHTML = `<img src="assets/mobo-full.svg" />`;
						cpu.style.visibility = "hidden";
					}

					installed.push(element.id);

					if (installed.length === 4) {
						setTimeout(() => {
							window.location.replace("power.html");
						}, 250);
					}
				}
			}
		}
	});
});
