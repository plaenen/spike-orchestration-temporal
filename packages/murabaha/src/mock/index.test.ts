import { MurabahaMockBroker } from './index'

it('should  be possible to have a mock server', async () => {
    const broker = new MurabahaMockBroker()
    const res = await broker.purchaseCommodities({
        amount: {
            amount: 1000,
            currencyCode: 'EUR'
        },
        idempotencyKey: 'my_idempotency_key'
    })
    expect(res.success).toBeTruthy
})

export {}