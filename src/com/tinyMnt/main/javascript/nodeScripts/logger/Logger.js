const { levelNames } = require('./LevelConstants.js');
const { init } = require('./LoggerInit.js');


const { getDateTime } = require('./DateAndTime.js');

// Calls the functionf from LoggerInit.js to make the winston logger instance
const logger = init();

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

module.exports = { logger, log, logInfo, logError, levelNames, getDateTime };