
// Define the level constants needed by LoggerInit.js and Logger.js
const levels = {
    error: 0,
    critical: 1,
    info: 2,
    debug: 3,
    verbose: 4
};

const levelNames = {
    error: 'error',
    critical: 'critical',
    info: 'info',
    debug: 'debug',
    verbose: 'verbose'
};



module.exports = { levels, levelNames };