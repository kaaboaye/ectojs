import { StringT, TypeCastError } from "..";

describe("StringT", () => {
  test("string can be casted to string", () => {
    expect(StringT.cast("some string")).toBe("some string");
  });

  test("number can be casted to string", () => {
    expect(StringT.cast(123)).toBe("123");
  });

  test("bigint can be casted to string", () => {
    expect(StringT.cast(BigInt(123))).toBe("123");
  });

  test("boolean can be casted to string", () => {
    expect(StringT.cast(true)).toBe("true");
  });

  test("symbol cannot be casted to string", () => {
    expect(StringT.cast(Symbol() as any)).toBeInstanceOf(TypeCastError);
  });

  test("undefined cannot be casted to string", () => {
    expect(StringT.cast(undefined as any)).toBeInstanceOf(TypeCastError);
  });

  test("null cannot be casted to string", () => {
    expect(StringT.cast(null as any)).toBeInstanceOf(TypeCastError);
  });

  test("object cannot be casted to string", () => {
    expect(StringT.cast({ a: 1 } as any)).toBeInstanceOf(TypeCastError);
  });

  test("function cannot be casted to string", () => {
    expect(StringT.cast((() => 123) as any)).toBeInstanceOf(TypeCastError);
  });
});
