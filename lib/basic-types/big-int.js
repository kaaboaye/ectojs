"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BigIntImpl {
    cast(input) {
        return BigInt(input);
    }
    load(input) {
        return input;
    }
    dump(input) {
        return BigInt(input);
    }
}
exports.BigIntT = Object.freeze(new BigIntImpl());
//# sourceMappingURL=big-int.js.map