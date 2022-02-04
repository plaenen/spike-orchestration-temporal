import * as z from 'zod' 
import { InitiateBuyToLetOriginationArgsType, InitiateBuyToLetOriginationResType } from './command'
import { BaseCommandHandler } from '@packages/commands'

export class InitiateBuyToLetOriginationHandler extends BaseCommandHandler<InitiateBuyToLetOriginationArgsType, InitiateBuyToLetOriginationResType> {
    constructor() {
        super('cmd:mortgages:start-buy-to-let-ordering.v1')
    }

    async handle(req: InitiateBuyToLetOriginationArgsType): Promise<InitiateBuyToLetOriginationResType> {
        return {
            productId: "123456789012"
        }
    }
}




