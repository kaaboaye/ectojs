"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../type");
class StringImpl {
    cast(input) {
        if (["string", "number", "bigint", "boolean"].includes(typeof input)) {
            return String(input);
        }
        return new type_1.TypeCastError("has to be a string");
    }
    load(input) {
        return input;
    }
    dump(input) {
        return String(input);
    }
}
exports.StringT = Object.freeze(new StringImpl());
//# sourceMappingURL=string.js.map