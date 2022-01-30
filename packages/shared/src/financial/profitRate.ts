import * as z from 'zod'

export const ProfitRateSchema = z.number().int().min(0).max(100)

export type ProfitRateType = z.infer<typeof ProfitRateSchema>;