const { app, BrowserWindow } = require("electron");
const path = require("path");
const startBackend = require("./startBackend");

function createWindow() {

    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: "icon.png",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile(
        path.join(__dirname, "../frontend/dist/index.html")
    );

    win.webContents.setWindowOpenHandler(() => {
        return { action: "deny" };
    });
}

app.whenReady().then(() => {
    startBackend(); // starts Express automatically
    createWindow();
});