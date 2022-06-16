export default class Payload {

    public readonly isOk: Boolean

    private constructor(
        public readonly data: any | undefined = undefined,
        public readonly error: object | string | undefined = undefined,
    ) {
        this.isOk = this.error !== undefined
    }

    public static ok(data: any): Payload {
        return new Payload(data);
    }

    public static error(error: object | string, data: any = undefined): Payload {
        return new Payload(data, error);
    }
}
