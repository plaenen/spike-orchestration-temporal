import { randomUUID } from 'crypto'
import { ResponseSchema } from './schemas'
import { JsonType, ResponseType, IssuesType } from './types'

export type ResponseOpt = {
    source: string
}

export const response = (opt?: ResponseOpt) => { 
    const source = opt?.source || ''

    return {
        createResponse: (): ResponseType => {
            const res: ResponseType = {
                id: randomUUID(),
                source: source,
                specversion: '1.0',
                type: '',
                processingtime: '',
                headers: new Map<string, string>(),
                time: new Date(),
                datacontenttype: 'application/json',
                data: {}
            }
            return res
        },
        validateResponse: (cmd: ResponseType): IssuesType => {
            const res: IssuesType = []  
            const pres = ResponseSchema.safeParse(cmd)
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