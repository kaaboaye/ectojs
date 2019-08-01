// tslint:disable: no-non-null-assertion

import { NumberType, SchemaField, StringType, createSchema } from "..";
import { SchemaBuilder } from "../schema";

interface Post {
  title: string;
}

describe("Schema", () => {
  test("create posts schema", () => {
    const postSchema = createSchema<Post>("posts")
      .field("title", StringType)
      .done();

    expect(postSchema.tableName).toBe("posts");
  });

  test("cannot create empty schema", () => {
    expect(() => createSchema("empty").done()).toThrow();
  });

  test("create field", () => {
    const schema = createSchema<Post>("posts")
      .field("title", StringType, { default: "some default" })
      .done();

    expect(schema.fields.get("title")).toBeInstanceOf(SchemaField);
    expect(schema.fields.get("title")!.name).toBe("title");
    expect(schema.fields.get("title")!.type).toBe(StringType);
    expect(schema.fields.get("title")!.default).toBe("some default");
  });

  test("pipe", () => {
    interface PostWithRandomNumber extends Post {
      randomNumber: number;
    }

    function randomNumber(
      s: SchemaBuilder<PostWithRandomNumber>
    ): SchemaBuilder<PostWithRandomNumber> {
      return s.field("randomNumber", NumberType, {
        default: () => Math.random()
      });
    }

    const schema = createSchema<PostWithRandomNumber>("posts")
      .field("title", StringType)
      .plug(randomNumber)
      .done();

    expect(schema.fields.get("randomNumber")).toBeInstanceOf(SchemaField);
  });
});
