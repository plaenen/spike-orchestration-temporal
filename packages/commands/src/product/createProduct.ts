import { registry, z } from '../registry'
import { IdempotencyKey, ProductId } from '../schema'

const ProductClasses= z.enum(['account:current:gbp', "account:current:usd", "account:savings:gbp", "account:savings:usd", "mortgage:buy_to_let"])

registry.add({
    name: "cmd.product.create.v1",
    schema: {
        input: z.object({
            idempotencyKey: IdempotencyKey,
            customerId: z.string(),
            productClass: ProductClasses,
        }),
        output: z.object({
            productId: ProductId
        })
    }
})