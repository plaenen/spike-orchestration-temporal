import * as z from 'zod';
export interface ProductService {
    GetEligibleProductsForCustomer(req: GetEligibleProductsForCustomerReqType): Promise<GetEligibleProductsForCustomerResType>;
    GetProductsForCustomers(req: GetProductsForCustomersReqType): Promise<GetProductsForCustomersResType>;
    StartProductOrigination(req: StartProductOriginationReqType): Promise<StartProductOriginationResType>;
}
export declare const GetEligibleProductsForCustomerReqSchema: z.ZodObject<{
    customerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    customerId: string;
}, {
    customerId: string;
}>;
export declare type GetEligibleProductsForCustomerReqType = z.infer<typeof GetEligibleProductsForCustomerReqSchema>;
export declare const GetEligibleProductsForCustomerResSchema: z.ZodObject<{
    productCode: any;
}, "strip", z.ZodTypeAny, {
    productCode?: any;
}, {
    productCode?: any;
}>;
export declare type GetEligibleProductsForCustomerResType = z.infer<typeof GetEligibleProductsForCustomerReqSchema>;
export declare const GetProductsForCustomersReqSchema: z.ZodObject<{
    customerId: z.ZodString;
    includeClosed: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    customerId: string;
    includeClosed: boolean;
}, {
    includeClosed?: boolean | undefined;
    customerId: string;
}>;
export declare type GetProductsForCustomersReqType = z.infer<typeof GetProductsForCustomersReqSchema>;
export declare const GetProductsForCustomersResSchema: z.ZodObject<{
    productCode: any;
    productId: z.ZodString;
    productStatus: z.ZodEnum<["origination", "active", "suspended", "dormant", "closed"]>;
    productRiskScore: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    productCode?: any;
    productId: string;
    productStatus: "origination" | "active" | "suspended" | "dormant" | "closed";
    productRiskScore: number;
}, {
    productCode?: any;
    productId: string;
    productStatus: "origination" | "active" | "suspended" | "dormant" | "closed";
    productRiskScore: number;
}>;
export declare type GetProductsForCustomersResType = z.infer<typeof GetProductsForCustomersResSchema>;
export declare const StartProductOriginationReqSchema: z.ZodObject<{
    idempotencyKey: z.ZodString;
    customerId: z.ZodString;
    productCode: any;
}, "strip", z.ZodTypeAny, {
    productCode?: any;
    customerId: string;
    idempotencyKey: string;
}, {
    productCode?: any;
    customerId: string;
    idempotencyKey: string;
}>;
export declare type StartProductOriginationReqType = z.infer<typeof StartProductOriginationReqSchema>;
export declare const StartProductOriginationResSchema: z.ZodObject<{
    productId: z.ZodString;
    productStatus: z.ZodEnum<["origination", "active", "suspended", "dormant", "closed"]>;
}, "strip", z.ZodTypeAny, {
    productId: string;
    productStatus: "origination" | "active" | "suspended" | "dormant" | "closed";
}, {
    productId: string;
    productStatus: "origination" | "active" | "suspended" | "dormant" | "closed";
}>;
export declare type StartProductOriginationResType = z.infer<typeof StartProductOriginationResSchema>;
//# sourceMappingURL=interface.d.ts.map