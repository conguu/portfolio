let title = document.querySelector("#title");
let console = document.querySelector("#console-lines");

let consoleLines = [
	"Rendering text...",
	"Mining diamonds...",
	"Programming operating system...",
	"Initializing system...",
	"Loading kernel modules...",
	"Mounting filesystems...",
	"Loading network drivers...",
	"Establishing internet connection...",
	"Fetching GitHub repositories...",
	"Compiling portfolio assets...",
	"Loading project...",
];

function titleLoad() {
    let dotCount = 0;
    let interval = setInterval(() => {
        title.innerHTML += ".";
        dotCount++;
        if (dotCount > 3) {
            title.innerHTML = "Starting Conner's Portfolio";
            dotCount = 0;
        }
    }, 500);
}

function randomDelay(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let lineIndex = 0;
function showRandomLine() {
    if (consoleLines.length === 0) {
        console.innerHTML += "All systems operational. Booting conOS...";
        setTimeout(() => {window.location.href = "conos.html"}, 500);
        return;
    }
	let randIndex = Math.floor(Math.random() * consoleLines.length);
	let line = consoleLines.splice(randIndex, 1)[0];

	console.innerHTML += line;

	setTimeout(() => {
		console.innerHTML += " OK<br>";
		lineIndex++;
		setTimeout(showRandomLine, 150);
	}, randomDelay(0, 900));
}

titleLoad();
setTimeout(showRandomLine, 300);