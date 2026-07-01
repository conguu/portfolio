let title = document.querySelector("#title");
let console = document.querySelector("#console-lines");
title.innerHTML = "Booting Conner's Portfolio";

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
    let loaded = false;
    let dotCount = 0;
    let interval = setInterval(() => {
        title.innerHTML += ".";
        dotCount++;
        if (dotCount > 3) {
            title.innerHTML = "Booting Conner's Portfolio";
            dotCount = 0;
        }

        if (loaded) clearInterval(interval);
    }, 500);
}

let lineIndex = 0;
function showRandomLine() {
	if (lineIndex >= consoleLines.length) {
		loaded = true;
		return;
	}

	let randIndex = Math.floor(Math.random() * consoleLines.length);
	let line = consoleLines.splice(randIndex, 1)[0];

	console.innerHTML += line;

	setTimeout(() => {
		console.innerHTML += " OK<br>";
		lineIndex++;
		setTimeout(showRandomLine, 500);
	}, 1000);
}

showRandomLine();