import { BaseQuery, IQueryHandler, QueryCentre } from '.'

type ResultType = string

class TestQuery extends BaseQuery<ResultType> {
    private _greeting: string

    get greeting(): string {
        return this._greeting
    }

    get name(): string {
        return 'cmd:testquery.v1'
    }

    constructor(greeting: string) {
        super()
        this._greeting = greeting
    }
}

class TestQueryV2 extends TestQuery {
    get name(): string {
        return 'cmd:testquery.v2'   
    }
}

class TestQueryHandler implements IQueryHandler<TestQuery, ResultType> {
    get handlesQueryName(): string {
        return 'cmd:testquery.v1'
    }

    async handle(cmd: TestQuery): Promise<ResultType> {
        return 'Hello ' + cmd.greeting
    }
}

const qryCentre = new QueryCentre()

beforeAll(() => {
    qryCentre.register([
        new TestQueryHandler()
    ])
})

it('should be possible to execute a query', async() => {
    const cmd = new TestQuery('Foo')
    const res = await qryCentre.execQuery<ResultType>(cmd)
    expect(res).toEqual('Hello Foo')
})

it('should be possible to execute a query', async() => {
    const cmd = new TestQueryV2('Foo')
    try {
        await qryCentre.execQuery<ResultType>(cmd)
    } catch(err) {
        expect((err as Error).message).toEqual('No handler registered for query: cmd:testquery.v2')    
    }
})