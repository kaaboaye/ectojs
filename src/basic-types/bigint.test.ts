import { BigIntT, TypeCastError } from "..";

describe("BigIntT", () => {
  test("integer as a string can be casted to bigint", () => {
    expect(BigIntT.cast("123")).toBe(BigInt(123));
  });

  test("float as a string cannot be casted to bigint", () => {
    expect(BigIntT.cast("0.123")).toBeInstanceOf(TypeCastError);
  });

  test("non number as a string cannot be casted to bigint", () => {
    expect(BigIntT.cast("some string")).toBeInstanceOf(TypeCastError);
  });

  test("integer can be casted to bigint", () => {
    expect(BigIntT.cast(123)).toBe(BigInt(123));
  });

  test("integer value above MAX_SAFE_INTEGER cannot be casted to bigint", () => {
    expect(BigIntT.cast(Number.MAX_SAFE_INTEGER + 1)).toBeInstanceOf(
      TypeCastError
    );
  });

  test("Infinity cannot be casted to bigint", () => {
    expect(BigIntT.cast(Infinity)).toBeInstanceOf(TypeCastError);
  });

  test("NaN cannot be casted to bigint", () => {
    expect(BigIntT.cast(NaN)).toBeInstanceOf(TypeCastError);
  });

  test("float cannot be casted to bigint", () => {
    expect(BigIntT.cast(0.123)).toBeInstanceOf(TypeCastError);
  });

  test("bigint can be casted to bigint", () => {
    expect(BigIntT.cast(BigInt(123))).toBe(BigInt(123));
  });

  test("boolean cannot be casted to bigint", () => {
    expect(BigIntT.cast(true as any)).toBeInstanceOf(TypeCastError);
  });

  test("symbol cannot be casted to bigint", () => {
    expect(BigIntT.cast(Symbol() as any)).toBeInstanceOf(TypeCastError);
  });

  test("undefined cannot be casted to bigint", () => {
    expect(BigIntT.cast(undefined as any)).toBeInstanceOf(TypeCastError);
  });

  test("null cannot be casted to bigint", () => {
    expect(BigIntT.cast(null as any)).toBeInstanceOf(TypeCastError);
  });

  test("object cannot be casted to bigint", () => {
    expect(BigIntT.cast({ a: 1 } as any)).toBeInstanceOf(TypeCastError);
  });

  test("function cannot be casted to bigint", () => {
    expect(BigIntT.cast((() => 123) as any)).toBeInstanceOf(TypeCastError);
  });
});
