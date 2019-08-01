import { SchemaFieldOptions, Type } from "..";

export class SchemaField<T> {
  public readonly dataStoreName: string;
  public readonly primaryKey: boolean;
  public readonly default: any;
  public readonly onChange: ((value: any) => any) | undefined;

  public constructor(
    public readonly name: keyof T,
    public readonly type: Type,
    options: SchemaFieldOptions = {}
  ) {
    this.dataStoreName = options.dataStoreName || name.toString();
    this.primaryKey = options.primaryKey || false;
    this.default = options.default || null;
    this.onChange = options.onChange;
  }
}
