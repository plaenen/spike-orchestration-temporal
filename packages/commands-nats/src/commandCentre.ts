import { CommandCentre } from '../../cloudevents/src';
import { CommandType } from '../../cloudevents/src'
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

function UnMarchalRespomse<TResult>(binaryResponse: Uint8Array): TResult {
    const sc = StringCodec();
    const stringResponse = sc.decode(binaryResponse)
    console.log(stringResponse)
    const jobj = superjson.parse<TResult>(stringResponse)
    console.log(jobj)
    return jobj
}

export const commandCentre = (opt: CommandCentreOpt) => {
    const nc: NatsConnection = opt.nc
    const defaultTimeoutInMs = opt.timeoutInMs || 10000
    return {
        async execCommand<TResult>(cmd: CommandType, timeoutInMs?: number): Promise<TResult> {
            try {
                const msg = await nc.request(cmd.type, MarchalCmd(cmd), { timeout: timeoutInMs || defaultTimeoutInMs })
                return UnMarchalRespomse<TResult>(msg.data)
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