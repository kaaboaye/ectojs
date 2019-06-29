import { Repo } from "../repo";
import { Schema, SchemaFieldOptions } from "../schema";
import { Type } from "../type";

export class SchemaField {
  public readonly dataStoreName: string;
  public readonly meta?: any;

  public constructor(
    public readonly repo: Repo,
    public readonly schema: Schema,
    public readonly name: string,
    public readonly type: Type,
    public readonly options: SchemaFieldOptions = {}
  ) {
    this.dataStoreName = this.repo.adapter.naming.castSchemaFieldName(name);
  }
}
