import { Adapter } from "./adapter";
import { Changeset } from "./changeset";
export declare class Repo {
    readonly adapter: Adapter;
    constructor(adapter: Adapter);
    insert<T>(changeset: Changeset<T>): Promise<T>;
    update<T>(changeset: Changeset<T>): Promise<T>;
}
