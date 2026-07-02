(function () {
	if (localStorage.getItem("highContrast") === "true") {
		document.body.classList.add("high-contrast");
	}
	if (localStorage.getItem("largeText") === "true") {
		document.body.classList.add("large-text");
	}
})();

document.addEventListener("keydown", (event) => {
	if (event.key === "Enter" && window.location.pathname != "/conos.html") {
		window.location.href = "conos.html";
	}
});
