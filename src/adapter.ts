import { MockAdapter } from "./adapter/mock-adapter";
import { AdapterNaming } from "./adapter/naming";

export { AdapterNaming, MockAdapter };

export interface Adapter {
  readonly name: string;
  readonly naming: AdapterNaming;
}
