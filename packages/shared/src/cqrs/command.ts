export interface ICommand<TResult = any>{
    name: string
}

export interface ISecureCommand<TResult = any> extends ICommand {
    name: string
    jwt: string
}

export interface ICommandHandler<TCommand, TResult>{
    handlesCommandName: string
    handle(cmd: TCommand): Promise<TResult> 
}

export abstract class BaseCommand<TResult> implements ICommand<TResult> {
    abstract get name(): string
}

export abstract class SecureCommand<TResult> implements ICommand<TResult> {
    abstract get name(): string
    abstract get jwt(): string
}