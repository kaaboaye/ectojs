import { AdapterNaming } from "./adapter/naming";
import { AdapterStandardTypes } from "./adapter/standard-types";

export { AdapterStandardTypes };

export interface Adapter {
  readonly types: AdapterStandardTypes;
  readonly naming: AdapterNaming;
}
