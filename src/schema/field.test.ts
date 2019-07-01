import { Schema, SchemaField, StringT } from "..";

const schema = new Schema("posts");

describe("SchemaField", () => {
  test("constructor with default values", () => {
    const field = new SchemaField(schema, "title", StringT);

    expect(field).toBeInstanceOf(SchemaField);
    expect(field.schema).toBe(schema);
    expect(field.name).toBe("title");
    expect(field.type).toBe(StringT);
    expect(field.dataStoreName).toBe("title");
    expect(field.primaryKey).toBe(false);
    expect(field.default).toBe(null);
    expect(field.onChange).toBe(undefined);
  });

  test("custom data store name", () => {
    const field = new SchemaField(schema, "title", StringT, {
      dataStoreName: "some name"
    });
    expect(field.dataStoreName).toBe("some name");
  });

  test("primaryKey", () => {
    const field = new SchemaField(schema, "title", StringT, {
      primaryKey: true
    });
    expect(field.primaryKey).toBe(true);
  });

  test("default", () => {
    const field = new SchemaField(schema, "title", StringT, {
      default: "some default"
    });
    expect(field.default).toBe("some default");
  });

  test("onChange", () => {
    const onChange = (x: any) => x;
    const field = new SchemaField(schema, "title", StringT, { onChange });
    expect(field.onChange).toBe(onChange);
  });
});
