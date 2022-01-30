import { IQueryHandler, BaseQuery } from '.';

export class QueryRegistry {
    protected handlers: Map<string, IQueryHandler<any, any>> = new Map()
  
    public register(handlers: IQueryHandler<any, any>[]) {
      handlers.forEach((handler) => this.registerHandler(handler));
    }

    protected registerHandler(handler: IQueryHandler<any, any>) {
      this.handlers.set(handler.handlesQueryName, handler)
    }

    setHandler(cmd: BaseQuery<any>) {
      const handler = this.handlers.get(cmd.name)
      if (!handler) {
        throw new Error(`No handler registered for query: ${cmd.name}`)
      }
      cmd.setHandler(handler)
    }
}