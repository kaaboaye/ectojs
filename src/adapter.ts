import { Changeset } from ".";
import { MockAdapter } from "./adapter/mock-adapter";

export { MockAdapter };

export interface Adapter {
  readonly name: string;

  insert<T>(changeset: Changeset<T>): Promise<T>;
  update<T>(changeset: Changeset<T>): Promise<T>;
}
