import { CommandType } from "../../cloudevents/src"
import { NatsConnection, Subscription, StringCodec } from "nats"
import superjson from 'superjson';
import { Context, Handler } from "./types";

export type HandlerCentreOpt = {
    nc: NatsConnection
}

function unmarchalCmd(data: Uint8Array): CommandType {
    const sc = StringCodec();
    const cmd = sc.decode(data)
    return superjson.parse(cmd)
}

function marchalResult(result: Object): Uint8Array {
    const sc = StringCodec();
    const res = sc.encode(superjson.stringify(result))
    return res
}

export const handlerCentre= (opt: HandlerCentreOpt) => {
    
    const handlerRegistry: Map<string, Handler> = new Map<string, Handler>()

    async function listener(sub: Subscription, handler: Handler) {
        console.log(`listening for ${sub.getSubject()} requests...`);
        const sc = StringCodec()
        for await (const m of sub) {
            const ctx: Context = {}
            console.log(`processing.... ${m.subject}`)
            const cmd = unmarchalCmd(m.data)
            const res = await handler.handle(cmd, ctx)
            m.respond(marchalResult(res))
        }
        console.log(`subscription ${sub.getSubject()} drained.`);
    }

    return {
        registerHandlers: (handler: Handler[]) => {
            handler.forEach((handler) => {
                handlerRegistry.set(handler.type, handler)
            })
        },
        registerHandler: (handler: Handler) => {
            handlerRegistry.set(handler.type, handler)
        },
        listen() {
            handlerRegistry.forEach((handler) => {
                const sub = opt.nc.subscribe(handler.type);
                listener(sub, handler)
            })
        }
    }
}

