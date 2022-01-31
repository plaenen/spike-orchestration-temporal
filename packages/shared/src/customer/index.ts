import * as z from 'zod'

export const CustomerIdSchema = z.string().uuid()

export type AmountType = z.infer<typeof CustomerIdSchema>;