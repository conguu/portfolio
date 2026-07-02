const boot = document.querySelector("#boot");
const os = document.querySelector("#os");
const desktop = document.querySelector("#desktop");
const settings = document.querySelector("#settings");

let files = [
	{ name: "About", type: "html" },
	{ name: "Projects", type: "folder" },
	{ name: "Resume", type: "pdf" },
	{ name: "Contact", type: "rtf" },
	{ name: "Links", type: "folder" },
];

async function start() {
    await wait(400);
    boot.classList.add("visible");
    await wait(2000);
    boot.classList.remove("visible");
    initOS();
}

function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function initOS() {
	os.style.opacity = 1;
	os.style.visibility = "visible";

    files.forEach((file) => {
        if (file.type === "html") {
            file.icon = "assets/apps/html.svg";
        } else if (file.type === "folder") {
            file.icon = "assets/apps/folder.svg";
        } else if (file.type === "pdf") {
            file.icon = "assets/apps/pdf.svg";
        } else if (file.type === "rtf") {
            file.icon = "assets/apps/rtf.svg";
        }
    });

    setInterval(updateClock, 1000);
    updateClock();
    renderDesktop();

    settings.addEventListener("click", () => {
        document.querySelector("#window-title").textContent = "Settings";
        document.querySelector("#window-frame").src = "windows/Settings.html";
        document.querySelector("#window").classList.add("open");
    });
}

function updateClock() {
	const clock = document.querySelector("#clock");
	const now = new Date();
	const hours = now.getHours();
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	const displayHours = hours % 12 || 12;
	const month = now.getMonth() + 1;
	const day = now.getDate();
	const year = now.getFullYear();
	clock.innerHTML = `${displayHours}:${minutes} ${ampm} <br> ${month}/${day}/${year}`;
}

function renderDesktop() {
    files.forEach((file) => {
        if (file.type != "folder") {
            desktop.innerHTML += `<div id="${file.name}" class="desk-app"><img src="${file.icon}"><p>${file.name}.${file.type}</p></div>`;
        } else {
            desktop.innerHTML += `<div id="${file.name}" class="desk-app"><img src="${file.icon}"><p>${file.name}</p></div>`;
        }
    });

    document.addEventListener("click", (event) => {
        const clicked = event.target.closest(".desk-app");
        if (!clicked) return;

        if (clicked.id === "About") {
            document.querySelector("#window-title").textContent = "About";
            document.querySelector("#window-frame").src = "windows/about.html";
            document.querySelector("#window").classList.add("open");
        } else if (clicked.id === "Projects") {
            document.querySelector("#window-title").textContent = "Projects";
            document.querySelector("#window-frame").src = "windows/projects.html";
            document.querySelector("#window").classList.add("open");
        } else if (clicked.id === "Resume") {
            document.querySelector("#window-title").textContent = "Resume.pdf";
            document.querySelector("#window-frame").src = "windows/resume.pdf";
            document.querySelector("#window").classList.add("open");
        } else if (clicked.id === "Contact") {
            document.querySelector("#window-title").textContent = "Contact";
            document.querySelector("#window-frame").src = "windows/contact.html";
            document.querySelector("#window").classList.add("open");
        } else if (clicked.id === "Links") {
            document.querySelector("#window-title").textContent = "Links";
            document.querySelector("#window-frame").src = "windows/Links.html";
            document.querySelector("#window").classList.add("open");
        }
    });

    document.querySelector("#window-close").addEventListener("click", () => {
        document.querySelector("#window").classList.remove("open");
    });
}

start();