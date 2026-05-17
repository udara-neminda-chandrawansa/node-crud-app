const { spawn } = require("child_process");
const path = require("path");
const net = require("net");
const fs = require("fs");
const os = require("os");
const { execSync } = require("child_process");

const logFile = path.join(os.homedir(), ".crud-app-debug.log");

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage);
    try {
        fs.appendFileSync(logFile, logMessage);
    } catch (err) {
        // ignore file write errors
    }
}

function waitForPort(port, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        function check() {
            const socket = new net.Socket();
            socket.setTimeout(500);
            socket.on("connect", () => {
                socket.destroy();
                log(`✓ Backend is listening on port ${port}`);
                resolve();
            });
            socket.on("error", () => {
                socket.destroy();
                if (Date.now() - start >= timeout) {
                    const msg = `✗ Timeout waiting for port ${port}`;
                    log(msg);
                    reject(new Error(msg));
                } else {
                    setTimeout(check, 300);
                }
            });
            socket.on("timeout", () => {
                socket.destroy();
                if (Date.now() - start >= timeout) {
                    const msg = `✗ Timeout waiting for port ${port}`;
                    log(msg);
                    reject(new Error(msg));
                } else {
                    setTimeout(check, 300);
                }
            });
            socket.connect(port, "127.0.0.1");
        }
        check();
    });
}

function startBackend() {
    const { app } = require("electron");

    // extraResources copies backend to <resources>/backend (outside app.asar)
    const backendCwd = app.isPackaged
        ? path.join(process.resourcesPath, "backend")
        : path.join(__dirname, "../backend");

    const backendPath = path.join(backendCwd, "server.js");

    log(`Starting backend from: ${backendPath}`);
    log(`Backend CWD: ${backendCwd}`);
    log(`Node: ${process.execPath}`);

    const backend = spawn(process.execPath, [backendPath], {
        cwd: backendCwd,
        stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env, ELECTRON_RUN_AS_NODE: "1" }
    });

    backend.stdout.on("data", (data) => log(`[backend stdout] ${data.toString().trim()}`));
    backend.stderr.on("data", (data) => log(`[backend stderr] ${data.toString().trim()}`));

    log(`Backend process spawned with PID: ${backend.pid}`);

    backend.on("error", (err) => {
        log(`✗ Backend error: ${err.message}`);
    });

    backend.on("exit", (code, signal) => {
        log(`✗ Backend exited with code ${code} and signal ${signal}`);
    });

    return waitForPort(3000);
}

module.exports = startBackend;