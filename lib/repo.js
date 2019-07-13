"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repo {
    constructor(adapter) {
        this.adapter = adapter;
    }
    async insert(changeset) {
        return this.adapter.insert(changeset);
    }
    async update(changeset) {
        return this.adapter.update(changeset);
    }
}
exports.Repo = Repo;
//# sourceMappingURL=repo.js.map