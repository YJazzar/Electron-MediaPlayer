const { app, BrowserWindow } = require('electron');         // For the electron app
const events = require('events');                           // To use alongside readDirectory() (required in the next line)
const { readDirectory } = require('./readDirectory.js');    // For the custom external function


function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// TODO: Change  fs.readdir into a promise too (readDirectory() currently returns the wrong thing)
// let em = new events.EventEmitter();
// em.on('readDirectory', (data) => {
//     // console.dir(data);
//     console.log('event recieved... setting table');
//     let tbody = document.getElementById("fileTable");

//     tbody.innerHTML("<tr>< td > Alvin</td > <td>Eclair</td><td>$0.87</td><td>$0.87</td></tr >");


// });
// readDirectory(__dirname, em);