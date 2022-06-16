export default class Error {
    constructor(error, field = null) {
        this.error = error;
        this.field = field;
    }
}
