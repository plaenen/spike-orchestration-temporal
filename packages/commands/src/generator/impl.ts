import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid';

/* 
    --------------------------------------------------------------------------------------
    Generated do not change as changes will be overridden
    -------------------------------------------------------------------------------------- 
*/ 

// CreateProduct
const CreateProductInputSchemaV1 = z.object({
    input: z.string()
})
const CreateProductOutSchemaV1 = z.object({
    output: z.string()
})
export type CreateProductInputV1 = z.infer<typeof CreateProductInputSchemaV1>
export type CreateProductOutputV1 = z.infer<typeof CreateProductOutSchemaV1>

export const getCommands = (opt: { dispatcher: Dispathcher, defaults?: CloudEventOptions }) => {
    const dispatcher = opt.dispatcher
    const defaultHeaders: Map<string, string> = opt.defaults?.headers || new Map<string, string>()
    const defaultSource = opt.defaults?.source || 'http://example.com/schema'
    return {
        product: { 
            create: {
                v1: async (input: CreateProductInputV1, options?: CloudEventOptions): Promise<CreateProductOutputV1> => {
                    validateDataWithSchema(input, CreateProductInputSchemaV1)
                    const opt: CloudEventOptions = {
                        source: options?.source || defaultSource,
                        headers: new Map<string, string>([...defaultHeaders, ...options?.headers || new Map<string, string>()]),
                    }
                    const cloudEvent = toCloudEvent(input, "command.request" ,opt)
                    const res = await dispatcher.dispatch(cloudEvent)
                    return fromCloudEvent<CreateProductOutputV1>(res, CreateProductOutSchemaV1)
                }
            }
        }
    }
}


/* 
    --------------------------------------------------------------------------------------
    Helper functions 
    -------------------------------------------------------------------------------------- 
*/ 

export type CommandOptions = {
    dispatcher: Dispathcher
    defaults: CloudEventOptions
}

export type CloudEventOptions = {
    headers?: Map<string, string>
    source?: string
}

// JSON ZodSchema definition, do not confuse with JSONschema
type Json = Literal | { [key: string]: Json } | Json[];
type Literal = boolean | null | number | string;
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const Json: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(Json), z.record(Json)])
);

// Headers 
export const HeadersSchema = z.map(z.string(), z.string())

// CloudEvent - inspired by cloud-events
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
export const CloudEventSchema = z.object({
    id: z.string(),
    source: z.string(),
    specversion: z.enum(['1.0']).default('1.0'),
    type: z.string(),
    subject: z.string(),
    time: z.date().default(new Date()),
    headers: HeadersSchema,
    datacontenttype: z.enum(['application/json']).default('application/json'),
    data: Json
})
export type CloudEvent = z.infer<typeof CloudEventSchema>

export interface Dispathcher {
    dispatch(cmd: CloudEvent): Promise<CloudEvent>
}

export interface Handler {
    route: string
    handle(event: CloudEvent): Promise<CloudEvent>
}

export type Issue = {
    path: string
    message: string
}

export class InputValidationError extends Error {
    private _issues: Issue[] = []

    get issues(): Issue[] {
        return this._issues
    }
    constructor(issues?: Issue[]) {
        super('Invallid command arguments: ' + JSON.stringify(issues, null, 2))
        this._issues = issues || []
    }
}

function validateDataWithSchema(data: any, schema: z.AnyZodObject) {
    const issues: Issue[] = []  
    const pres = schema.safeParse(data)
    if (!pres.success) {
        pres.error.issues.forEach((issue) => {
            issues.push({
                message: issue.message,
                path: issue.path.toString()
            })
        })
    }
    if (issues.length > 0) {
      throw new InputValidationError(issues)
    }
    console.log('validated.....')
}

function toCloudEvent(data: Json, evenType: string, options: CloudEventOptions): CloudEvent {
    const response: CloudEvent = {
        id: uuidv4(),
        source: options.source || '',
        specversion: '1.0',
        type: evenType,
        subject: '',
        headers: new Map<string, string>(),
        time: new Date(),
        datacontenttype: 'application/json',
        data: data
    }
    // Validate against our schema
    CloudEventSchema.parse(response)

    return response
}

function fromCloudEvent<TResult>(event: CloudEvent, schema: z.AnyZodObject): TResult {
    return schema.parse(event.data) as TResult
}

export const MockDispatcher = (handler: Handler): Dispathcher => {
    const h = handler
    return {
        dispatch: async (cloudEvent: CloudEvent): Promise<CloudEvent> => {
            const res = await h.handle(cloudEvent)
            return res
        }
    }
}

