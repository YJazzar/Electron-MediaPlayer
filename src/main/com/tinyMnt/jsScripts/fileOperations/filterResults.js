const config = require("D:/Projects/Electron-MediaPlayer/config.js");

const Logger = require(config.loggerPath);

// TODO: Change how and were these extensions are stored
const fileExtensions = config.fileExtensions;

function applyFilter(fileObj) {
    Logger.logDebug(__filename, "Using these extensions for filtering: " + fileExtensions);
    
    
    for (let i = 0; i < fileExtensions.length; i++) {
        if (fileObj.extension == fileExtensions[i])
            return true;
    }

    return false;
}

module.exports = applyFilter;