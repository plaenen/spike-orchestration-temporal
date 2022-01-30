import * as z from 'zod'
import { CustomerIdSchema } from '../customer'
import { JwtSginatureSchema } from '../signature'
import { IdempotencyKeySchema } from './idempotencyKey'

export const AuthenticatedRequestSchema = z.object({
    idempotencyKey: IdempotencyKeySchema,
    customerId: CustomerIdSchema,
    jwt: JwtSginatureSchema
})