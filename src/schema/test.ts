import { NumberType, Schema, SchemaField, StringT } from "..";

describe("Schema", () => {
  test("create posts schema", () => {
    const schema = new Schema("posts");

    expect(schema.tableName).toBe("posts");
  });

  test("create field", () => {
    const schema = new Schema("posts").field("title", StringT, {
      default: "some default"
    });

    expect(schema.fields.get("title")).toBeInstanceOf(SchemaField);
    expect((schema.fields.get("title") as SchemaField).name).toBe("title");
    expect((schema.fields.get("title") as SchemaField).type).toBe(StringT);
    expect((schema.fields.get("title") as SchemaField).default).toBe(
      "some default"
    );
  });

  test("pipe", () => {
    const randomNumber = (s: Schema) =>
      s.field("randomNumber", NumberType, { default: () => Math.random() });

    const schema = new Schema("posts").plug(randomNumber);

    expect(schema.fields.get("randomNumber")).toBeInstanceOf(SchemaField);
  });
});
