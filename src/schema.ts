import { Repo } from "./repo";
import { SchemaField } from "./schema/field";
import { SchemaFieldOptions } from "./schema/field-options";
import { Type } from "./type";

export { SchemaField, SchemaFieldOptions };

export class Schema {
  private readonly fields: Set<SchemaField> = new Set();

  public constructor(
    public readonly repo: Repo,
    public readonly tableName: string
  ) {
    this.repo.registerSchema(this);
  }

  public field(name: string, type: Type, options?: SchemaFieldOptions): this {
    const field = new SchemaField(this.repo, this, name, type, options);
    this.fields.add(field);

    return this;
  }

  public plug(plug: (schema: this) => this): this {
    return plug(this);
  }
}
