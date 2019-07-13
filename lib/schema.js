"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("./schema/field");
exports.SchemaField = field_1.SchemaField;
class Schema {
    constructor(tableName) {
        this.tableName = tableName;
        this.fields = new Map();
    }
    field(name, type, options) {
        const field = new field_1.SchemaField(this, name, type, options);
        this.fields.set(name, field);
        return this;
    }
    plug(plug) {
        return plug(this);
    }
}
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map