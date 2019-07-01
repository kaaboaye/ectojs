import { Changeset, NumberT, Schema, StringT } from "..";

describe("changeset", () => {
  const schema = new Schema("comments")
    .field("author", StringT, { default: "anonymous" })
    .field("color", StringT, { default: () => "red" })
    .field("rating", NumberT)
    .field("content", StringT);

  const comment = Object.freeze({
    author: "some author",
    color: "green",
    content: "somme comment",
    rating: 5
  });

  describe("changeset", () => {
    test("new object", () => {
      const changeset = new Changeset(schema, null);

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
        null,
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
        null,
        { rating: "definitely not a number" },
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
      const newComment = new Changeset(schema, null).applyChanges();

      expect(newComment).toEqual({
        author: "anonymous",
        color: "red",
        content: null,
        rating: null
      });
    });

    test("changes fields on new object", () => {
      const newComment = new Changeset<typeof comment>(
        schema,
        null,
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
