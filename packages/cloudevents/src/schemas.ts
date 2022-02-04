import * as z from 'zod'
import { InputValidationError } from './errors';
import { IssuesType } from './types';

export * as z from 'zod'

// Shared zod shema's
export const IdempotencyKeySchema = z.string().uuid().optional()
export const JwtSchema = z.string().optional()
export const IssuesSchema = z.array(z.object({
   message: z.string(),
   path: z.string()
}))

// JSON ZodSchema definition, do not confuse with JSONschema
type Json = Literal | { [key: string]: Json } | Json[];
type Literal = boolean | null | number | string;
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
export const JsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(JsonSchema), z.record(JsonSchema)])
);

// Headers 
export const HeadersSchema = z.map(z.string(), z.string())



// Shema for commands 
// lightly inspired by cloud-events
// {
//     "specversion" : "1.0",
//     "type" : "com.github.pull.create",
//     "source" : "https://github.com/cloudevents/spec/pull",
//     "subject" : "123",
//     "id" : "A234-1234-1234",
//     "time" : "2018-04-05T17:31:00Z",
//     "headers" : {
//          "foo": "bar"
//      },
//     "datacontenttype" : "application/json",
//     "data" : ...
// }
export const CommandSchema = z.object({
    id: z.string(),
    source: z.string(),
    specversion: z.enum(['1.0']).default('1.0'),
    type: z.string(),
    // subject: z.string(),
    time: z.date().default(new Date()),
    headers: HeadersSchema,
    datacontenttype: z.enum(['application/json']).default('application/json'),
    data: JsonSchema
})

export const ResponseSchema = z.object({
  id: z.string(),
  source: z.string(),
  specversion: z.enum(['1.0']).default('1.0'),
  type: z.string(),
  time: z.date().default(new Date()),
  processingtime: z.string(),
  headers: HeadersSchema,
  datacontenttype: z.enum(['application/json']).default('application/json'),
  data: JsonSchema
})

// Currently only supports Zod Objects, still have to figure out how to pass the other definitions
export function validateDataWithSchema(data: any, schema: z.AnyZodObject, throwExecption: boolean = true): IssuesType {
  const res: IssuesType = []  
  const pres = schema.safeParse(data)
  if (!pres.success) {
      pres.error.issues.forEach((issue) => {
          res.push({
              message: issue.message,
              path: issue.path.toString()
          })
      })
  }
  if (throwExecption && res.length > 0) {
    throw new InputValidationError(res)
  }
  return res
}