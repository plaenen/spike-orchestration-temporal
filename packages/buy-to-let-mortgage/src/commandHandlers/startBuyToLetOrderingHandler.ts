import { cqrs } from '@packages/shared'
import { commands } from '@packages/products'
import { StartBuyToLetOrderingResType, StartBuyToLetOrderingCmd } from '../commands'

export class StartBuyToLetOrderingHandler implements cqrs.ICommandHandler<StartBuyToLetOrderingCmd, StartBuyToLetOrderingResType> {    
    
    get handlesCommandName(): string {
        return 'cmd:mortgages:start-buy-to-let-ordering.v1'
    }

    private _cmdCentre: cqrs.CommandCentre

    async handle(command: StartBuyToLetOrderingCmd): Promise<StartBuyToLetOrderingResType> {
        const cmd = new commands.CreateProductCmd({
            customerId: command.args.customerId,
            idempotencyKey: command.args.idempotencyKey,
            productClass: 'mortgage:buy_to_let'
        })

        const res = await this._cmdCentre.execCommand<StartBuyToLetOrderingResType>(cmd)

        return {
            productId: res.productId
        }
    }

    constructor(cmdCentre: cqrs.CommandCentre) {
        this._cmdCentre = cmdCentre
    }
}
