"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../type");
class BigIntImpl {
    cast(input) {
        if (typeof input === "bigint") {
            return input;
        }
        if (!["number", "string"].includes(typeof input) ||
            (typeof input === "number" &&
                (!Number.isInteger(input) || input > Number.MAX_SAFE_INTEGER))) {
            return new type_1.TypeCastError("has to be a bigint");
        }
        try {
            return BigInt(input);
        }
        catch (_a) {
            return new type_1.TypeCastError("has to be a bigint");
        }
    }
    load(input) {
        return input;
    }
    dump(input) {
        return BigInt(input);
    }
}
exports.BigIntT = Object.freeze(new BigIntImpl());
//# sourceMappingURL=bigint.js.map