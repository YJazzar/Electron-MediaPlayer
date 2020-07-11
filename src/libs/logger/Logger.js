"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerImpl = void 0;
var winston_1 = __importStar(require("winston"));
var logLevelConstants_1 = require("./logLevelConstants");
var DateTime_1 = require("../utils/DateTime");
var printf = winston_1.default.format.printf;
var LoggerImpl = /** @class */ (function () {
    function LoggerImpl(logLevel) {
        if (!logLevel) {
            logLevel = logLevelConstants_1.logLevelNames.debug;
        }
        this.logLevel = logLevel;
    }
    // TODO: Make a config file to create this portion of the logger
    LoggerImpl.prototype.init = function () {
        // Create the logger
        this.logger = winston_1.createLogger({
            format: this.customFormatter(),
            levels: logLevelConstants_1.logLevels,
            transports: [
                new winston_1.default.transports.Console({
                    level: this.logLevel
                }),
                new winston_1.default.transports.File({
                    filename: './LoggerOutput.log',
                    level: this.logLevel
                }),
            ]
        });
    };
    LoggerImpl.prototype.customFormatter = function () {
        return printf(function (_a) {
            var level = _a.level, time = _a.time, source = _a.source, message = _a.message;
            var formattedLevel = ("         [" + level + "]");
            formattedLevel = formattedLevel.substring(formattedLevel.length - 10);
            var formattedSource = source.substring(source.length - 35, source.length);
            return formattedLevel + " [" + time + "] [" + formattedSource + "]: " + message;
            // Old format:
            // return `[${level}] [${time}] [${source}]: ${message}`;
        });
    };
    // The function that will log all messages
    LoggerImpl.prototype.log = function (level, source, message) {
        this.logger.log({
            level: level,
            time: DateTime_1.getDateTime(),
            message: message,
            source: source
        });
    };
    Object.defineProperty(LoggerImpl.prototype, "LogLevel", {
        get: function () {
            return this.logLevel;
        },
        enumerable: false,
        configurable: true
    });
    return LoggerImpl;
}());
exports.LoggerImpl = LoggerImpl;
//# sourceMappingURL=Logger.js.map