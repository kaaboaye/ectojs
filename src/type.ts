export { TypeCastException } from "./type/cast-exception";
export { TypeLoadException } from "./type/load-exception";

export interface Type<T = any, CastInput = T, LoadInput = T, Dump = T> {
  readonly type: string;
  cast(input: CastInput): T;
  load(input: LoadInput): T;
  dump(input: T): Dump;

  autogenerate?(): T;
}
