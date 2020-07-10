import { expect } from "chai";
import {hello} from "../../src/libs/logLib";

describe('First test', function () {
    it('should return true', function () {
        expect(1).to.equal(1);
    });

    it('should expect a true return value from lob libs', function () {
        expect(hello()).to.true
    });
});