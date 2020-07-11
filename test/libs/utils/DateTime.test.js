"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var DateTime_1 = require("../../../src/libs/utils/DateTime");
describe('Test DateTime() function returns values with the correct properties', function () {
    it('should return a truthy value', function () {
        var value = DateTime_1.getDateTime();
        console.log(value);
        chai_1.expect(value).to.be.any;
    });
    it('should return a string', function () {
        var value = DateTime_1.getDateTime();
        console.log(value);
        chai_1.expect(value).to.be.a('string');
    });
    it('should always return a string with a space in the middle', function () {
        var value = DateTime_1.getDateTime();
        console.log(value);
        chai_1.expect(value).to.be.a('string').that.contains(' ');
    });
    it('should always return a string with the length 19', function () {
        var value = DateTime_1.getDateTime();
        console.log(value);
        chai_1.expect(value).to.be.a('string').with.lengthOf(19);
    });
});
//# sourceMappingURL=DateTime.test.js.map