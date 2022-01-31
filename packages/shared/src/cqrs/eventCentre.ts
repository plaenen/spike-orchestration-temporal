import { IEventHandler, BaseEvent } from '.';

export class EventCentre {
    protected handlers: Map<string, IEventHandler<any, any>> = new Map()
  
    public register(handlers: IEventHandler<any, any>[]) {
      handlers.forEach((handler) => this.registerHandler(handler));
    }

    protected registerHandler(handler: IEventHandler<any, any>) {
      this.handlers.set(handler.handlesEventName, handler)
    }

    getHandler(cmd: BaseEvent<any>): IEventHandler<any,any> {
      const handler = this.handlers.get(cmd.name)
      if (!handler) {
        throw new Error(`No handler registered for event: ${cmd.name}`)
      }
      return handler
    }

    async execEvent<TResult>(cmd: BaseEvent<TResult>): Promise<TResult> {
      console.log(`executing event: ${cmd.name}`)
      const handler = this.getHandler(cmd)
      const res = await handler.handle(cmd)
      return res
    }
}