import { Context, Handler } from "./types";
import { ResponseType, CreateCanaryType, response, CreateCanaryResType, ValidateCreateCanaryResponse } from '@packages/commands'

export const canaryHandler: Handler = {
    type: 'cmd.canary.create.v1',
    handle: async (cmd: CreateCanaryType, _ctx: Context): Promise<ResponseType> => {
        const res = response().createResponse()
        res.data = { 
            message: `${cmd.data.greet} ${cmd.data.name}`
        }
        // ValidateCreateCanaryResponse(res)
        return res
    }
}

// Test see command centre tests

it('should always be true', () => {
    expect(1).toEqual(1)
})