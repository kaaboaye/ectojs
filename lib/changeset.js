"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
class Changeset {
    constructor(schema, data, params = {}, allowed = []) {
        this.schema = schema;
        this.params = params;
        this.allowed = allowed;
        this.errors = [];
        this.changes = new Map();
        // create default data object
        if (!data) {
            const empty = {};
            this.schema.fields.forEach(field => {
                empty[field.name] =
                    typeof field.default === "function" ? field.default() : field.default;
            });
            this.data = empty;
        }
        else {
            this.data = data;
        }
        // validate allowed
        this.allowed.forEach(fName => {
            if (typeof this.params[fName] === "undefined") {
                return;
            }
            const field = this.getField(fName);
            const newValue = field.type.cast(this.params[fName]);
            if (newValue instanceof type_1.TypeCastError) {
                this.errors.push(newValue);
                return;
            }
            if (typeof field.type.equal === "function") {
                if (!field.type.equal(this.data[fName], newValue)) {
                    this.changes.set(fName, newValue);
                }
                // tslint:disable-next-line
            }
            else if (this.data[fName] !== this.params[fName]) {
                this.changes.set(fName, newValue);
            }
        });
    }
    get valid() {
        return this.errors.length === 0;
    }
    applyChanges() {
        const newObject = this.copyData();
        this.changes.forEach((change, fName) => {
            newObject[fName] = change;
        });
        return newObject;
    }
    copyData() {
        const newObject = {};
        Object.entries(this.data).forEach(([key, value]) => {
            const field = this.getField(key);
            newObject[key] =
                typeof field.type.copy === "function" ? field.type.copy(value) : value;
        });
        return newObject;
    }
    getField(fName) {
        const field = this.schema.fields.get(fName);
        if (!field) {
            throw Error(`unknown field ${fName} in schema ${this.schema.tableName}`);
        }
        return field;
    }
}
exports.Changeset = Changeset;
//# sourceMappingURL=changeset.js.map