const { spawn, execFile } = require("child_process");

// const run = async () => {
// 	const { stdout } = await execFile("./testFile.sh", { shell: true });
// 	console.log(stdout);
// 	// const bat = spawn('"./testFile.sh"', ["a", "b"], { shell: true });
// };

// run();
execFile(
	"C://Users/balag/Downloads/tsetup-x64.4.1.0",
	{ shell: true },
	(error, stdout, stderr) => {
		if (error) return console.log(`error : ${error}`);
		if (stderr) return console.log(`command error: ${stderr}`);
		return console.log(`stdout : ${stdout}`);
	}
);

// const child = spawn("sh ./testFile.sh", [1, 0], { shell: true });

// child.stdout.on("data", (data) => {
// 	console.log(data.toString());
// });

// child.stderr.on("data", (data) => {
// 	console.log("command error: ", data.toString());
// });

// child.on("error", (error) => {
// 	console.log("error: ", error.message);
// });
