import Violations from "./violations";
export default class Exception {
    constructor(message, code = 0, violations = new Violations()) {
        this.message = message;
        this.code = code;
        this.violations = violations;
    }
}
const x = new Exception('');
