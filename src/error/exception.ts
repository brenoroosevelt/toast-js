import Violations from "./violations";

export default class Exception {
    constructor(
        public readonly message: string,
        public readonly code: number = 0,
        public readonly violations: Violations = new Violations()
    ) {
    }
}

const x = new Exception('')
