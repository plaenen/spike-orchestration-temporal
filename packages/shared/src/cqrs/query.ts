export interface IQuery<TResult = any>{
    name: string
}

export interface IQueryHandler<TQuery, TResult>{
    handlesQueryName: string
    handle(cmd: TQuery): Promise<TResult> 
}

export abstract class BaseQuery<TResult> implements IQuery<TResult> {
    abstract get name(): string
}