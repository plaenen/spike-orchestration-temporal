import * as z from 'zod'

export const IdempotencyKeySchema = z.string().uuid();

export type IdempotencyKeyType = z.infer<typeof IdempotencyKeySchema>;