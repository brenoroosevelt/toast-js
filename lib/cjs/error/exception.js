"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const violations_1 = __importDefault(require("./violations"));
class Exception {
    constructor(message, code = 0, violations = new violations_1.default()) {
        this.message = message;
        this.code = code;
        this.violations = violations;
    }
}
exports.default = Exception;
const x = new Exception('');
