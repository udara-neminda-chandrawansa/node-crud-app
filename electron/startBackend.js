const { spawn } = require("child_process");
const path = require("path");

function startBackend() {

    const backend = spawn("npm", ["run", "dev"], {
        cwd: path.join(__dirname, "../backend"),
        shell: true
    });

    backend.stdout.on("data", (data) => {
        console.log(`Backend: ${data}`);
    });

}

module.exports = startBackend;