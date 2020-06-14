
// Define the level constants needed by LoggerInit.js and Logger.js
const levels = {
    error: 0,
    critical: 1,
    warning: 2,
    database: 3,
    info: 4,
    verbose: 5,
    debug: 6
};

const levelNames = {
    error: 'error',
    critical: 'critical',
    warning: 'warning',
    database: 'database',
    info: 'info',
    verbose: 'verbose',
    debug: 'debug'
};



module.exports = { levels, levelNames };