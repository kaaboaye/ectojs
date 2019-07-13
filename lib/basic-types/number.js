"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../type");
class NumberImpl {
    cast(input) {
        if (["symbol", "boolean", "object"].includes(typeof input)) {
            return new type_1.TypeCastError("has to be a number");
        }
        const num = Number(input);
        if (Number.isNaN(num) && !Number.isNaN(input)) {
            return new type_1.TypeCastError("has to be a number");
        }
        return num;
    }
    load(input) {
        return input;
    }
    dump(input) {
        return Number(input);
    }
}
exports.NumberT = Object.freeze(new NumberImpl());
//# sourceMappingURL=number.js.map