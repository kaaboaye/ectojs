import { Adapter } from "../adapter";

export const MockAdapter: Adapter = {
  name: "MockAdapter",
  naming: {
    castSchemaFieldName(name: string): string {
      return name + "+casted";
    }
  }
};
