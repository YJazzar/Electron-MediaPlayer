import {expect} from "chai";
import {LoggerImpl} from "../../../src/libs/logger/Logger";

describe('Test Logger.ts class', function () {

    it('should always define a logLevel', function () {

        console.log("hello");
        let logger = new LoggerImpl(undefined);
        expect(logger.LogLevel).to.be.any;

        logger = new LoggerImpl(null);
        expect(logger.LogLevel).to.be.any;

        logger = new LoggerImpl('test');
        expect(logger.LogLevel).to.be.any;
    });

    it('should always set LogLevel to a string value', function() {
        let logger = new LoggerImpl(undefined);
        expect(logger.LogLevel).to.be.a('string');

        logger = new LoggerImpl(null);
        expect(logger.LogLevel).to.be.a('string');

        logger = new LoggerImpl('test');
        expect(logger.LogLevel).to.be.a('string');
    })

    it('should always set LogLevel to a valid value', function() {
        let logger = new LoggerImpl(undefined);
        expect(logger.LogLevel).to.equal('debug');

        logger = new LoggerImpl(null);
        expect(logger.LogLevel).to.equal('debug');

        logger = new LoggerImpl('test');
        expect(logger.LogLevel).to.equal('test');
    })

});