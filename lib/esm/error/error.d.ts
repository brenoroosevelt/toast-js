export default class Error {
    readonly error: string;
    readonly field: string | null;
    constructor(error: string, field?: string | null);
}
