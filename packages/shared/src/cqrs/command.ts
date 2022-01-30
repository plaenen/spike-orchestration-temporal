export interface ICommand<TResult = any>{
    name: string
    execute(): Promise<TResult>
}

export interface ICommandHandler<TCommand, TResult>{
    handlesCommandName: string
    handle(cmd: TCommand): Promise<TResult> 
}

export abstract class BaseCommand<TResult> implements ICommand<TResult> {
    protected handler?: ICommandHandler<any, TResult> 

    public setHandler(handler: ICommandHandler<any, TResult>) {
        if (handler.handlesCommandName != this.name) {
            throw new Error(`Handler is not compatible with this command, ${this.name} ${handler.handlesCommandName}`)
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