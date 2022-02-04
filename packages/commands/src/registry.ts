export * as z from "zod";
import { SchemaDefinition } from "./types";

function _registry() {
    const registry = new Map<string, SchemaDefinition>()

    return {
        add: (schema: SchemaDefinition) => {
            if (registry.has(schema.name)) {
                throw new Error(`duplicate registration for key: ${schema.name}`)
            }
            registry.set(schema.name, schema)
        },
        forEach: (fn: (definition: SchemaDefinition) => void) => {
            registry.forEach((value) => fn(value))
        } 
    }
}

export const registry = _registry()

