import { Schema } from "./schema";
import { TypeCastError } from "./type";
export declare class Changeset<T> {
    readonly schema: Schema;
    readonly params: Partial<T>;
    readonly allowed: (keyof T)[];
    readonly errors: TypeCastError[];
    readonly data: Readonly<T>;
    readonly changes: Map<keyof T, any>;
    readonly valid: boolean;
    constructor(schema: Schema, data: Readonly<T> | undefined, params?: Partial<T>, allowed?: (keyof T)[]);
    applyChanges(): T;
    private copyData;
    private getField;
}
