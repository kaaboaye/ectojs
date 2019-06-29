import { Schema, SchemaFieldOptions } from "../schema";
import { Type } from "../type";

export class SchemaField {
  public readonly dataStoreName: string;
  public readonly nullable: boolean;
  public readonly primaryKey: boolean;
  public readonly default: any;
  public readonly onChange: ((value: any) => any) | undefined;

  public constructor(
    public readonly schema: Schema,
    public readonly name: string,
    public readonly type: Type,
    options: SchemaFieldOptions = {}
  ) {
    this.dataStoreName =
      options.dataStoreName ||
      this.schema.repo.adapter.naming.castSchemaFieldName(name);

    this.nullable = options.nullable || false;
    this.primaryKey = options.primaryKey || false;
    this.default = options.default || null;
    this.onChange = options.onChange;
  }
}
