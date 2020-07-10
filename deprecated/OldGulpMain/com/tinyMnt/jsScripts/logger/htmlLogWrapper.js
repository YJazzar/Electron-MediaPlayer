const { ipcRenderer } = require("electron");
const config = require("D:/Projects/tnyPlayer/config.js");

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

// This function was made to quickly log "verbose" messages
function logVerbose(source, message) {
    log(levelNames.verbose, source, message);
}

// This function was made to quickly log "debug" messages
function logDebug(source, message) {
    log(levelNames.debug, source, message);
}

// This function was made to quickly log "debug" messages
function logDb(source, message) {
    log(levelNames.database, source, message);
}


module.exports = { log, logInfo, logError, logVerbose, logDebug, logDb, levelNames };
