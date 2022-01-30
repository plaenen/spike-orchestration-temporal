import { cqrs } from '@packages/shared'
import { commands } from '@packages/products'
import { StartBuyToLetOrderingResType, StartBuyToLetOrderingCmd } from '../commands'

export class StartBuyToLetOrderingHandler implements cqrs.ICommandHandler<StartBuyToLetOrderingCmd, StartBuyToLetOrderingResType> {    
    
    get handlesCommandName(): string {
        return 'cmd:mortgages:start-buy-to-let-ordering.v1'
    }

    private _registry: cqrs.CommandRegistry

    async handle(command: StartBuyToLetOrderingCmd): Promise<StartBuyToLetOrderingResType> {
        const cmd = new commands.CreateProductCmd({
            customerId: command.args.customerId,
            idempotencyKey: command.args.idempotencyKey,
            productClass: 'mortgage:buy_to_let'
        })

        this._registry.setHandler(cmd)

        const res = await cmd.execute()

        return {
            productId: res.productId
        }
    }

    constructor(registry: cqrs.CommandRegistry) {
        this._registry = registry
    }
}
