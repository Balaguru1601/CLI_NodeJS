const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const ansi = require("tui-lib/util/ansi");
const { spawnProcess } = require("./spawn");
// process.stdin.setRawMode(true);

// process.stdin.on("keypress", (str, key) => {
// 	const pid = process.pid;
// 	if (key.ctrl && key.name === "z") {
// 		console.log(pid);
// 		ntsuspend.suspend(pid);
// 		console.log(pid);
// 		setTimeout(() => ntsuspend.resume(pid), 2000);
// 		return process.exit();
// 	}
// });

const cleanTerminal = () => {
	process.stdout.write(ansi.cleanCursor());
	process.stdout.write(ansi.disableAlternateScreen());
};

const rl = readline.createInterface({ input, output });
let child;

rl.on("line", (inp) => {
	child = spawnProcess(inp);
});

// process.stdin.on("keypress", (str, key) => {
// 	try {
// 		if (key.ctrl && key.name === "z") {
// 			console.log(child.pid);
// 			child.kill("SIGINT");
// 			cleanTerminal();
// 		}
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// });

rl.on("SIGTSTP", () => {
	console.log(child.pid);
	rl.pause();
});

rl.on("SIGINT", (data) => {
	console.log(data);
	console.log("Bye Bye");
	process.exit(0);
});
