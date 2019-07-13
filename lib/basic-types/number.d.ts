import { Type, TypeCastError } from "../type";
declare class NumberImpl implements Type<number> {
    cast(input: number | string | bigint): number | TypeCastError;
    load(input: number): number;
    dump(input: number): number;
}
export declare const NumberT: Readonly<NumberImpl>;
export {};
