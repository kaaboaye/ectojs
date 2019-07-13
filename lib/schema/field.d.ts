import { Schema, SchemaFieldOptions } from "../schema";
import { Type } from "../type";
export declare class SchemaField {
    readonly schema: Schema;
    readonly name: string;
    readonly type: Type;
    readonly dataStoreName: string;
    readonly primaryKey: boolean;
    readonly default: any;
    readonly onChange: ((value: any) => any) | undefined;
    constructor(schema: Schema, name: string, type: Type, options?: SchemaFieldOptions);
}
