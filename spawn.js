const { spawn, execFile } = require("child_process");
const { stdin, stderr } = require("process");

const spawnProcess = (command = "") => {
	let cmd = command.split(" ")[0];
	const args = command.split(" ").slice(1);

	try {
		if (cmd === "cd") {
			return process.chdir(args[0].trim("\r\n"));
		}

		if (
			cmd.indexOf("/") >= 0 ||
			cmd.indexOf(".") >= 0 ||
			cmd.indexOf("\\") >= 0
		) {
			if (args.length && args[0].includes(".js")) {
				process.chdir(cmd);
				cmd = "node";
			}

			if (
				cmd.includes(".exe") ||
				cmd.includes(".bin") ||
				cmd.includes(".sh")
			) {
				if (cmd.includes(".sh")) cmd = "sh " + cmd;
				const executor = execFile(
					cmd,
					[args],
					{ shell: true },
					(error, stdout, stderr) => {
						if (error) console.log(`error : ${error}`);
						if (stderr) console.log(`command error: ${stderr}`);
						return executor;
					}
				);
			}
		}

		const child = spawn(cmd, args, { shell: true });

		child.stdout.on("data", (data) => {
			const first = data.toString().split(" ")[1].match(/\d+/)[0];
			console.log(first);
			console.log(`${data}`);
		});

		child.stderr.on("data", (data) => {
			console.log("command error: ", data.toString());
		});

		child.on("error", (error) => {
			console.log("error: ", error.message);
		});

		child.on("close", () => {
			if (cmd.trim() === "exit") return process.exit();
		});
		return child;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports.spawnProcess = spawnProcess;
