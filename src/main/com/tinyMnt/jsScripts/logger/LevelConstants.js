
// Define the level constants needed by LoggerInit.js and Logger.js
const levels = {
    error: 0,
    critical: 1,
    info: 2,
    verbose: 3,
    debug: 4
};

const levelNames = {
    error: 'error',
    critical: 'critical',
    info: 'info',
    verbose: 'verbose',
    debug: 'debug'
};



module.exports = { levels, levelNames };