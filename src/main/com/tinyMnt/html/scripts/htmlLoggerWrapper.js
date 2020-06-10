const { ipcRenderer } = require("electron");
const config = require("D:/Projects/Electron-MediaPlayer/config.js");

const getDateTime = require(config.buildPath + config.jsSourcePath + 'logger/DateAndTime.js');
const { levelNames } = require(config.buildPath + config.jsSourcePath + 'logger/LevelConstants.js');

// This function was made to make constructing of the json object needed to log easier
function log(level, source, message) {
    let temp = {
        level: level,
        time: getDateTime(),
        source: source,
        message: message,
    };

    ipcRenderer.send("Logger", temp);
}

// This function was made to quickly log "info" messages
function logInfo(source, message) {
    log(levelNames.info, source, message);
}

// This function was made to quickly log "error" messages
function logError(source, message) {
    log(levelNames.error, source, message);
}

module.exports = { log, logInfo, logError, levelNames };