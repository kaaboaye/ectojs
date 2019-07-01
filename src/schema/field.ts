import { Schema, SchemaFieldOptions } from "../schema";
import { Type } from "../type";

export class SchemaField {
  public readonly dataStoreName: string;
  public readonly primaryKey: boolean;
  public readonly default: any;
  public readonly onChange: ((value: any) => any) | undefined;

  public constructor(
    public readonly schema: Schema,
    public readonly name: string,
    public readonly type: Type,
    options: SchemaFieldOptions = {}
  ) {
    this.dataStoreName = options.dataStoreName || name;
    this.primaryKey = options.primaryKey || false;
    this.default = options.default || null;
    this.onChange = options.onChange;
  }
}
