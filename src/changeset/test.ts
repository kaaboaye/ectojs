import { Changeset, NumberType, StringType } from "..";
import { createSchema } from "../schema";

interface Comment {
  author: string;
  color: string;
  rating: number;
  content: string;
}

describe("changeset", () => {
  const schema = createSchema<Comment>("comments")
    .field("author", StringType, { default: "anonymous" })
    .field("color", StringType, { default: () => "red" })
    .field("rating", NumberType)
    .field("content", StringType)
    .done();

  const comment = Object.freeze({
    author: "some author",
    color: "green",
    content: "somme comment",
    rating: 5
  });

  describe("changeset", () => {
    test("new object", () => {
      const changeset = schema.changeset(undefined, {}, []);

      expect(changeset.errors).toEqual([]);
      expect(changeset.changes).toEqual(new Map());
      expect(changeset.valid).toBe(true);
      expect(changeset.schema).toBe(schema);
      expect(changeset.params).toEqual({});
      expect(changeset.allowed).toEqual([]);
      expect(changeset.data).toEqual({
        author: "anonymous",
        color: "red",
        content: null,
        rating: null
      });
    });

    test("changes field on correct data", () => {
      const changeset = new Changeset(
        schema,
        undefined,
        { content: "some content" },
        ["content"]
      );

      expect(changeset.errors).toEqual([]);
      expect(changeset.changes).toEqual(new Map([["content", "some content"]]));
      expect(changeset.valid).toBe(true);
      expect(changeset.schema).toBe(schema);
      expect(changeset.params).toEqual({ content: "some content" });
      expect(changeset.allowed).toEqual(["content"]);
      expect(changeset.data).toEqual({
        author: "anonymous",
        color: "red",
        content: null,
        rating: null
      });
    });

    test("invalidates changeset on bad data", () => {
      const changeset = new Changeset(
        schema,
        undefined,
        { rating: "definitely not a number" as any },
        ["rating"]
      );

      expect(changeset.errors.length).toBe(1);
      expect(changeset.changes).toEqual(new Map());
      expect(changeset.valid).toBe(false);
      expect(changeset.schema).toBe(schema);
      expect(changeset.params).toEqual({ rating: "definitely not a number" });
      expect(changeset.allowed).toEqual(["rating"]);
      expect(changeset.data).toEqual({
        author: "anonymous",
        color: "red",
        content: null,
        rating: null
      });
    });
  });

  describe("applyChanges", () => {
    test("new object", () => {
      const newComment = new Changeset(schema, undefined).applyChanges();

      expect(newComment).toEqual({
        author: "anonymous",
        color: "red",
        content: null,
        rating: null
      });
    });

    test("changes fields on new object", () => {
      const newComment = new Changeset<Comment>(
        schema,
        undefined,
        { content: "some content", rating: 1 },
        ["content", "rating"]
      ).applyChanges();

      expect(newComment).toEqual({
        author: "anonymous",
        color: "red",
        content: "some content",
        rating: 1
      });
    });

    test("apply changes creates new object", () => {
      const newComment = new Changeset(schema, comment, {}, []).applyChanges();

      expect(newComment).toEqual(comment);
      expect(newComment).not.toBe(comment);
    });

    test("input data is immutable", () => {
      const newComment = new Changeset(
        schema,
        comment,
        { author: "new author" },
        ["author"]
      ).applyChanges();

      expect(newComment).not.toBe(comment);
    });

    test("ignores changes not listed in allowed", () => {
      const changed = new Changeset(
        schema,
        comment,
        { author: "new author" },
        []
      ).applyChanges();

      expect(changed).toEqual(comment);
    });

    test("handles not provided params", () => {
      const newComment = new Changeset(schema, comment, {}, [
        "author"
      ]).applyChanges();

      expect(newComment).toEqual(comment);
    });

    test("changes fields listed in allowed", () => {
      const changes: typeof comment = {
        author: "new author",
        color: "new color",
        rating: 6,
        content: "new content"
      };

      const newComment = new Changeset(schema, comment, changes, [
        "author",
        "color",
        "rating",
        "content"
      ]).applyChanges();

      expect(newComment).toEqual(changes);
    });
  });
});
