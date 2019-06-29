import { EctoException } from "../ecto-exception";

export class UnknownTypeException extends EctoException {
  public readonly name = "UnknownTypeException";
}
