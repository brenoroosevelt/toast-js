import Error from "./error";
export default class Violations {
    private errors;
    constructor(errors?: Error[]);
    get all(): Error[];
    add(...error: Error[]): Violations;
    of(field: string): string[];
    has(field: string): boolean;
    filter(field: string): Error[];
    clear(field: string): Violations;
    reset(): Violations;
}
