import { getCommands, MockDispatcher, CloudEvent, Handler } from './impl'

it('should be possible to create and dispatch and command', async() => {
    const handler: Handler = {
        route: 'cmd.*',
        handle: async (event: CloudEvent): Promise<CloudEvent> => {
            const res = event
            return res
        }
    }

    const dispatcher = MockDispatcher(handler)

    const commands = getCommands({
        dispatcher,
    })

    const res = await commands.product.create.v1({
        input: 'hello',
    })
})

export {}