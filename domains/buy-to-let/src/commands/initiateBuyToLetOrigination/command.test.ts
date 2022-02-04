import { InitiateBuyToLetOriginationCmd } from "./command"

it('should be possible to create a new buy to let mortgage', async() => {
    const cmd = new InitiateBuyToLetOriginationCmd({
        customerId: '8c42b422-7370-42c1-b31f-53ae3d4a62ba',
        idempotencyKey: 'e9d63a79-2d37-45bc-944c-e32b7cad0e53',
    })
})

export {}