"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SchemaField {
    constructor(schema, name, type, options = {}) {
        this.schema = schema;
        this.name = name;
        this.type = type;
        this.dataStoreName = options.dataStoreName || name;
        this.primaryKey = options.primaryKey || false;
        this.default = options.default || null;
        this.onChange = options.onChange;
    }
}
exports.SchemaField = SchemaField;
//# sourceMappingURL=field.js.map