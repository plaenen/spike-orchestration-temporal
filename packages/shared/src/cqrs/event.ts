export interface IEvent<TResult = any>{
    name: string
}

export interface IEventHandler<TEvent, TResult>{
    handlesEventName: string
    handle(cmd: TEvent): Promise<TResult> 
}

export abstract class BaseEvent<TResult> implements IEvent<TResult> {
    abstract get name(): string
}