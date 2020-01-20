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

    //TEMP for DEV alignment
    let display = electron.screen.getPrimaryDisplay();
    let width = display.bounds.width;
    let height = display.bounds.height;

    mainWindow = new BrowserWindow({ frame: false, width: 900, height: 680, webPreferences: {
        nodeIntegration: true
    }});

    //TEMP for DEV alignment
    mainWindow.setPosition(width/2 - (900/2) - 450,height/2 - (680/2));
    
    mainWindow.loadURL(
    isDev
    ? "http://localhost:3000/"
    : `file://${path.join(__dirname, "../build/index.html/")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));

    secondWindow = new BrowserWindow({frame: false, width: 900, height: 680, webPreferences: {
        nodeIntegration: true
    }});

    //TEMP for DEV alignment
    secondWindow.setPosition(width/2 - (900/2) + 450,height/2 - (680/2));
    
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

// Makes sure that the app doesn"t open twice
app.on("activate", () => {
if (mainWindow === null) {
createWindow();
}
});

// IPCmain communicates between the selection and player windows
// no need to remove listeners, ipcMain closes and opens only with the app
ipc = electron.ipcMain;

// onClick send name of the video to be selected to the player
ipc.on("playIt", (event, arg) => {
        secondWindow.webContents.send("playIt",arg);
});

// onClick pause the video playing
ipc.on("pauseIt",(event, arg) => {
        secondWindow.webContents.send("pauseIt",arg);
});

// notify UI if video playing or paused
// notify UI of current vido path
// arg = [playing, source]
ipc.on("status",(event,arg)=>{
\        mainWindow.webContents.send("statusMain",arg);
        mainWindow.webContents.send("statusPop",arg);

});

// Easy debug logging
ipc.on("log",(event, arg) => {
    console.log(arg);
});