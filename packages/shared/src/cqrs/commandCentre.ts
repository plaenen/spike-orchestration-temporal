import { ICommandHandler, BaseCommand, ISecureCommand } from '.';

export class CommandCentre {
    protected handlers: Map<string, ICommandHandler<any, any>> = new Map()
  
    public register(handlers: ICommandHandler<any, any>[]) {
      handlers.forEach((handler) => this.registerHandler(handler));
    }

    protected registerHandler(handler: ICommandHandler<any, any>) {
      this.handlers.set(handler.handlesCommandName, handler)
    }

    getHandler(cmd: BaseCommand<any>): ICommandHandler<any,any> {
      const handler = this.handlers.get(cmd.name)
      if (!handler) {
        throw new Error(`No handler registered for command: ${cmd.name}`)
      }
      return handler
    }

    protected instanceOfSecureCommand(object: any): object is ISecureCommand {
      return 'jwt' in object;
    }

    async execCommand<TResult>(cmd: BaseCommand<TResult>): Promise<TResult> {
      console.log(`executing command: ${cmd.name}`)
      if (this.instanceOfSecureCommand(cmd)) {
        console.log('do security checks')
      }
      const handler = this.getHandler(cmd)
      const res = await handler.handle(cmd)
      return res
    }
}