import * as z from 'zod';
import * as s from '@packages/shared';
export const GetEligibleProductsForCustomerReqSchema = z.object({
    customerId: s.customer.CustomerIdSchema,
});
export const GetEligibleProductsForCustomerResSchema = z.object({
    productCode: ProductCodeSchema
});
export const GetProductsForCustomersReqSchema = z.object({
    customerId: s.customer.CustomerIdSchema,
    includeClosed: z.boolean().default(false)
});
export const GetProductsForCustomersResSchema = z.object({
    productCode: ProductCodeSchema,
    productId: z.string(),
    productStatus: z.enum(['origination', 'active', 'suspended', 'dormant', 'closed']),
    productRiskScore: z.number().min(0).max(100)
});
export const StartProductOriginationReqSchema = z.object({
    idempotencyKey: s.api.IdempotencyKeySchema,
    customerId: s.customer.CustomerIdSchema,
    productCode: ProductCodeSchema,
});
export const StartProductOriginationResSchema = z.object({
    productId: z.string(),
    productStatus: z.enum(['origination', 'active', 'suspended', 'dormant', 'closed']),
});
