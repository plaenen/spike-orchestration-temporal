import * as z from 'zod' 
import { BaseCommand, IdempotencyKeySchema } from '@packages/commands'
import { CustomerIdSchema } from '@domains/customer'

export class InitiateBuyToLetOriginationCmd extends BaseCommand<InitiateBuyToLetOriginationArgsType> {
    constructor(args: InitiateBuyToLetOriginationArgsType) {
        super('cmd:mortgages:start-buy-to-let-ordering.v1', args)
    }

    validate(): void {
        this.validateWithZodSchema(ArgsSchema)
    }
}

const ArgsSchema = z.object({
    idempotencyKey: IdempotencyKeySchema,
    customerId: CustomerIdSchema
})

export type InitiateBuyToLetOriginationArgsType = z.infer<typeof ArgsSchema>

const ResSchema = z.object({
    productId: z.string()
})

export type InitiateBuyToLetOriginationResType = z.infer<typeof ResSchema>




