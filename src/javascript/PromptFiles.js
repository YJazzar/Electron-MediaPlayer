const {dialog} = require('electron');
const { readDirectory } = require('./readDirectory.js');    // For the custom external function


function chooseFolder(win, action) {
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections', 'openDirectory'] }).then(folders => {
        // Check if the operation was cancelled
        if (folders.canceled) {
            console.log("Folder choosing operation was cancelled");
            return;
        }

        // Run through the directories in "folders" and call readDirectory on each: 
        readDirectory(folders.filePaths, win.webContents, action);
        
    }).catch(err => console.log(err));
    
    // return folder;
}

module.exports = {chooseFolder};