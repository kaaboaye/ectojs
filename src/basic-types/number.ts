import { TypeCastError } from "../type";

export const NumberType = Object.freeze({
  cast(input: number | string | bigint): number | TypeCastError {
    if (["symbol", "boolean", "object"].includes(typeof input)) {
      return new TypeCastError("has to be a number");
    }

    const num = Number(input);

    if (Number.isNaN(num) && !Number.isNaN(input as number)) {
      return new TypeCastError("has to be a number");
    }

    return num;
  },

  load(input: number): number {
    return input;
  },

  dump(input: number): number {
    return Number(input);
  }
});
