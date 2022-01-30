import { ICommandHandler, BaseCommand } from '.';

export class CommandRegistry {
    protected handlers: Map<string, ICommandHandler<any, any>> = new Map()
  
    public register(handlers: ICommandHandler<any, any>[]) {
      handlers.forEach((handler) => this.registerHandler(handler));
    }

    protected registerHandler(handler: ICommandHandler<any, any>) {
      this.handlers.set(handler.handlesCommandName, handler)
    }

    setHandler(cmd: BaseCommand<any>) {
      const handler = this.handlers.get(cmd.name)
      if (!handler) {
        throw new Error(`No handler registered for command: ${cmd.name}`)
      }
      cmd.setHandler(handler)
    }
}