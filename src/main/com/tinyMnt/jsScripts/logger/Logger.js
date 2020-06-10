const { levelNames } = require('./LevelConstants.js');
const { init, sendStartUpLog } = require('./LoggerInit.js');


const { getDateTime } = require('./DateAndTime.js');

// Calls the functionf from LoggerInit.js to make the winston logger instance
const logger = init();

// Prints that the program has started
sendStartUpLog(logger, getDateTime());

// This function was made to make constructing of the json object needed to log easier
function log(level, source, message) {
    logger.log({
        level: level,
        time: getDateTime(),
        source: source,
        message: message,
    });
}

// This function was made to quickly log "info" messages
function logInfo(source, message) {
    logger.log({
        level: "info",
        time: getDateTime(),
        source: source,
        message: message,
    });
}

// This function was made to quickly log "error" messages
function logError(source, message) {
    logger.log({
        level: "error",
        time: getDateTime(),
        source: source,
        message: message,
    });
}

// This function was made to quickly log "error" messages
function logVerbose(source, message) {
    logger.log({
        level: "verbose",
        time: getDateTime(),
        source: source,
        message: message,
    });
}

logInfo(__filename, "Log packages initialized!");

module.exports = { logger, log, logInfo, logError, logVerbose, levelNames, getDateTime };