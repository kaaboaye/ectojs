import { SchemaField } from "./schema/field";
import { SchemaFieldOptions } from "./schema/field-options";
import { Type } from "./type";
export { SchemaField, SchemaFieldOptions };
export declare class Schema {
    readonly tableName: string;
    readonly fields: Map<string, SchemaField>;
    constructor(tableName: string);
    field(name: string, type: Type, options?: SchemaFieldOptions): this;
    plug(plug: (schema: this) => this): this;
}
