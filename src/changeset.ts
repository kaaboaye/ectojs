import { Schema, SchemaField, TypeCastError } from ".";

import { Changeset } from "./changeset/changeset";

export { Changeset };

export function createChangeset<T>(
  schema: Schema<T>,
  // tslint:disable-next-line: variable-name
  data_: Readonly<T> | undefined,
  params: Partial<T>,
  allowed: readonly (keyof T)[]
): Changeset<T> {
  const errors: TypeCastError[] = [];
  const data: Readonly<T> = (() => {
    if (!data_) {
      const empty = {} as T;
      schema.fields.forEach(field => {
        empty[field.name] =
          typeof field.default === "function" ? field.default() : field.default;
      });

      return empty;
    }

    return data_;
  })();

  const changes = new Map<keyof T, any>();

  function getField(fName: keyof T): SchemaField<T> {
    // tslint:disable-next-line: no-non-null-assertion
    return schema.fields.get(fName)!;
  }

  function copyData(): T {
    const newObject = {} as Partial<T>;
    Object.entries(data).forEach(([key, value]) => {
      const field = getField(key as keyof T);
      newObject[key as keyof T] =
        typeof field.type.copy === "function" ? field.type.copy(value) : value;
    });

    return newObject as T;
  }

  allowed.forEach(fName => {
    if (typeof params[fName] === "undefined") {
      return;
    }

    const field = getField(fName);
    const newValue = field.type.cast(params[fName]);

    if (newValue instanceof TypeCastError) {
      errors.push(newValue);

      return;
    }

    if (typeof field.type.equal === "function") {
      if (!field.type.equal(data[fName], newValue)) {
        changes.set(fName, newValue);
      }

      // tslint:disable-next-line: strict-comparisons
    } else if (data[fName] !== params[fName]) {
      changes.set(fName, newValue);
    }
  });

  return Object.freeze({
    errors,
    data,
    changes,
    schema,
    params,
    allowed,

    get valid(): boolean {
      return errors.length === 0;
    },

    applyChanges(): T {
      if (!this.valid) {
        throw new Error("Cannot apply changes on invalid object");
      }

      const newObject = copyData();

      this.changes.forEach((change, fName) => {
        newObject[fName] = change;
      });

      return newObject;
    },

    applyInsertAction(): T {
      return Object.entries(copyData()).reduce(
        (acc, [fName, fValue]) => {
          const value = changes.get(fName as keyof T) || fValue;
          const field = getField(fName as keyof T);

          acc[field.dataStoreName] = value;
        },
        {} as any
      );
    }
  });
}
