const config = require("D:/Projects/Electron-MediaPlayer/config.js");

const Logger = require(config.loggerPath);

// TODO: Change how and were these extensions are stored
const fileExtensions = [".mp3", ".mp4", ".mkv"];

function filterResults(results) {
    Logger.logVerbose(__filename, "Now filtering the results returned from readDirectory()");
    Logger.logInfo(__filename, "Using these extensions for filtering: " + fileExtensions);
    
    // Create the array and push the {paths} object 
    let filteredR = [];
    filteredR.push(results[0]);

    for (let i = 1; i < results.length; i++) {
        // TODO dont push all of them and actually filter them:
        filteredR.push(results[i]);
    }

    return results;
}

module.exports = filterResults;