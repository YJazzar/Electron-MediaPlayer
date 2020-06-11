const { dialog } = require('electron');
const config = require("D:/Projects/Electron-MediaPlayer/config.js");

const readDirectory = require(config.buildPath + config.jsSourcePath + 'fileOperations/readDirectory.js');    // For the custom external function
const Logger = require(config.loggerPath);

function chooseFolder(win, action) {
    Logger.logVerbose(__filename, "running chooseFolder() with action: " + action);

    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections', 'openDirectory'] }).then(folders => {
        // Check if the operation was cancelled
        if (folders.canceled) {
            Logger.logInfo(__filename, "Folder choosing operation was cancelled");
            return;
        }

        Logger.logInfo(__filename, "Folder choosing operation was completed");

        // Run through the directories in "folders" and call readDirectory on each: 
        readDirectory(folders.filePaths, win.webContents, action);

    }).catch(err => Logger.log(Logger.levelNames.error, __filename, err));
    
}

module.exports = chooseFolder;