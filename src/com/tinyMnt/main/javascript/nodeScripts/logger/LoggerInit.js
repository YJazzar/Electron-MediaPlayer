// Require the external library
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { printf } = format;

const { levels } = require('./LevelConstants.js');


function parseLevelFromCommandLine() {
    for (let i = 0; i < process.argv.length; i ++) {
        if (process.argv[i] == "level" && i+1 < process.argv.length)
            return process.argv[i+1];
    }

    return "verbose";
}

function init() {
    // Figure out what type of log level should be used when creating the logger
    let initialLevel = parseLevelFromCommandLine();
    console.log("initial level set to: " + initialLevel);
 
    const customFormat = printf(({ level, time, source, message }) => {
        return `[${level}] [${time}] [${source}]: ${message}`;
    });

    const logger = createLogger({
        format: customFormat,
        levels: levels,
        transports: [
            new winston.transports.Console({
                level: initialLevel
            }),
            new winston.transports.File({
                filename: 'combined.log',
                level: initialLevel
            }),
        ]
    });

    parseLevelFromCommandLine();
    return logger;
}


// Creates the first few messages outputted to a log file
function sendStartUpLog(logger, dateAndTime) {
    logger.log({
        level: "info",
        time: dateAndTime,
        source: __dirname,
        message: "***************************",
    });

    logger.log({
        level: "info",
        time: dateAndTime,
        source: __dirname,
        message: "---------------------------",
    });

    logger.log({
        level: "info",
        time: dateAndTime,
        source: __dirname,
        message: "\t Program started",
    });

    logger.log({
        level: "info",
        time: dateAndTime,
        source: __dirname,
        message: "---------------------------",
    });

    logger.log({
        level: "info",
        time: dateAndTime,
        source: __dirname,
        message: "***************************",
    });

}


module.exports = { init, sendStartUpLog };