import { randomUUID } from 'crypto'
import { CommandSchema } from './schemas'
import { JsonType, CommandType, IssuesType } from './types'

export type CommandOpt = {
    source: string
}

export const command = (opt?: CommandOpt) => { 
    const source = opt?.source || ''

    return {
        createCommand: (data: JsonType) => {
            const cmd: CommandType = {
                id: randomUUID(),
                source: source,
                specversion: '1.0',
                type: '',
                // subject: '',
                headers: new Map<string, string>(),
                time: new Date(),
                datacontenttype: 'application/json',
                data: data
            }
            return cmd
        },
        validateCommand: (cmd: CommandType): IssuesType => {
            const res: IssuesType = []  
            const pres = CommandSchema.safeParse(cmd)
            if (!pres.success) {
                pres.error.issues.forEach((issue) => {
                    res.push({
                        message: issue.message,
                        path: issue.path.toString()
                    })
                })
            }
            return res
        }
    }
}