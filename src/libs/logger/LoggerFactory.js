"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
var Logger_1 = require("./Logger");
var LoggerInstance_1 = require("./LoggerInstance");
var LoggerFactory = /** @class */ (function () {
    function LoggerFactory() {
    }
    LoggerFactory.init = function () {
        this.logger = new Logger_1.LoggerImpl(null);
    };
    LoggerFactory.getLogger = function (sourcePath) {
        return new LoggerInstance_1.LoggerInstance(this.logger, sourcePath);
    };
    return LoggerFactory;
}());
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map