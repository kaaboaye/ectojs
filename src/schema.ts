import { Repo } from "./repo";
import { SchemaField } from "./schema/field";
import { SchemaFieldOptions } from "./schema/field-options";
import { Type } from "./type";
import { UnknownTypeException } from "./type/unkonwn-type-exception";

export { SchemaField, SchemaFieldOptions };

export class Schema {
  private readonly fields: Set<SchemaField> = new Set();
  private readonly dbFields: string[] = [];

  public constructor(
    private readonly repo: Repo,
    public readonly tableName: string
  ) {}

  public field(
    name: string,
    type: string | Type,
    options: SchemaFieldOptions
  ): this {
    const typeInstance =
      typeof type === "string" ? this.repo.getType(type) : type;

    if (!typeInstance) {
      throw new UnknownTypeException();
    }

    const field = new SchemaField(this.repo, this, name, typeInstance, options);
    this.fields.add(field);

    return this;
  }

  public register(): Repo {
    this.fields.forEach(f => this.dbFields.push(f.dataStoreName));

    this.repo.registerSchema(this);

    return this.repo;
  }
}
