import { ICommandHandler } from "@packages/commands"
import { NatsConnection, StringCodec, Subscription } from "nats"

export class NatsHandler {
    protected nc: NatsConnection
    public defaultTimeout: number = 1000

    protected handlers: Map<string, ICommandHandler<any, any>> = new Map()
  
    public register(handlers: ICommandHandler<any, any>[]) {
      handlers.forEach((handler) => this.registerHandler(handler));
    }

    protected registerHandler(handler: ICommandHandler<any, any>) {
      this.handlers.set(handler.handlesCommandName, handler)
    }

    protected async subscriptionHandler(sub: Subscription) {
        console.log(`listening for ${sub.getSubject()} requests...`);
        const sc = StringCodec()
        for await (const m of sub) {
            console.log(`processing.... ${m.subject}`)
            const handler = this.getHandler(m.subject)
            const cmd = this.unmarchalCmd(m.data)
            const res = await handler.handle(cmd)
            m.respond(this.marchalResult(res))
        }
        console.log(`subscription ${sub.getSubject()} drained.`);
    }

    protected getHandler(sub: string): ICommandHandler<any,any> {
        const handler = this.handlers.get(sub)
        if (!handler) {
          throw new Error(`No handler registered for command: ${sub}`)
        }
        return handler
      }

    subscribe() {
        this.handlers.forEach((value) => {
            const sub = this.nc.subscribe(value.handlesCommandName);
            this.subscriptionHandler(sub)
        })
    }

    protected unmarchalCmd(data: Uint8Array): any {
        const sc = StringCodec();
        const cmd = sc.decode(data)
        return JSON.parse(cmd)
    }

    protected marchalResult(result: any): Uint8Array {
        const sc = StringCodec();
        const res = sc.encode(JSON.stringify(result, null, 2))
        return res
    }

    constructor(nc: NatsConnection) {
        this.nc = nc
    }
}