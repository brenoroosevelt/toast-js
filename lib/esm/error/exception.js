var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Violations from "./violations";
import Payload from "../payload";
export default class Exception {
    constructor(message, code = 0, violations = new Violations()) {
        this.message = message;
        this.code = code;
        this.violations = violations;
    }
}
const x = new Exception('');
class go {
    constructor() {
        this.loading = false;
    }
    execute(p, trans = (d) => d) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            try {
                const r = yield p.then((result) => result);
                const data = ((_a = r.data) === null || _a === void 0 ? void 0 : _a.data) || ((_b = r.data) === null || _b === void 0 ? void 0 : _b.results) || ((_c = r.data) === null || _c === void 0 ? void 0 : _c.items) || r.data;
                return Payload.success(Array.isArray(data) ? data.map((el) => trans(el)) : trans(data));
            }
            catch (error) {
                return Payload.error(error);
            }
            finally {
                this.loading = false;
            }
        });
    }
}
function task() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('taks resolve');
                resolve(1);
            }, Math.random() * 5000);
        });
    });
}
class Status {
    constructor(onchange = () => null) {
        this.onchange = onchange;
        this.pending = 0;
    }
    get loading() {
        return this.pending > 0;
    }
    start() {
        this.onchange(++this.pending);
    }
    finish() {
        this.onchange(--this.pending);
    }
}
function withStatus(promise, status) {
    return __awaiter(this, void 0, void 0, function* () {
        status.start();
        return promise.finally(() => status.finish());
    });
}
