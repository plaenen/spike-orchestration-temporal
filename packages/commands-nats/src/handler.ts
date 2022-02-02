import { CommandType } from "@packages/commands"
import { NatsConnection } from "nats"

export type HandlerCentreOpt = {
    nc: NatsConnection
}

export type Context = {}

export type Handler = (cmd: CommandType, context: Context) => {}

export const handlerCentre= (opt: HandlerCentreOpt) => {
    const handlers Map<string, Handler> = new Map
    return {

    }
}