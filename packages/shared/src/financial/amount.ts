import * as z from 'zod'
import { CurrencyCodesArray } from './currencyCodes';

export const AmountSchema = z.object({
  currency: z.string().refine((val) => {
    return CurrencyCodesArray.indexOf(val) > -1
  }, {
    message: "Expect a valid ISO 4217 3 letter currency code e.g. EUR",
  }),
  amount: z.bigint().default(BigInt(0)),
  decimals: z.number().min(0).max(3)
})

export type AmountType = z.infer<typeof AmountSchema>;