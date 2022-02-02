import { connect } from 'nats'
import { CanaryCommandResType, createCanaryCommand } from '@packages/commands/cannaryCommand'
import { CommandCentreOpt, commandCentre} from '.'

let opt: CommandCentreOpt

beforeAll(async () => {
    try {
        const nc = await connect({ servers: '0.0.0.0:4222'})
        opt = {
            nc: nc
        }
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

    const res = await commandCentre(opt).execCommand<CanaryCommandResType>(cmd)
    expect(res.message).toEqual('Hello world')
})