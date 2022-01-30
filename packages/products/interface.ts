import * as z from 'zod' 
import * as s from '@packages/shared'


export interface ProductService {
    GetEligibleProductsForCustomer(req: GetEligibleProductsForCustomerReqType): Promise<GetEligibleProductsForCustomerResType>
    GetProductsForCustomers(req: GetProductsForCustomersReqType): Promise<GetProductsForCustomersResType>
    StartProductOrigination(req: StartProductOriginationReqType): Promise<StartProductOriginationResType>
}



export const GetEligibleProductsForCustomerReqSchema = z.object({
    customerId: s.customer.CustomerIdSchema,
})
export type GetEligibleProductsForCustomerReqType = z.infer<typeof GetEligibleProductsForCustomerReqSchema>

export const GetEligibleProductsForCustomerResSchema = z.object({
    productCode: ProductCodeSchema
})

export type GetEligibleProductsForCustomerResType = z.infer<typeof GetEligibleProductsForCustomerReqSchema>

export const GetProductsForCustomersReqSchema = z.object({
    customerId: s.customer.CustomerIdSchema,
    includeClosed: z.boolean().default(false)   
})

export type GetProductsForCustomersReqType = z.infer<typeof GetProductsForCustomersReqSchema>

export const GetProductsForCustomersResSchema = z.object({
    productCode: ProductCodeSchema,
    productId: z.string(),
    productStatus: z.enum(['origination', 'active', 'suspended', 'dormant', 'closed']),
    productRiskScore: z.number().min(0).max(100)
})

export type GetProductsForCustomersResType = z.infer<typeof GetProductsForCustomersResSchema>

export const StartProductOriginationReqSchema = z.object({
    idempotencyKey: s.api.IdempotencyKeySchema,
    customerId: s.customer.CustomerIdSchema,
    productCode: ProductCodeSchema,
})

export type StartProductOriginationReqType = z.infer<typeof StartProductOriginationReqSchema>

export const StartProductOriginationResSchema = z.object({
    productId: z.string(),
    productStatus: z.enum(['origination', 'active', 'suspended', 'dormant', 'closed']),
})

export type StartProductOriginationResType = z.infer<typeof StartProductOriginationResSchema>
