"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerInstance = void 0;
var logLevelConstants_1 = require("./logLevelConstants");
/**
 * This class will be used to log without needing to pass the parameter "source"
 * with every log statement
 */
var LoggerInstance = /** @class */ (function () {
    function LoggerInstance(logger, sourcePath) {
        this.logger = logger;
        this.sourcePath = sourcePath;
    }
    // Add methods used to actually send log commands to winston
    LoggerInstance.prototype.error = function (message) {
        this.logger.log(logLevelConstants_1.logLevelNames.error, this.sourcePath, message);
    };
    LoggerInstance.prototype.warning = function (message) {
        this.logger.log(logLevelConstants_1.logLevelNames.warning, this.sourcePath, message);
    };
    LoggerInstance.prototype.database = function (message) {
        this.logger.log(logLevelConstants_1.logLevelNames.database, this.sourcePath, message);
    };
    LoggerInstance.prototype.info = function (message) {
        this.logger.log(logLevelConstants_1.logLevelNames.info, this.sourcePath, message);
    };
    LoggerInstance.prototype.debug = function (message) {
        this.logger.log(logLevelConstants_1.logLevelNames.debug, this.sourcePath, message);
    };
    return LoggerInstance;
}());
exports.LoggerInstance = LoggerInstance;
//# sourceMappingURL=LoggerInstance.js.map