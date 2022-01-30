export interface IQuery<TResult = any>{
    name: string
    execute(): Promise<TResult>
}

export interface IQueryHandler<TQuery, TResult>{
    handlesQueryName: string
    handle(cmd: TQuery): Promise<TResult> 
}

export abstract class BaseQuery<TResult> implements IQuery<TResult> {
    protected handler?: IQueryHandler<any, TResult> 

    public setHandler(handler: IQueryHandler<any, TResult>) {
        if (handler.handlesQueryName != this.name) {
            throw new Error(`Handler is not compatible with this Query, ${this.name} ${handler.handlesQueryName}`)
        }
        this.handler = handler
    }

    abstract get name(): string

    async execute(): Promise<TResult> {
        if (!this.handler) {
            throw new Error('No handler found, execution abborted.')
        }
        return await this.handler.handle(this)
    }
}