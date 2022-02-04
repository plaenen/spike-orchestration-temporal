import { command, CommandOpt, z, validateDataWithSchema, CommandSchema, ResponseSchema, IdempotencyKeySchema,  } from '../../../packages/cloudevents/src'

export const ProductClassSchema = z.enum(['account:current:gbp', "account:current:usd", "account:savings:gbp", "account:savings:usd", "mortgage:buy_to_let"])

const inputSchema= z.object({
    idempotencyKey: IdempotencyKeySchema,
    customerId: z.string(),
    productClass: ProductClassSchema,
})
export type CreateProductInputType = z.infer<typeof inputSchema>

const responseSchema= ResponseSchema.extend({
    data: z.object({
        productId: z.string()
    })
})
export type CreateProductResType = z.infer<typeof responseSchema>

const commandSchema = CommandSchema.extend({
    data: inputSchema
})
export type CreateProductType = z.infer<typeof commandSchema>

export const CreateProductCommand = (req: CreateProductInputType): CreateProductType  => {
    const cmdOps: CommandOpt = {
        source: 'git://example.com/schema/commands/CanaryCommand'
    }
    validateDataWithSchema(req, inputSchema)
    const cmd = command(cmdOps).createCommand({})
    cmd.type = 'cmd.product.create.v1'
    cmd.data = req
    command(cmdOps).validateCommand(cmd)
    return cmd as CreateProductType
}

export function ValidateCreateProductResponse(response: any) {
    validateDataWithSchema(response, responseSchema)
}