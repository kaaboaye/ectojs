"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAdapter = {
    name: "MockAdapter",
    async insert(changeset) {
        return changeset.applyChanges();
    },
    async update(changeset) {
        return changeset.applyChanges();
    }
};
//# sourceMappingURL=mock-adapter.js.map