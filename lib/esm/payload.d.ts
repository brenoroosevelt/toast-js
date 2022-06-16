export default class Payload {
    readonly data: any | undefined;
    readonly error: object | string | undefined;
    readonly isOk: Boolean;
    private constructor();
    static ok(data: any): Payload;
    static error(error: object | string, data?: any): Payload;
}
