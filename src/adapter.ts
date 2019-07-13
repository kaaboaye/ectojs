import { MockAdapter } from "./adapter/mock-adapter";
import { Changeset } from "./changeset";

export { MockAdapter };

export interface Adapter {
  readonly name: string;

  insert<T>(changeset: Changeset<T>): Promise<T>;
  update<T>(changeset: Changeset<T>): Promise<T>;
}
