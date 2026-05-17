const { app, BrowserWindow } = require("electron");

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

    win.loadURL("http://localhost:5173");

}

app.whenReady().then(() => {
    createWindow();
});