import { app as _app, BrowserWindow as _BrowserWindow } from "electron";
const app = _app;
const BrowserWindow = _BrowserWindow;
import { join } from "path";
import isDev from "electron-is-dev";
import { autoUpdater } from 'electron-updater';

autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = "info"

let mainWindow;

function createWindow() {
    autoUpdater.checkForUpdatesAndNotify()
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(
    isDev
    ? "http://localhost:3000"
    : `file://${join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
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

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
  });

autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
    autoUpdater.quitAndInstall();
  });  

  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify()
  }, 60 * 60000)