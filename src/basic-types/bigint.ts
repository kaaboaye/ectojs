import { TypeCastError } from "../type";

export const BigIntType = Object.freeze({
  cast(input: number | bigint | string): bigint | TypeCastError {
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
  },

  load(input: bigint): bigint {
    return input;
  },

  dump(input: bigint): bigint {
    return BigInt(input);
  }
});
