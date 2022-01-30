import { StartBuyToLetOrderingCmd } from "."
import { StartBuyToLetOrderingHandler } from "../mockCommandHandlers"

it('should be possible to create a new buy to let mortgage', async() => {
    const cmd = new StartBuyToLetOrderingCmd({
        customerId: 'cus_123456789012345678',
        idempotencyKey: 'e9d63a79-2d37-45bc-944c-e32b7cad0e53',
    })

    const handler = new StartBuyToLetOrderingHandler()

    handler.result = {
        productId: 'prod_123456789012345678'
    }

    cmd.setHandler(handler)

    const res = await cmd.execute()
    console.log(res)

    expect(res.productId).toEqual(handler.result.productId)
})

export {}