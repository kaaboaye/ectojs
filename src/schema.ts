import { Changeset, Type } from ".";

import { SchemaField } from "./schema/field";
import { SchemaFieldOptions } from "./schema/field-options";
import { Schema } from "./schema/schema";
import { SchemaBuilder } from "./schema/schema-builder";

export { SchemaField, SchemaFieldOptions, SchemaBuilder, Schema };

export function createSchema<T>(tableName: Readonly<string>): SchemaBuilder<T> {
  const fields = new Map<keyof T, SchemaField<T>>();

  return {
    field(
      name: keyof T,
      type: Type,
      options?: SchemaFieldOptions
    ): SchemaBuilder<T> {
      const field = new SchemaField(name, type, options);
      fields.set(name, field);

      return this;
    },

    plug(
      plug: (schema: SchemaBuilder<T>) => SchemaBuilder<T>
    ): SchemaBuilder<T> {
      return plug(this);
    },

    done(): Schema<T> {
      if (fields.size === 0) {
        throw new Error("Schema MUST contain fields");
      }

      return Object.freeze({
        tableName,
        fields,

        changeset(
          data: Readonly<T> | undefined,
          params: Partial<T>,
          allowed: readonly (keyof T)[]
        ): Changeset<T> {
          return new Changeset(this, data, params, allowed);
        }
      });
    }
  };
}
