const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const startBackend = require("./startBackend");

const logFile = path.join(os.homedir(), ".crud-app-debug.log");

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage);
    try {
        fs.appendFileSync(logFile, logMessage);
    } catch (err) {
        // ignore
    }
}

function createWindow() {
    log("Creating window...");

    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: "icon.png",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    const isDev = !app.isPackaged;

    if (isDev) {
        log("Dev mode: Loading http://localhost:5173");
        win.loadURL("http://localhost:5173");
    } else {
        log("Production mode: Loading frontend from dist");
        win.loadFile(
            path.join(__dirname, "../frontend/dist/index.html")
        );
    }

    log("Window created successfully");

    win.webContents.setWindowOpenHandler(() => {
        return { action: "deny" };
    });
}

app.whenReady().then(async () => {
    log("App ready!");
    if (app.isPackaged) {
        log("App is packaged, starting backend...");
        try {
            await startBackend();
            log("✓ Backend started successfully");
        } catch (err) {
            log(`✗ Failed to start backend: ${err.message}`);
        }
    }
    createWindow();
});