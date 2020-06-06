// Require the external library
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { printf } = format;

const { levels } = require('./LevelConstants.js');



function init(initialLevel) {
    // If no variable was passed in for the level needed, set it to verbose by defualt
    if (initialLevel == undefined) {
        initialLevel = "verbose";
    }

    console.log(initialLevel);

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

    return logger;
}




module.exports = { init };