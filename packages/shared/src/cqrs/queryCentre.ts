import { IQueryHandler, BaseQuery } from '.';

export class QueryCentre {
    protected handlers: Map<string, IQueryHandler<any, any>> = new Map()
  
    public register(handlers: IQueryHandler<any, any>[]) {
      handlers.forEach((handler) => this.registerHandler(handler));
    }

    protected registerHandler(handler: IQueryHandler<any, any>) {
      this.handlers.set(handler.handlesQueryName, handler)
    }

    getHandler(cmd: BaseQuery<any>): IQueryHandler<any,any> {
      const handler = this.handlers.get(cmd.name)
      if (!handler) {
        throw new Error(`No handler registered for query: ${cmd.name}`)
      }
      return handler
    }

    async execQuery<TResult>(cmd: BaseQuery<TResult>): Promise<TResult> {
      const handler = this.getHandler(cmd)
      const res = await handler.handle(cmd)
      return res
    }
}