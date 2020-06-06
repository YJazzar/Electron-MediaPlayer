const { dialog } = require('electron');
const { readDirectory } = require('D:/Projects/Electron-MediaPlayer/src/com/tinyMnt/main/javascript/nodeScripts/helperFunctions/readDirectory.js');    // For the custom external function
const { logger } = require('D:/Projects/Electron-MediaPlayer/src/com/tinyMnt/main/javascript/nodeScripts/logger/Logger.js');

function chooseFolder(win, action) {
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections', 'openDirectory'] }).then(folders => {
        // Check if the operation was cancelled
        if (folders.canceled) {
            logger.log("PromptFiles.js", "Folder choosing operation was cancelled");
            return;
        }

        // Run through the directories in "folders" and call readDirectory on each: 
        readDirectory(folders.filePaths, win.webContents, action);

    }).catch(err => logger.log("PromptFiles.js", err));
    
}

module.exports = { chooseFolder };