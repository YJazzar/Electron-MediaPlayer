

const {chooseFolder} = require('./PromptFiles');
const { logger } = require('D:/Projects/Electron-MediaPlayer/src/javascript/Logger.js');



function getMenuTemplate(app, win) {
    // Create a menu template
    // The menu is just an array of objects
    const mainMenuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open New Folder',
                    accelerator: process.platform == 'darwin' ? 'Command+O' : 'Ctrl+O',
                    click() {
                        // Log action and call the corresponsing function
                        logger.log("MenuTemplate.js", "getMenuTemplate(): Need to open a new folder");
                        chooseFolder(win, "tableFile:clearAndLoadItems");                        
                    }
                },
                {
                    label: 'Add Folder to Current List',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                    click() {
                        // Log action and call the corresponsing function
                        logger.log("MenuTemplate.js", "getMenuTemplate(): Need to add folder");
                        chooseFolder(win, "tableFile:appendItems");
                    }
                },
                {
                    label: 'Clear Items',
                    // accelerator: process.platform == 'darwin' ? 'Command+A' : 'Ctrl+A',
                    click() {
                        // Log action and call the corresponsing function
                        logger.log("MenuTemplate.js", "getMenuTemplate(): Clear Items called");
                        win.webContents.send("tableFile:clearItems");
                    }
                },
                {
                    label: 'Quit',
                    accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click() {
                        logger.log("MenuTemplate.js", "Quitting application");
                        app.quit();
                    }
                }
            ]
        }
    ]; // End of making the menu object

    // If the current system is a mac, then add an empty object to the beginning of the 
    // mainMenuTemplate array. 
    if (process.platform == 'darwin')
        mainMenuTemplate.unshift({});

    return mainMenuTemplate;
}


module.exports = { getMenuTemplate };