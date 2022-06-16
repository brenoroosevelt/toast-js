import Error from "./error";

export default class Violations {
    constructor(private errors: Error[] = []) {
    }

    get all(): Error[] {
        return this.errors
    }

    public add(...error: Error[]): Violations {
        error.forEach((err: Error) => this.errors.push(err))
        return this
    }

    public of(field: string): string[] {
        return this.filter(field).map((err: Error) => err.error)
    }

    public has(field: string): boolean {
        return this.errors.some((err: Error) => err.field === field)
    }

    public filter(field: string): Error[] {
        return this.errors.filter((err: Error) => err.field === field)
    }

    public clear(field: string): Violations {
        this.errors = this.errors.filter((err: Error) => err.field !== field)
        return this
    }

    public reset(): Violations {
        this.errors = []
        return this
    }
}
