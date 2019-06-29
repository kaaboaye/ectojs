import { Adapter, Repo as LibRepo, Type } from ".";
import { Changeset } from "./changeset";
import { Schema } from "./schema";

const intT: Type<number> = Object.freeze({
  type: "integer",
  cast(input: number): number {
    return Number(input);
  },
  load(input: any): number {
    return Number(input);
  },
  dump(input: any): number {
    return input;
  }
});

const stringT: Type<string> = Object.freeze({
  type: "text",
  cast(input: any): string {
    return String(input);
  },
  load(input: string): string {
    return input;
  },
  dump(input: string): string {
    return input;
  }
});

const dateTimeT = stringT;

const mockAdapter: Adapter = Object.freeze({
  naming: {
    castSchemaFieldName(name: string): string {
      return name;
    }
  }
});

function now(): Date {
  return new Date();
}

function timestamps(schema: Schema): Schema {
  return schema
    .field("createdAt", dateTimeT, { default: now })
    .field("updatedAt", dateTimeT, { default: now, onChange: now });
}

interface Post {
  id: number;
  title: string;
  content: string;
}

(async () => {
  const Repo: LibRepo = new LibRepo(mockAdapter);

  const PostsSchema = new Schema(Repo, "posts")
    .field("id", intT, { primaryKey: true })
    .field("title", stringT, { default: "some click b8t" })
    .field("content", stringT);

  const CommentsSchema = new Schema(Repo, "comments")
    .field("id", intT, { primaryKey: true })
    .field("author", stringT, { nullable: true })
    .field("content", stringT)
    .plug(timestamps);

  const somePost: Post = {
    id: 1,
    title: "some post",
    content: "some content"
  };

  const changeset = new Changeset(PostsSchema, somePost, {
    title: "some new title"
  }).allow(["title", "content"]);

  await Repo.update(changeset);

  CommentsSchema.plug(t => t);
})()
  .then()
  .catch();

const a = 1;
