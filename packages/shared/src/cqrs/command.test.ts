import { BaseCommand, ICommandHandler, CommandCentre, ISecureCommand } from '.'

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

class TestCommandV2 extends TestCommand implements ISecureCommand {
    get jwt(): string {
        return "my_secret_jwt"
    }

    get name(): string {
        return 'cmd:testcommand.v2'   
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

const cmdCentre = new CommandCentre()

beforeAll(() => {
    cmdCentre.register([
        new TestCommandHandler()
    ])
})

it('should be possible to execute a command', async() => {
    const cmd = new TestCommand('Foo')
    const res = await cmdCentre.execCommand<ResultType>(cmd)
    expect(res).toEqual('Hello Foo')
})

it('should be possible to execute a command', async() => {
    const cmd = new TestCommandV2('Foo')
    try {
        await cmdCentre.execCommand<ResultType>(cmd)
    } catch(err) {
        expect((err as Error).message).toEqual('No handler registered for command: cmd:testcommand.v2')    
    }
})