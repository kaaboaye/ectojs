import { Adapter } from "../adapter";
import { Changeset } from "../changeset";

export const MockAdapter: Adapter = {
  name: "MockAdapter",

  async insert<T>(changeset: Changeset<T>): Promise<T> {
    return changeset.applyChanges();
  },

  async update<T>(changeset: Changeset<T>): Promise<T> {
    return changeset.applyChanges();
  }
};
