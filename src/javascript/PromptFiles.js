const { dialog } = require('electron');
const { readDirectory } = require('./readDirectory.js');    // For the custom external function
const { logger } = require('./Logger.js');

function chooseFolder(win, action) {
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections', 'openDirectory'] }).then(folders => {
        // Check if the operation was cancelled
        if (folders.canceled) {
            logger.log("Folder choosing operation was cancelled");
            return;
        }

        // Run through the directories in "folders" and call readDirectory on each: 
        readDirectory(folders.filePaths, win.webContents, action);

    }).catch(err => logger.log(err));
    
}

module.exports = { chooseFolder };