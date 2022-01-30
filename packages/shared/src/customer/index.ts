import * as z from 'zod'

export const CustomerIdSchema = z.string()

export type AmountType = z.infer<typeof CustomerIdSchema>;