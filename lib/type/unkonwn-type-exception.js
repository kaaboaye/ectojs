"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ecto_exception_1 = require("../ecto-exception");
class UnknownTypeException extends ecto_exception_1.EctoException {
    constructor() {
        super(...arguments);
        this.name = "UnknownTypeException";
    }
}
exports.UnknownTypeException = UnknownTypeException;
//# sourceMappingURL=unkonwn-type-exception.js.map