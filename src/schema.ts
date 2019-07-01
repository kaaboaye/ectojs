import { SchemaField } from "./schema/field";
import { SchemaFieldOptions } from "./schema/field-options";
import { Type } from "./type";

export { SchemaField, SchemaFieldOptions };

export class Schema {
  public readonly fields: Map<string, SchemaField> = new Map();

  public constructor(public readonly tableName: string) {}

  public field(name: string, type: Type, options?: SchemaFieldOptions): this {
    const field = new SchemaField(this, name, type, options);
    this.fields.set(name, field);

    return this;
  }

  public plug(plug: (schema: this) => this): this {
    return plug(this);
  }
}
