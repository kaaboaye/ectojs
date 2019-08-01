import { Schema, SchemaFieldOptions, Type } from "..";

export interface SchemaBuilder<T> {
  field(name: keyof T, type: Type, options?: SchemaFieldOptions): this;
  plug(plug: (schema: this) => this): this;
  done(): Schema<T>;
}
