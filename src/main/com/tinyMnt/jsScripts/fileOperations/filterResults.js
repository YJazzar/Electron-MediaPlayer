const config = require("D:/Projects/tnyPlayer/config.js");

const Logger = require(config.htmlLoggerPath);

// Get the file extensions that can be used
const fileExtensions = config.tableOptions.fileExtensions;

function applyFilter(fileObj) {
    // Logger.logDebug(__filename, "Using these extensions for filtering: " + fileExtensions);
    
    
    for (let i = 0; i < fileExtensions.length; i++) {
        if (fileObj.extension == fileExtensions[i])
            return true;
    }

    return false;
}

module.exports = applyFilter;