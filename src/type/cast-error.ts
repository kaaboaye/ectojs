export class TypeCastError implements Error {
  public readonly name: string = "TypeCastError";

  public constructor(public readonly message: string) {}
}
