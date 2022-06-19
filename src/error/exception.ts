import Violations from "./violations";
import axios, {AxiosError, AxiosResponse} from "axios";
import Payload from "../payload";

export default class Exception {
    constructor(
        public readonly message: string,
        public readonly code: number = 0,
        public readonly violations: Violations = new Violations()
    ) {
    }
}

const x = new Exception('')

class go {

    public loading = false

    async execute(p: Promise<any>, trans: Function = (d: any) => d) {
        this.loading = true
        try {
            const r = await p.then((result) => result)
            const data = r.data?.data || r.data?.results || r.data?.items || r.data
            return Payload.success(Array.isArray(data) ? data.map((el) => trans(el)) : trans(data))
        } catch (error) {
            return Payload.error(error)
        } finally {
            this.loading = false
        }
    }
}

async function task() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('taks resolve')
            resolve(1)
        }, Math.random() * 5000)
    })
}

class Status {
    private pending: number = 0

    constructor(private readonly onchange: Function = () => null) {
    }

    get loading(): boolean {
        return this.pending > 0
    }

    start(): void {
        this.onchange(++this.pending)
    }

    finish(): void {
        this.onchange(--this.pending)
    }
}

async function withStatus(promise: Promise<any>, status: Status) {
    status.start();
    return promise.finally(() => status.finish())
}
