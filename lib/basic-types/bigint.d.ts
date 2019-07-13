import { Type, TypeCastError } from "../type";
declare class BigIntImpl implements Type<bigint> {
    cast(input: number | bigint | string): bigint | TypeCastError;
    load(input: bigint): bigint;
    dump(input: bigint): bigint;
}
export declare const BigIntT: Readonly<BigIntImpl>;
export {};
