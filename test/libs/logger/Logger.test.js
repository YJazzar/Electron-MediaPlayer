"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Logger_1 = require("../../../src/libs/logger/Logger");
describe('Test Logger.ts class', function () {
    it('should always define a logLevel', function () {
        console.log("hello");
        var logger = new Logger_1.LoggerImpl(undefined);
        chai_1.expect(logger.LogLevel).to.be.any;
        logger = new Logger_1.LoggerImpl(null);
        chai_1.expect(logger.LogLevel).to.be.any;
        logger = new Logger_1.LoggerImpl('test');
        chai_1.expect(logger.LogLevel).to.be.any;
    });
    it('should always set LogLevel to a string value', function () {
        var logger = new Logger_1.LoggerImpl(undefined);
        chai_1.expect(logger.LogLevel).to.be.a('string');
        logger = new Logger_1.LoggerImpl(null);
        chai_1.expect(logger.LogLevel).to.be.a('string');
        logger = new Logger_1.LoggerImpl('test');
        chai_1.expect(logger.LogLevel).to.be.a('string');
    });
    it('should always set LogLevel to a valid value', function () {
        var logger = new Logger_1.LoggerImpl(undefined);
        chai_1.expect(logger.LogLevel).to.equal('debug');
        logger = new Logger_1.LoggerImpl(null);
        chai_1.expect(logger.LogLevel).to.equal('debug');
        logger = new Logger_1.LoggerImpl('test');
        chai_1.expect(logger.LogLevel).to.equal('test');
    });
});
//# sourceMappingURL=Logger.test.js.map