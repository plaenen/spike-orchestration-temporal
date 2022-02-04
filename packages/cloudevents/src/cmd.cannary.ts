import { command, CommandOpt } from '.'
import { z, validateDataWithSchema, CommandSchema, ResponseSchema} from './schemas'

const inputSchema= z.object({
    greet: z.string().min(3),
    name: z.string()
})
export type CreateCanaryInputType = z.infer<typeof inputSchema>

const responseSchema= ResponseSchema.extend({
    data: z.object({
        message: z.string()
    })
})
export type CreateCanaryResType = z.infer<typeof responseSchema>

const commandSchema = CommandSchema.extend({
    data: inputSchema
})
export type CreateCanaryType = z.infer<typeof commandSchema>

export const createCanaryCommand = (req: CreateCanaryInputType): CreateCanaryType  => {
    const cmdOps: CommandOpt = {
        source: 'git://example.com/schema/commands/CanaryCommand'
    }
    validateDataWithSchema(req, inputSchema)
    const cmd = command(cmdOps).createCommand({})
    cmd.type = 'cmd.canary.create.v1'
    cmd.data = req
    command(cmdOps).validateCommand(cmd)
    return cmd as CreateCanaryType
}

export function ValidateCreateCanaryResponse(response: any) {
    validateDataWithSchema(response, responseSchema)
}