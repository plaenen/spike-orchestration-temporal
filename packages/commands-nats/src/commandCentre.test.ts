import { connect } from 'nats'
import { CreateCanaryResType, createCanaryCommand } from '@packages/commands'
import { CommandCentreOpt, commandCentre} from '.'
import { handlerCentre } from './natsHandler'
import { canaryHandler } from './natsHandler.test'

let opt: CommandCentreOpt

beforeAll(async () => {
    try {
        const nc = await connect({ servers: '0.0.0.0:4222'})
        opt = {
            nc: nc
        }
        const hc = handlerCentre({
            nc: nc
        })
        hc.registerHandler(canaryHandler)
        hc.listen()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
})

afterAll(async () => {
    await opt.nc.close()
})

it('should be possible to send a cannary command', async() => {
    const cmd = createCanaryCommand({
        greet: 'Hello',
        name: 'world'
    })

    const res = await commandCentre(opt).execCommand<CreateCanaryResType>(cmd)
    expect(res.data.message).toEqual('Hello world')
})