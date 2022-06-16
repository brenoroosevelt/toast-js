export default class Payload {
    constructor(data = undefined, error = undefined) {
        this.data = data;
        this.error = error;
        this.isOk = this.error !== undefined;
    }
    static ok(data) {
        return new Payload(data);
    }
    static error(error, data = undefined) {
        return new Payload(data, error);
    }
}
