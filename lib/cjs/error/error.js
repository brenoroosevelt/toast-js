"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Error {
    constructor(error, field = null) {
        this.error = error;
        this.field = field;
    }
}
exports.default = Error;
