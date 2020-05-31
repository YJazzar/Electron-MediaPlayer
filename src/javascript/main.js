const { app, BrowserWindow, ipcMain } = require('electron');         // For the electron app
const events = require('events');                           // To use alongside readDirectory() (required in the next line)
const { readDirectory } = require('./readDirectory.js');    // For the custom external function

let win; 



function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('./src/html/index.html')

    // Open the DevTools.
    // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


// This allows for the script to wait until the webpage is loaded 
ipcMain.on("loadDone", function(e, data) {
    win.webContents.send('alert');
    readDirectory(__dirname, win.webContents, 'tableFile:appendItems');
});
