import { Adapter, Changeset } from ".";

export class Repo {
  public constructor(public readonly adapter: Adapter) {}

  public async insert<T>(changeset: Changeset<T>): Promise<T> {
    return this.adapter.insert(changeset);
  }

  public async update<T>(changeset: Changeset<T>): Promise<T> {
    return this.adapter.update(changeset);
  }
}
