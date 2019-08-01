import { TypeCastError } from "..";
import { Schema } from "../schema";

export interface Changeset<T> {
  readonly errors: readonly TypeCastError[];
  readonly data: Readonly<T>;
  readonly changes: ReadonlyMap<keyof T, any>;
  readonly valid: boolean;
  readonly schema: Schema<T>;
  readonly params: Partial<T>;
  readonly allowed: readonly (keyof T)[];

  applyChanges(): T;
  applyInsertAction(): T;
}
