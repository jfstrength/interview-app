const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let secondWindow

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: {
        nodeIntegration: true
    }});
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(
    isDev
    ? "http://localhost:3000/"
    : `file://${path.join(__dirname, "../build/index.html/")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));

    secondWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: {
        nodeIntegration: true
    } });
    secondWindow.webContents.openDevTools();
    secondWindow.loadURL(
        isDev
        ? "http://localhost:3000/vid"
        : `file://${path.join(__dirname, "../build/index.html/vid")}`
        );
    secondWindow.on("closed", () => (secondWindow = null));
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

ipc = electron.ipcMain;

ipc.on('testing', (event, arg) => {
    console.log('here',arg);
    mainWindow.webContents.send('reply','Did it!');
    secondWindow.webContents.send('reply','Did it!');
});
