import { AdapterNaming } from "./adapter/naming";

export { AdapterNaming };

export interface Adapter {
  readonly naming: AdapterNaming;
}
