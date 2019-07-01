import { Adapter } from "./adapter";
import { Changeset } from "./changeset";

export class Repo {
  public constructor(public readonly adapter: Adapter) {}

  public async update<T>(changeset: Changeset<T>): Promise<T> {
    return changeset.data;
  }
}
