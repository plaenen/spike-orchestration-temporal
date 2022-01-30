import * as z from 'zod' 
import * as s from '@packages/shared'
// import { CompletionDateSchema } from '@packages/murabaha'


// export interface BuyToLetService {
//     createMorgageAccount(req: CreateMorgageAccountReqType): CreateMorgageAccountResType
//     scheduleMurabaExecution(req: ScheduleMurabaExecutionReqType): ScheduleMurabaExecutionResType
// }

// export const CreateMorgageAccountReqSchema = z.object({
//     idempotencyKey: s.api.IdempotencyKeySchema,
//     customerId: s.customer.CustomerIdSchema,
//     loanAmount: s.financial.AmountSchema,
//     profitRate: s.financial.ProfitRateSchema,
// })
// export type CreateMorgageAccountReqType = z.infer<typeof CreateMorgageAccountReqSchema>

// export const CreateMorgageAccountResSchema = z.object({
//     accountId: s.financial.InternalBankAccountSchema
// })

// export type CreateMorgageAccountResType = z.infer<typeof CreateMorgageAccountResSchema>

// export const ScheduleMurabaExecutionReqSchema = z.object({
//     idempotencyKey: s.api.IdempotencyKeySchema,
//     customerId: s.customer.CustomerIdSchema,
//     completionDate:  CompletionDateSchema,
//     approvalSignature: s.signature.JwtSginatureSchema,  
// })

// export type ScheduleMurabaExecutionReqType = z.infer<typeof ScheduleMurabaExecutionReqSchema>


// export const ScheduleMurabaExecutionResSchema = z.object({
//     schedulerId: z.string()
// })

// export type ScheduleMurabaExecutionResType = z.infer<typeof ScheduleMurabaExecutionResSchema>