import { Adapter } from "./adapter";
import { Changeset } from "./changeset";
import { Schema } from "./schema";

export class Repo {
  private readonly schemas: Set<Schema> = new Set();

  public constructor(public readonly adapter: Adapter) {}

  public registerSchema(schema: Schema): void {
    this.schemas.add(schema);
  }

  public async update<T>(changeset: Changeset<T>): Promise<T> {
    return changeset.data;
  }
}
