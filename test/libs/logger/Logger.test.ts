import { expect } from "chai";
import {Logger} from "../../../src/libs/logger/Logger";

describe('Test Logger.ts class', function () {

    it('should always define a logLevel', function () {
        let logger = new Logger(undefined);
        expect(logger.LogLevel).to.be.any;

        logger = new Logger(null);
        expect(logger.LogLevel).to.be.any;

        logger = new Logger('test');
        expect(logger.LogLevel).to.be.any;
    });

    it('should always set LogLevel to a string value', function() {
        let logger = new Logger(undefined);
        expect(logger.LogLevel).to.be.a('string');

        logger = new Logger(null);
        expect(logger.LogLevel).to.be.a('string');

        logger = new Logger('test');
        expect(logger.LogLevel).to.be.a('string');
    })

    it('should always set LogLevel to a valid value', function() {
        let logger = new Logger(undefined);
        expect(logger.LogLevel).to.equal('debug');

        logger = new Logger(null);
        expect(logger.LogLevel).to.equal('debug');

        logger = new Logger('test');
        expect(logger.LogLevel).to.equal('test');
    })

});