const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

// This is the Electron app configuration. It contains event emitters
// for the app process and also for the ICPmain between windows

let mainWindow;
let secondWindow;

// Creates both the player window and selection window on startup (ready)
function createWindow() {

    let devMode = false;
    let main_display, displays;
    let width, height;
    let main_window_height, main_window_width, second_width, second_height;
    let x_pos, y_pos;

    // Get the external display screen and its dimensions/positions
    //     displays = electron.screen.getAllDisplays();
    //     externalDisplay = displays.find((display) => {
    //     return display.bounds.x !== 0 || display.bounds.y !== 0;
    // });
    //     x_pos = externalDisplay.bounds.x + 50;
    //     y_pos = externalDisplay.bounds.y + 50;

    main_display = electron.screen.getPrimaryDisplay();
    

    // Create first window
    mainWindow = new BrowserWindow({ x: 0, y: 0, show: false, frame: false, webPreferences: {
        nodeIntegration: true
    }});
    mainWindow.setKiosk(true);
    mainWindow.show();

    // Load UI into the first window
    mainWindow.loadURL(
    isDev
    ? "http://localhost:3000/"
    :  `file://${path.join(__dirname, "index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));

    // Create second window
    secondWindow = new BrowserWindow({x: 0, y: 0, show: false, frame: false,  webPreferences: {
        nodeIntegration: true
    }});
    secondWindow.setFullScreen(true);
    secondWindow.show();

    // Load video player into second window
    secondWindow.loadURL(
        isDev
        ? "http://localhost:3000/vid"
        : `file://${path.join(__dirname, "index.html/vid")}`
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

app.commandLine.appendSwitch('disable-backgrounding-occluded-windows', 'true')

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
        mainWindow.webContents.send("statusMain",arg);
        mainWindow.webContents.send("statusPop",arg);

});

// Easy debug logging
ipc.on("log",(event, arg) => {
    console.log(arg);
});