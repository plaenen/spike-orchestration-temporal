import * as z from 'zod' 
import * as s from '@packages/shared'


export interface CrmService {
    CreateGenericCase(req: CreateGenericCaseRequestType): Promise<CreateGenericCaseResponseType>
    CreateCustomer(req: CreateCustomerReqType): Promise<CreateCustomerResType>
}

export const CreateGenericCaseRequestSchema = z.object({
    idempotencyKey: s.api.IdempotencyKeySchema,
    title: z.string().nonempty(),
    source: z.string().nonempty(),
    context: z.string(),
    action: z.string(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
})
export type CreateGenericCaseRequestType = z.infer<typeof CreateGenericCaseRequestSchema>

export const CreateGenericCaseResponseSchema = z.object({
    caseId: z.string()
})

export type CreateGenericCaseResponseType = z.infer<typeof CreateGenericCaseResponseSchema>

export const CreateCustomerReqSchema = z.object({
    idempotencyKey: s.api.IdempotencyKeySchema,
    name: z.string(),
    email: z.string().email(),
    mobile: z.string(),
})

export type CreateCustomerReqType = z.infer<typeof CreateCustomerReqSchema>

export const CreateCustomerResSchema = z.object({
    customerId: s.customer.CustomerIdSchema
})

export type CreateCustomerResType = z.infer<typeof CreateCustomerResSchema>