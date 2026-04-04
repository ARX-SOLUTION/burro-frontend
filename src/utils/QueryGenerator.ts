export class QueryGenerator<TParams extends Record<string, unknown> = Record<string, unknown>> {
  public readonly all: readonly [string];
  public readonly lists: () => readonly [string, 'list'];
  public readonly list: (params: TParams) => readonly [string, 'list', TParams];
  public readonly details: () => readonly [string, 'detail'];
  public readonly detail: (id: string) => readonly [string, 'detail', string];

  constructor(public readonly entity: string) {
    this.all = [entity] as const;

    // define as instance properties so spreading the object keeps the same shape
    this.lists = () => [this.entity, 'list'] as const;
    this.list = (params: TParams) => [this.entity, 'list', params] as const;
    this.details = () => [this.entity, 'detail'] as const;
    this.detail = (id: string) => [this.entity, 'detail', id] as const;
  }
}

export default QueryGenerator;
