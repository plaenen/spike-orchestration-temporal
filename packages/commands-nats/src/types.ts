import { ResponseType } from '../../cloudevents/src'
import { commandCentre, handlerCentre } from '.'

export type Context = {}

// Might hacve to move to a handlers package allowing the interface to exposed
export type Handler = {
    type: string
    handle:(cmd: any, context: Context) => Promise<ResponseType>
}

export type HandlerCentreType = ReturnType<typeof handlerCentre>
export type CommandCentreType = ReturnType<typeof commandCentre>