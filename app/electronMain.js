"use strict";

// Importing electron
var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    ipcMain = _require.ipcMain,
    Menu = _require.Menu; // For the electron app


var path = require("path"); // Importing custom scripts
// const { getMenuTemplate } = require('D:/Projects/Electron-MediaPlayer/src/com/tinyMnt/main/javascript/nodeScripts/helperFunctions/MenuTemplate.js');
// const Logger = require('D:/Projects/Electron-MediaPlayer/src/com/tinyMnt/main/javascript/nodeScripts/logger/Logger.js');


var win;

function createWindow() {
  console.log("here"); // Create the browser window.

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  }); // Logger.logInfo(__filename, "BrowserWindow created");
  // and load the index.html of the app.
  // win.loadFile('D:\\Projects\\Electron-MediaPlayer\\app\\index.html');

  console.log(path.join(__dirname, "index.html")); // console.log(__dirname);
  // win.loadFile('./app/index.html');

  win.loadFile(path.join(__dirname, "index.html")); // Open the DevTools.

  win.webContents.openDevTools(); // Quit app when closed 

  win.on('closed', function () {
    // Logger.logInfo(__filename, "Quitting application");
    app.quit();
  }); // Insert menu:
  // let menuTemplate = Menu.buildFromTemplate(getMenuTemplate(app, win));
  // if you comment this line out, you will get the boilerplate menu thats already there by default
  // Menu.setApplicationMenu(menuTemplate);
} // This method will be called when Electron has finished


app.whenReady().then(createWindow); // Quit when all windows are closed.

app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); // This allows for the script to wait until the webpage is loaded 

ipcMain.on("loadDone", function (e, data) {// Logger.logInfo(__filename, "Done loading everything");
}); // An event to use the logger from the electron browser

ipcMain.on("Logger", function (e, message) {// Logger.log(message.level, message.source, message.message);
});