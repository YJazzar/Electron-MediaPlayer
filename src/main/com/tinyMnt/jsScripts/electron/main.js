require("@babel/polyfill");

// Importing electron
const { app, BrowserWindow, ipcMain, Menu } = require('electron');         // For the electron app

// Importing custom scripts
const config = require("D:/Projects/Electron-MediaPlayer/config.js");

// Use config to construct imports:
const getMenuTemplate = require(config.buildPath + config.jsSourcePath + 'electron/MenuTemplate.js');
const Logger = require(config.buildPath + config.jsSourcePath + 'logger/Logger.js');


let win;

function createWindow() {
    Logger.log(Logger.levelNames.debug, __filename, "Starting function createWindow()");

    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    Logger.logVerbose(__filename, "BrowserWindow object created");
    
    // and load the index.html of the app.
    win.loadFile(config.buildPath + config.htmlSourcePath + 'index.html')

    // Open the DevTools.
    win.webContents.openDevTools()

    // Quit app when closed 
    win.on('closed', function () {
        Logger.logInfo(__filename, "Quitting application");
        app.quit();
    });

    // Insert menu:
    let menuTemplate = Menu.buildFromTemplate(getMenuTemplate(app, win));
    // if you comment this line out, you will get the boilerplate menu thats already there by default
    Menu.setApplicationMenu(menuTemplate);

    Logger.logVerbose(__filename, "Finished creating window app and started loading html resources");
}

// This method will be called when Electron has finished
app.whenReady().then(createWindow)



// Quit when all windows are closed.
app.on('window-all-closed', () => {
    Logger.logVerbose(__filename, "All windows were closed... exit app now.");

    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    Logger.logVerbose(__filename, "App was activated from task bar.");

    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


// This allows for the script to wait until the webpage is loaded 
ipcMain.on("loadDone", function (e, data) {
    Logger.logVerbose(__filename, "The main BrowserWindow has been fully loaded.");
});

// An event so the html files from the electron browser can use the logger 
ipcMain.on("Logger", (e, message) => {
    Logger.log(message.level, message.source, message.message);
})