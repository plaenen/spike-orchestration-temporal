import { z } from "zod"

export type SchemaDefinition = {
    readonly name: string
    readonly schema: {
        input: z.ZodSchema<any, any>
        output: z.ZodSchema<any, any>
    }
}

export type SchemaRegistry = Map<string, SchemaDefinition>