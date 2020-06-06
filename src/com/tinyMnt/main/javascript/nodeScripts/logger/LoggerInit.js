// Require the external library
const winston = require('winston');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = format;



function init() {
    const customFormat = printf(({level, time, source, message}) => {
        return `[${level}] [${time}] [${source}]: ${message}`;
    });

    const logger = createLogger({
        format: customFormat,
        transports: [new transports.Console()]
    });

    return logger;
}




module.exports = { init };