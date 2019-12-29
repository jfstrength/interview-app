const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

// This is the Electron app configuration it contains event emitters
// for the app process and also for the ICPmain between windows

let mainWindow;
let secondWindow;

// Creates both the player window and selection window on startup
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

// Calls createWindow when background is ready
app.on("ready", createWindow)

// Ensures that process ends correctly
app.on("window-all-closed", () => {
if (process.platform !== "darwin") {
app.quit();
}
});

// Makes sure that the app doesn't open twice
app.on("activate", () => {
if (mainWindow === null) {
createWindow();
}
});

// IPCmain communicates between the selection and player windows
ipc = electron.ipcMain;

// onClick send name of the video to be selected to the player
ipc.on('testing', (event, arg) => {
    secondWindow.webContents.send('reply',arg);
});
