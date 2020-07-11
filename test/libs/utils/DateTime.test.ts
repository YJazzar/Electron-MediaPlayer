import {expect} from "chai";
import {getDateTime} from "../../../src/libs/utils/DateTime";


describe('Test DateTime() function returns values with the correct properties', function () {

    it('should return a truthy value', function () {
        const value = getDateTime();
        console.log(value);
        expect(value).to.be.any;
    });

    it ('should return a string', function() {
        const value = getDateTime();
        console.log(value);
        expect(value).to.be.a('string');
    })

    it('should always return a string with a space in the middle', function() {
        const value = getDateTime();
        console.log(value);
        expect(value).to.be.a('string').that.contains(' ');
    })

    it('should always return a string with the length 19', function() {
        const value = getDateTime();
        console.log(value);
        expect(value).to.be.a('string').with.lengthOf(19);
    })

});