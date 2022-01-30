import { BaseCommand, ICommandHandler, CommandRegistry } from '.'

type ResultType = string

class TestCommand extends BaseCommand<ResultType> {
    private _greeting: string

    get greeting(): string {
        return this._greeting
    }

    get name(): string {
        return 'cmd:testcommand.v1'
    }

    constructor(greeting: string) {
        super()
        this._greeting = greeting
    }
}

class TestCommandHandler implements ICommandHandler<TestCommand, ResultType> {
    get handlesCommandName(): string {
        return 'cmd:testcommand.v1'
    }

    async handle(cmd: TestCommand): Promise<ResultType> {
        return 'Hello ' + cmd.greeting
    }
}

class TestCommandHandlerV2 implements ICommandHandler<TestCommand, ResultType> {
    get handlesCommandName(): string {
        return 'cmd:testcommand.v2'
    }

    async handle(cmd: TestCommand): Promise<ResultType> {
        return 'Hello ' + cmd.greeting
    }
}

it('should be possible to execute a command', async() => {
    const cmd = new TestCommand('Foo')
    const handlersRegistry = new CommandRegistry()
    handlersRegistry.register([
        new TestCommandHandler()
    ])
    const res = await handlersRegistry.execCommand<ResultType>(cmd)
    expect(res).toEqual('Hello Foo')
})

it('should be possible to execute a command', async() => {
    const cmd = new TestCommand('Foo')
    const handlersRegistry = new CommandRegistry()
    handlersRegistry.register([
        new TestCommandHandler()
    ])
    handlersRegistry.setHandler(cmd)
    const res = await cmd.execute()
    expect(res).toEqual('Hello Foo')
})

it('should should throw an error when no handler is set', async () => {
    const cmd = new TestCommand('Foo')
    try {
        await cmd.execute()
    } catch (err ) {
        expect((err as Error).message).toEqual('No handler found, execution abborted.')
    }
})

it('should should throw an error when no handler is set, no match in handler registry', () => {
    const cmd = new TestCommand('Foo')
    const handlersRegistry = new CommandRegistry()
    handlersRegistry.register([
        new TestCommandHandlerV2()
    ])
    try {
        handlersRegistry.setHandler(cmd)
    } catch(err) {
        expect((err as Error).message).toEqual('No handler registered for command: cmd:testcommand.v1')
    }
})

it('should should throw an error when no handler is set, no match in handler registry', () => {
    const cmd = new TestCommand('Foo')
    try {
        cmd.setHandler(new TestCommandHandlerV2())
    } catch(err) {
        expect((err as Error).message).toEqual('Handler is not compatible with this command, cmd:testcommand.v1 cmd:testcommand.v2')
    }
})
