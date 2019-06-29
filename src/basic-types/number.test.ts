import { NumberT, TypeCastError } from "..";

describe("NumberT", () => {
  test("number as a string can be casted to number", () => {
    expect(NumberT.cast("123")).toBe(123);
  });

  test("non number as a string cannot be casted to number", () => {
    expect(NumberT.cast("some string")).toBeInstanceOf(TypeCastError);
  });

  test("number can be casted to number", () => {
    expect(NumberT.cast(123)).toBe(123);
  });

  test("NaN can be casted to number", () => {
    expect(NumberT.cast(NaN)).toBe(NaN);
  });

  test("max safe int can be casted to number", () => {
    expect(NumberT.cast(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
  });

  test("min safe int can be casted to number", () => {
    expect(NumberT.cast(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER);
  });

  test("max value can be casted to number", () => {
    expect(NumberT.cast(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
  });

  test("min value can be casted to number", () => {
    expect(NumberT.cast(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
  });

  test("Infinity can be casted to number", () => {
    expect(NumberT.cast(Infinity)).toBe(Infinity);
  });

  test("negative infinity can be casted to number", () => {
    expect(NumberT.cast(Number.NEGATIVE_INFINITY)).toBe(
      Number.NEGATIVE_INFINITY
    );
  });

  test("bigint can be casted to number", () => {
    expect(NumberT.cast(BigInt(123))).toBe(123);
  });

  test("boolean cannot be casted to number", () => {
    expect(NumberT.cast(true as any)).toBeInstanceOf(TypeCastError);
  });

  test("symbol cannot be casted to number", () => {
    expect(NumberT.cast(Symbol() as any)).toBeInstanceOf(TypeCastError);
  });

  test("undefined cannot be casted to number", () => {
    expect(NumberT.cast(undefined as any)).toBeInstanceOf(TypeCastError);
  });

  test("null cannot be casted to number", () => {
    expect(NumberT.cast(null as any)).toBeInstanceOf(TypeCastError);
  });

  test("object cannot be casted to number", () => {
    expect(NumberT.cast({ a: 1 } as any)).toBeInstanceOf(TypeCastError);
  });

  test("function cannot be casted to number", () => {
    expect(NumberT.cast((() => 123) as any)).toBeInstanceOf(TypeCastError);
  });
});
