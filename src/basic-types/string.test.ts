import { StringType, TypeCastError } from "..";

describe("StringType", () => {
  test("string can be casted to string", () => {
    expect(StringType.cast("some string")).toBe("some string");
  });

  test("number can be casted to string", () => {
    expect(StringType.cast(123)).toBe("123");
  });

  test("bigint can be casted to string", () => {
    expect(StringType.cast(BigInt(123))).toBe("123");
  });

  test("boolean can be casted to string", () => {
    expect(StringType.cast(true)).toBe("true");
  });

  test("symbol cannot be casted to string", () => {
    expect(StringType.cast(Symbol() as any)).toBeInstanceOf(TypeCastError);
  });

  test("undefined cannot be casted to string", () => {
    expect(StringType.cast(undefined as any)).toBeInstanceOf(TypeCastError);
  });

  test("null cannot be casted to string", () => {
    expect(StringType.cast(null as any)).toBeInstanceOf(TypeCastError);
  });

  test("object cannot be casted to string", () => {
    expect(StringType.cast({ a: 1 } as any)).toBeInstanceOf(TypeCastError);
  });

  test("function cannot be casted to string", () => {
    expect(StringType.cast((() => 123) as any)).toBeInstanceOf(TypeCastError);
  });
});
