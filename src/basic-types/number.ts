import { Type, TypeCastError } from "../type";

class NumberImpl implements Type<number> {
  public cast(input: number | string | bigint): number | TypeCastError {
    if (["symbol", "boolean", "object"].includes(typeof input)) {
      return new TypeCastError("has to be a number");
    }

    const num = Number(input);

    if (Number.isNaN(num) && !Number.isNaN(input as number)) {
      return new TypeCastError("has to be a number");
    }

    return num;
  }

  public load(input: number): number {
    return input;
  }

  public dump(input: number): number {
    return Number(input);
  }
}

export const NumberT = Object.freeze(new NumberImpl());
