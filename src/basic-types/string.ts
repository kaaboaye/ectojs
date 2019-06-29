import { Type, TypeCastError } from "../type";

class StringImpl implements Type<string> {
  public cast(
    input: string | number | bigint | boolean
  ): string | TypeCastError {
    if (["string", "number", "bigint", "boolean"].includes(typeof input)) {
      return String(input);
    }

    return new TypeCastError("has to be a string");
  }

  public load(input: string): string {
    return input;
  }

  public dump(input: string): string {
    return String(input);
  }
}

export const StringT = Object.freeze(new StringImpl());
