import { BigIntType, TypeCastError } from "..";

describe("BigIntType", () => {
  test("integer as a string can be casted to bigint", () => {
    expect(BigIntType.cast("123")).toBe(BigInt(123));
  });

  test("float as a string cannot be casted to bigint", () => {
    expect(BigIntType.cast("0.123")).toBeInstanceOf(TypeCastError);
  });

  test("non number as a string cannot be casted to bigint", () => {
    expect(BigIntType.cast("some string")).toBeInstanceOf(TypeCastError);
  });

  test("integer can be casted to bigint", () => {
    expect(BigIntType.cast(123)).toBe(BigInt(123));
  });

  test("integer value above MAX_SAFE_INTEGER cannot be casted to bigint", () => {
    expect(BigIntType.cast(Number.MAX_SAFE_INTEGER + 1)).toBeInstanceOf(
      TypeCastError
    );
  });

  test("Infinity cannot be casted to bigint", () => {
    expect(BigIntType.cast(Infinity)).toBeInstanceOf(TypeCastError);
  });

  test("NaN cannot be casted to bigint", () => {
    expect(BigIntType.cast(NaN)).toBeInstanceOf(TypeCastError);
  });

  test("float cannot be casted to bigint", () => {
    expect(BigIntType.cast(0.123)).toBeInstanceOf(TypeCastError);
  });

  test("bigint can be casted to bigint", () => {
    expect(BigIntType.cast(BigInt(123))).toBe(BigInt(123));
  });

  test("boolean cannot be casted to bigint", () => {
    expect(BigIntType.cast(true as any)).toBeInstanceOf(TypeCastError);
  });

  test("symbol cannot be casted to bigint", () => {
    expect(BigIntType.cast(Symbol() as any)).toBeInstanceOf(TypeCastError);
  });

  test("undefined cannot be casted to bigint", () => {
    expect(BigIntType.cast(undefined as any)).toBeInstanceOf(TypeCastError);
  });

  test("null cannot be casted to bigint", () => {
    expect(BigIntType.cast(null as any)).toBeInstanceOf(TypeCastError);
  });

  test("object cannot be casted to bigint", () => {
    expect(BigIntType.cast({ a: 1 } as any)).toBeInstanceOf(TypeCastError);
  });

  test("function cannot be casted to bigint", () => {
    expect(BigIntType.cast((() => 123) as any)).toBeInstanceOf(TypeCastError);
  });
});
