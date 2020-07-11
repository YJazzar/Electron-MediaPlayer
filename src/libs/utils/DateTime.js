"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateTime = void 0;
function getDateTime() {
    return new Date()
        .toISOString()
        .replace(/T/, ' ') // replace T with a space
        .replace(/\..+/, ''); // delete the dot and everything after
}
exports.getDateTime = getDateTime;
//# sourceMappingURL=DateTime.js.map