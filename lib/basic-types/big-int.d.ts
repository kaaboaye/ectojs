import { Type } from "../type";
declare class BigIntImpl implements Type<bigint> {
    cast(input: bigint | string): bigint;
    load(input: bigint): bigint;
    dump(input: bigint): bigint;
}
export declare const BigIntT: Readonly<BigIntImpl>;
export {};
