import Violations from "./violations";
export default class Exception {
    readonly message: string;
    readonly code: number;
    readonly violations: Violations;
    constructor(message: string, code?: number, violations?: Violations);
}
