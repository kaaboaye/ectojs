import { Schema, SchemaField, TypeCastError } from ".";

export class Changeset<T> {
  public readonly errors: TypeCastError[] = [];
  public readonly data: Readonly<T>;
  public readonly changes: Map<keyof T, any> = new Map();

  public get valid(): boolean {
    return this.errors.length === 0;
  }

  public constructor(
    public readonly schema: Schema<T>,
    data: Readonly<T> | undefined,
    public readonly params: Partial<T> = {},
    public readonly allowed: readonly (keyof T)[] = []
  ) {
    // create default data object
    if (!data) {
      const empty = {} as T;
      this.schema.fields.forEach(field => {
        empty[field.name] =
          typeof field.default === "function" ? field.default() : field.default;
      });
      this.data = empty;
    } else {
      this.data = data;
    }

    // validate allowed
    this.allowed.forEach(fName => {
      if (typeof this.params[fName] === "undefined") {
        return;
      }

      const field = this.getField(fName);

      const newValue = field.type.cast(this.params[fName]);

      if (newValue instanceof TypeCastError) {
        this.errors.push(newValue);

        return;
      }

      if (typeof field.type.equal === "function") {
        if (!field.type.equal(this.data[fName], newValue)) {
          this.changes.set(fName, newValue);
        }

        // tslint:disable-next-line
      } else if (this.data[fName] !== this.params[fName]) {
        this.changes.set(fName, newValue);
      }
    });
  }

  public applyChanges(): T {
    const newObject = this.copyData();

    this.changes.forEach((change, fName) => {
      newObject[fName] = change;
    });

    return newObject;
  }

  public applyInsertAction(): object {
    return Object.entries(this.copyData()).reduce(
      (acc, [fName, fValue]) => {
        const value = this.changes.get(fName as keyof T) || fValue;
        const field = this.getField(fName as keyof T);

        acc[field.dataStoreName] = value;
      },
      {} as any
    );
  }

  private copyData(): T {
    const newObject = {} as Partial<T>;
    Object.entries(this.data).forEach(([key, value]) => {
      const field = this.getField(key as keyof T);
      newObject[key as keyof T] =
        typeof field.type.copy === "function" ? field.type.copy(value) : value;
    });

    return newObject as T;
  }

  private getField(fName: keyof T): SchemaField<T> {
    // tslint:disable-next-line: no-non-null-assertion
    return this.schema.fields.get(fName)!;
  }
}
