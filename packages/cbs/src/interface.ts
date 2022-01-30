import * as z from 'zod' 
import * as s from '@packages/shared'


export interface CbsService {
    // create(req: CreateGenericCaseRequestType): Promise<CreateGenericCaseResponseType>
}

// export const CreateGenericCaseRequestSchema = z.object({
//     idempotencyKey: s.api.IdempotencyKeySchema,
//     title: z.string().nonempty(),
//     source: z.string().nonempty(),
//     context: z.string(),
//     action: z.string(),
//     priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
// })
// export type CreateGenericCaseRequestType = z.infer<typeof CreateGenericCaseRequestSchema>

// export const CreateGenericCaseResponseSchema = z.object({
//     caseId: z.string()
// })

// export type CreateGenericCaseResponseType = z.infer<typeof CreateGenericCaseResponseSchema>