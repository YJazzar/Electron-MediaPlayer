const { dialog } = require('electron');
const { readDirectory } = require('D:/Projects/Electron-MediaPlayer/src/com/tinyMnt/main/javascript/nodeScripts/helperFunctions/readDirectory.js');    // For the custom external function
const Logger = require('D:/Projects/Electron-MediaPlayer/src/com/tinyMnt/main/javascript/nodeScripts/logger/Logger.js');

function chooseFolder(win, action) {
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections', 'openDirectory'] }).then(folders => {
        // Check if the operation was cancelled
        if (folders.canceled) {
            Logger.logInfo(__filename, "Folder choosing operation was cancelled");
            return;
        }

        // Run through the directories in "folders" and call readDirectory on each: 
        readDirectory(folders.filePaths, win.webContents, action);

    }).catch(err => Logger.log(Logger.levelNames.error, "PromptFiles.js", err));
    
}

module.exports = { chooseFolder };