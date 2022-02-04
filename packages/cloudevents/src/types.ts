import * as z from 'zod'
import { CommandSchema, IdempotencyKeySchema, JsonSchema, JwtSchema, IssuesSchema, ResponseSchema } from "./schemas";

export type IdempotencyType = z.infer<typeof IdempotencyKeySchema>
export type JwtType = z.infer<typeof JwtSchema>
export type JsonType = z.infer<typeof JsonSchema>
export type CommandType = z.infer<typeof CommandSchema>
export type IssuesType = z.infer<typeof IssuesSchema>
export type ResponseType = z.infer<typeof ResponseSchema>