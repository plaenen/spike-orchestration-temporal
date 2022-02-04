import { registry, z } from '../registry'

registry.add({
    name: "cmd.product.create.v1",
    schema: {
        input: z.object({
            greet: z.string().min(3),
            name: z.string()
        }),
        output: z.object({
            message: z.string()
        })
    }
})