const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(
    isDev
    ? "http://localhost:3000/main"
    : `file://${path.join(__dirname, "../build/index.html/main")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));

    secondWindow = new BrowserWindow({ width: 900, height: 680 });
    secondWindow.loadURL(
        isDev
        ? "http://localhost:3000/vid"
        : `file://${path.join(__dirname, "../build/index.html/vid")}`
        );
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
if (process.platform !== "darwin") {
app.quit();
}
});

app.on("activate", () => {
if (mainWindow === null) {
createWindow();
}
});
