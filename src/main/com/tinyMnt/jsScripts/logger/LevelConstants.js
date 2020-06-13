
// Define the level constants needed by LoggerInit.js and Logger.js
const levels = {
    error: 0,
    critical: 1,
    warning: 2,
    info: 3,
    verbose: 4,
    debug: 5
};

const levelNames = {
    error: 'error',
    critical: 'critical',
    warning: 'warning',
    info: 'info',
    verbose: 'verbose',
    debug: 'debug'
};



module.exports = { levels, levelNames };