import { CommandCentre } from '@packages/commands';
import { CommandType } from '@packages/commands'
import { NatsConnection, StringCodec } from 'nats'
import superjson from 'superjson';

export type CommandCentreOpt = {
    nc: NatsConnection
    // default is 10 seconds
    timeoutInMs?: number
}

function MarchalCmd(cmd: CommandType): Uint8Array {
    const sCmd = superjson.stringify(cmd)
    const sc = StringCodec();
    const res = sc.encode(sCmd)
    return res
}

function UnMarchalCmd<TResult>(binaryCommand: Uint8Array): TResult {
    const sc = StringCodec();
    const res = sc.decode(binaryCommand)
    const cmd = superjson.parse<TResult>(res)
    return cmd
}

export const commandCentre = (opt: CommandCentreOpt): CommandCentre => {
    const nc: NatsConnection = opt.nc
    const defaultTimeoutInMs = opt.timeoutInMs || 10000
    return {
        async execCommand<TResult>(cmd: CommandType, timeoutInMs?: number): Promise<TResult> {
            try {
                const msg = await nc.request(cmd.type, MarchalCmd(cmd), { timeout: timeoutInMs || defaultTimeoutInMs })
                return UnMarchalCmd<TResult>(msg.data)
            }
            catch (err) {
                console.error(err)
                throw new Error(`an error occurred when executing the command ${cmd.type}:${cmd.id} - ${err}
                 * check if a handler is registered for the command
                `)
            }
       }
    }
}