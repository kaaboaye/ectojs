import { Adapter } from "./adapter";
import { Schema } from "./schema";
import { Type } from "./type";

export class Repo {
  private readonly schemas: Set<Schema> = new Set();
  private readonly types: Map<string, Type>;

  public constructor(public readonly adapter: Adapter) {
    this.types = new Map(Object.entries(adapter.types));
  }

  public schema(tableName: string): Schema {
    return new Schema(this, tableName);
  }

  public registerSchema(schema: Schema): void {
    this.schemas.add(schema);
  }

  public getType(typeName: string): Type | undefined {
    return this.types.get(typeName);
  }
}
