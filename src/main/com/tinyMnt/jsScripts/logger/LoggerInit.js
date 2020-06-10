// Require the external library
const winston = require('winston');
const { createLogger } = winston;
const { printf } = winston.format;


const config = require('D:/Projects/Electron-MediaPlayer/config.js');
const { levels } = require(config.buildPath + config.jsSourcePath + 'logger/LevelConstants.js');


function parseLevelFromCommandLine() {
    console.log("[" + __filename + "] Logging from command line.");

    for (let i = 0; i < process.argv.length; i ++) {
        if (process.argv[i] == "level" && i+1 < process.argv.length) {
            console.log("[" + __filename + "] Argument detected for logging level: " + process.argv[i + 1]);
            return process.argv[i + 1];
        }
    }

    console.log("[" + __filename + "] No command argument detected, using default logging level instead: " + config.defaultLoggingLevel);
    return config.defaultLoggingLevel;
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
                filename: 'LoggerOutput.log',
                level: initialLevel
            }),
        ]
    });

    return logger;
}


// Creates the first few messages outputted to a log file
function sendStartUpLog(logger, dateAndTime) {
    logger.log({
        level: "info",
        time: dateAndTime,
        source: __filename,
        message: "***************************",
    });

    logger.log({
        level: "info",
        time: dateAndTime,
        source: __filename,
        message: "---------------------------",
    });

    logger.log({
        level: "info",
        time: dateAndTime,
        source: __filename,
        message: "\t Program started",
    });

    logger.log({
        level: "info",
        time: dateAndTime,
        source: __filename,
        message: "---------------------------",
    });

    logger.log({
        level: "info",
        time: dateAndTime,
        source: __filename,
        message: "***************************",
    });

}


module.exports = { init, sendStartUpLog };