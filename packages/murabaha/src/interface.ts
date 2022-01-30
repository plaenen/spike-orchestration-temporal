import { addBusinessDays, subBusinessDays, differenceInBusinessDays } from 'date-fns'
import * as z from 'zod' 
import * as s from '@packages/shared'


export interface MurabahaService {
  purchaseCommodities (req: PurchaseCommoditiesReqType): Promise<PurchaseCommoditiesResType>
  deriveMurabahaPuchaseDate(req: DeriveMurabahaPuchaseDateReqType): Promise<DeriveMurabahaPuchaseDateResType>
}

export const PurchaseCommoditiesReqSchema = z.object({
  idempotencyKey: s.api.IdempotencyKeySchema,
  amount: s.financial.AmountSchema,
});
export type PurchaseCommoditiesReqType = z.infer<typeof PurchaseCommoditiesReqSchema> 

export const PurchaseCommoditiesResSchema = z.object({
  transactionId: z.string()
});
export type PurchaseCommoditiesResType = z.infer<typeof PurchaseCommoditiesResSchema> 

export const CompletionDateSchema =  z.date().superRefine((completionDate, ctx) => {
  const now = new Date()
  const daysTillCompletion = differenceInBusinessDays(completionDate, now)
  if ( daysTillCompletion < 5) {
    ctx.addIssue({
      code: "custom",
      message: `the completion date should be at least 5 business days in the future, got ${daysTillCompletion}`
    })
  }
  if ( daysTillCompletion > 90) {
    ctx.addIssue({
      code: "custom",
      message: `the completion date can not be more then 90 business days in the future, got ${daysTillCompletion}`
    })
  }
})

export const DeriveMurabahaPuchaseDateReqSchema = z.object({
  completionDate: CompletionDateSchema
})
export type DeriveMurabahaPuchaseDateReqType = z.infer<typeof DeriveMurabahaPuchaseDateReqSchema> 

export const DeriveMurabahaPuchaseDateResSchema = z.object({
  murabahaPurchaseDate: z.date()
})
export type DeriveMurabahaPuchaseDateResType = z.infer<typeof DeriveMurabahaPuchaseDateResSchema> 