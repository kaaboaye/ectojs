import { Type, TypeCastError } from "../type";
declare class StringImpl implements Type<string> {
    cast(input: string | number | bigint | boolean): string | TypeCastError;
    load(input: string): string;
    dump(input: string): string;
}
export declare const StringT: Readonly<StringImpl>;
export {};
