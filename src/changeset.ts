import { Schema } from "./schema";

export class Changeset<T> {
  public valid: boolean = false;

  public constructor(
    public readonly schema: Schema,
    public readonly data: T,
    public readonly changes: Partial<T>
  ) {}

  public allow(fields: (keyof T)[]): this {
    if (fields.length === 0) {
      this.valid = true;

      return this;
    }

    return this;
  }
}
