import * as z from 'zod' 
import * as s from '@packages/shared'


export interface PaymentService {
    InitiateIntrabankTransfer: InitiateIntrabankTransfer
}

export type InitiateIntrabankTransfer = (req: InitiateIntrabankTransferRequestType) => Promise<InitiateIntrabankTransferResponseType>

export const InitiateIntrabankTransferRequestSchema = z.object({
    idempotencyKey: s.api.IdempotencyKeySchema,
    fromAccount: s.financial.InternalBankAccountSchema,
    toAccount: s.financial.InternalBankAccountSchema,
    amount: s.financial.AmountSchema,
    description: z.string()
    // countains a signed view of the idempotencyKey, fromAccount, toAccount and amount to ensure the request is not tampered
    // signature: JwtSignature
})

export type InitiateIntrabankTransferRequestType = z.infer<typeof InitiateIntrabankTransferRequestSchema>

export const InitiateIntrabankTransferResponseSchema = z.object({
    transactionId: z.string()
})

export type InitiateIntrabankTransferResponseType = z.infer<typeof InitiateIntrabankTransferResponseSchema>