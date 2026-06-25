document.addEventListener("DOMContentLoaded", () => {
	const caseSide = document.getElementById("caseSide");
	const cpu = document.getElementById("cpu");
	const gpu = document.getElementById("gpu");
	const mobo = document.getElementById("mobo");
	const psu = document.getElementById("psu");

	const draggableElements = document.querySelectorAll(".draggable");

	draggableElements.forEach((element) => {
		let isDragging = false;
		let offsetX = 0;
		let offsetY = 0;

		element.addEventListener("mousedown", (e) => {
			isDragging = true;

			const rect = element.getBoundingClientRect();
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;

			element.style.zIndex = 4;
		});

		document.addEventListener("mousemove", (e) => {
			if (!isDragging) return;

			const left = e.clientX - offsetX;
			const top = e.clientY - offsetY;

			element.style.left = `${left}px`;
			element.style.top = `${top}px`;
		});

		document.addEventListener("mouseup", () => {
			if (isDragging) {
				isDragging = false;
			}
		});
	});
});
