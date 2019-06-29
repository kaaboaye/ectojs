import { EctoException } from "../ecto-exception";

export class TypeLoadException extends EctoException {
  public readonly name = "TypeLoadException";
}
