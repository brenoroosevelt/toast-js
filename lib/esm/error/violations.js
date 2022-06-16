export default class Violations {
    constructor(errors = []) {
        this.errors = errors;
    }
    get all() {
        return this.errors;
    }
    add(...error) {
        error.forEach((err) => this.errors.push(err));
        return this;
    }
    of(field) {
        return this.filter(field).map((err) => err.error);
    }
    has(field) {
        return this.errors.some((err) => err.field === field);
    }
    filter(field) {
        return this.errors.filter((err) => err.field === field);
    }
    clear(field) {
        this.errors = this.errors.filter((err) => err.field !== field);
        return this;
    }
    reset() {
        this.errors = [];
        return this;
    }
}
