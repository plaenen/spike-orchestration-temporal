import * as z from 'zod'

export const IdempotencyKey = z.string().uuid()

// Identifiers 
export const ProductId = z.string().uuid()

// JSON ZodSchema definition, do not confuse with JSONschema
type Json = Literal | { [key: string]: Json } | Json[];
type Literal = boolean | null | number | string;
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
export const Json: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(Json), z.record(Json)])
);

// Headers 
export const HeadersSchema = z.map(z.string(), z.string())

