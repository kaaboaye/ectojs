import { Changeset } from "..";
import { SchemaField } from "../schema";

export interface Schema<T> {
  readonly tableName: Readonly<string>;
  readonly fields: ReadonlyMap<keyof T, SchemaField<T>>;

  changeset(
    data: Readonly<T> | undefined,
    params: Partial<T>,
    allowed: readonly (keyof T)[]
  ): Changeset<T>;
}
