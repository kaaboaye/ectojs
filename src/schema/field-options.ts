export interface SchemaFieldOptions<T = any> {
  readonly nullable?: boolean;
  readonly primaryKey?: boolean;
  readonly dataStoreName?: string;
  readonly default?: any;
  onChange?(value: T): T;
}
