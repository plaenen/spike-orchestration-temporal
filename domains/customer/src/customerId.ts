import * as z from 'zod'

export const CustomerIdSchema = z.string().uuid()

export type CustomerIdType = z.infer<typeof CustomerIdSchema>;