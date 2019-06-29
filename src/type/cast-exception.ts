import { EctoException } from "../ecto-exception";

export class TypeCastException extends EctoException {
  public readonly name = "TypeCastException";
}
