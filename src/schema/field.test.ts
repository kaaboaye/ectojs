import { SchemaField, StringType } from "..";

describe("SchemaField", () => {
  test("constructor with default values", () => {
    const field = new SchemaField("title", StringType);

    expect(field).toBeInstanceOf(SchemaField);
    expect(field.name).toBe("title");
    expect(field.type).toBe(StringType);
    expect(field.dataStoreName).toBe("title");
    expect(field.primaryKey).toBe(false);
    expect(field.default).toBe(null);
    expect(field.onChange).toBe(undefined);
  });

  test("custom data store name", () => {
    const field = new SchemaField("title", StringType, {
      dataStoreName: "some name"
    });
    expect(field.dataStoreName).toBe("some name");
  });

  test("primaryKey", () => {
    const field = new SchemaField("title", StringType, {
      primaryKey: true
    });
    expect(field.primaryKey).toBe(true);
  });

  test("default", () => {
    const field = new SchemaField("title", StringType, {
      default: "some default"
    });
    expect(field.default).toBe("some default");
  });

  test("onChange", () => {
    const onChange = (x: any) => x;
    const field = new SchemaField("title", StringType, { onChange });
    expect(field.onChange).toBe(onChange);
  });
});
