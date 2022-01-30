import * as z from 'zod' 
import { cqrs } from '@packages/shared'
import { api } from '@packages/shared'
import { customer } from '@packages/shared'

export class CreateProductCmd extends cqrs.BaseCommand<CreateProductResType> {
    get name(): string {
        return 'cmd:products:create-product.v1'
    }
    protected args: CreateProductArgsType

    constructor(args: CreateProductArgsType) {
        super()
        this.args = args
    }

    static validateArgs(cmd: CreateProductCmd):void {
        ArgsSchema.parse(cmd.args)
    }
}

export const ProductClassSchema = z.enum(['account:current:gbp', "account:current:usd", "account:savings:gbp", "account:savings:usd", "mortgage:buy_to_let"])

export type ProductClassType = z.infer<typeof ProductClassSchema>

const ArgsSchema = z.object({
    idempotencyKey: api.IdempotencyKeySchema,
    customerId: customer.CustomerIdSchema,
    productClass: ProductClassSchema,
})

export type CreateProductArgsType = z.infer<typeof ArgsSchema>

const ResSchema = z.object({
    productId: z.string()
})

export type CreateProductResType = z.infer<typeof ResSchema>