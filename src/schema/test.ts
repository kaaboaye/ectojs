import { MockAdapter, NumberT, Repo, Schema, SchemaField, StringT } from "..";

const repo = new Repo(MockAdapter);

describe("Schema", () => {
  test("create posts schema", () => {
    const schema = new Schema(repo, "posts");

    expect(schema.tableName).toBe("posts");
    expect(schema.repo).toBe(repo);
  });

  test("create field", () => {
    const schema = new Schema(repo, "posts").field("title", StringT, {
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
    const randomNumber = (schema: Schema) =>
      schema.field("randomNumber", NumberT, { default: () => Math.random() });

    const schema = new Schema(repo, "posts").plug(randomNumber);

    expect(schema.fields.get("randomNumber")).toBeInstanceOf(SchemaField);
  });
});
