import * as z from 'zod' 
import { cqrs } from '@packages/shared'
import { api } from '@packages/shared'
import { customer } from '@packages/shared'

export class StartBuyToLetOrderingCmd extends cqrs.BaseCommand<StartBuyToLetOrderingResType> {
    get name(): string {
        return 'cmd:mortgages:start-buy-to-let-ordering.v1'
    }
    protected args: StartBuyToLetOrderingArgsType

    constructor(args: StartBuyToLetOrderingArgsType) {
        super()
        this.args = args
    }

    static validateArgs(cmd: StartBuyToLetOrderingCmd):void {
        ArgsSchema.parse(cmd.args)
    }
}

const ArgsSchema = z.object({
    idempotencyKey: api.IdempotencyKeySchema,
    customerId: customer.CustomerIdSchema
})

export type StartBuyToLetOrderingArgsType = z.infer<typeof ArgsSchema>

const ResSchema = z.object({
    productId: z.string()
})

export type StartBuyToLetOrderingResType = z.infer<typeof ResSchema>




