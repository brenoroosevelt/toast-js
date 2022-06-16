export default class Error {
    constructor(
        public readonly error: string,
        public readonly field: string | null = null
    ) {
    }
}
