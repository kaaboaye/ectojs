import { Type, TypeCastError } from "../type";

class BigIntImpl implements Type<bigint> {
  public cast(input: number | bigint | string): bigint | TypeCastError {
    if (typeof input === "bigint") {
      return input;
    }

    if (
      !["number", "string"].includes(typeof input) ||
      (typeof input === "number" &&
        (!Number.isInteger(input) || input > Number.MAX_SAFE_INTEGER))
    ) {
      return new TypeCastError("has to be a bigint");
    }

    try {
      return BigInt(input);
    } catch {
      return new TypeCastError("has to be a bigint");
    }
  }

  public load(input: bigint): bigint {
    return input;
  }

  public dump(input: bigint): bigint {
    return BigInt(input);
  }
}

export const BigIntT = Object.freeze(new BigIntImpl());
