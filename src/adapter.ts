import { MockAdapter } from "./adapter/mock-adapter";

export { MockAdapter };

export interface Adapter {
  readonly name: string;
}
