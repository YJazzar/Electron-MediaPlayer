const { init } = require('./LoggerInit.js');
const { getDateTime } = require('./DateAndTime.js');

const logger = init();

function log(level, source, message) {
    logger.log({
        level: level, 
        time: getDateTime(),
        source: source,
        message: message, 
    }); 
}

function logInfo(source, message) {
    logger.log({
        level: "info",
        time: getDateTime(),
        source: source,
        message: message,
    }); 
}

function logError(source, message) {
    logger.log({
        level: "error",
        time: getDateTime(),
        source: source,
        message: message,
    });
}


log("info", __dirname, "finally can this work???");
module.exports = { logger };