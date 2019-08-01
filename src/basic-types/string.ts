import { TypeCastError } from "../type";

export const StringType = Object.freeze({
  cast(input: string | number | bigint | boolean): string | TypeCastError {
    if (["string", "number", "bigint", "boolean"].includes(typeof input)) {
      return String(input);
    }

    return new TypeCastError("has to be a string");
  },

  load(input: string): string {
    return input;
  },

  dump(input: string): string {
    return String(input);
  }
});
