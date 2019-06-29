import { TypeCastError } from "./type/cast-error";

export { TypeCastError };

export interface Type<T = any, CastInput = T, LoadInput = T, Dump = T> {
  cast(input: CastInput): T | TypeCastError;
  load(input: LoadInput): T | TypeCastError;
  dump(input: T): Dump | TypeCastError;

  autogenerate?(): T;
}
