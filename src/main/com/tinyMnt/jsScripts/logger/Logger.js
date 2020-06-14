const config = require("D:/Projects/tnyPlayer/config.js");

const { levelNames } = require(config.buildPath + config.jsSourcePath + 'logger/LevelConstants.js');
const { init, sendStartUpLog } = require(config.buildPath + config.jsSourcePath + 'logger/LoggerInit.js');
const getDateTime = require(config.buildPath + config.jsSourcePath + 'logger//DateAndTime.js');

// Calls the function from LoggerInit.js to make the winston logger instance
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

function logDebug(source, message) {
    logger.log({
        level: "debug",
        time: getDateTime(),
        source: source,
        message: message,
    });
}

function logCritical(source, message) {
    logger.log({
        level: "critical",
        time: getDateTime(),
        source: source,
        message: message,
    });
}

function logDb(source, message) {
    logger.log({
        level: "database",
        time: getDateTime(),
        source: source,
        message: message,
    });
}

logInfo(__filename, "Log packages initialized!");

module.exports = { logger, log, logInfo, logError, logVerbose, logDebug, logCritical, logDb, levelNames, getDateTime };