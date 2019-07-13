"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe("Schema", () => {
    test("create posts schema", () => {
        const schema = new __1.Schema("posts");
        expect(schema.tableName).toBe("posts");
    });
    test("create field", () => {
        const schema = new __1.Schema("posts").field("title", __1.StringT, {
            default: "some default"
        });
        expect(schema.fields.get("title")).toBeInstanceOf(__1.SchemaField);
        expect(schema.fields.get("title").name).toBe("title");
        expect(schema.fields.get("title").type).toBe(__1.StringT);
        expect(schema.fields.get("title").default).toBe("some default");
    });
    test("pipe", () => {
        const randomNumber = (s) => s.field("randomNumber", __1.NumberT, { default: () => Math.random() });
        const schema = new __1.Schema("posts").plug(randomNumber);
        expect(schema.fields.get("randomNumber")).toBeInstanceOf(__1.SchemaField);
    });
});
//# sourceMappingURL=test.js.map