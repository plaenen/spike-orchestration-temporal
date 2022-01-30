import { randomUUID } from 'crypto'
import { ICommandHandler } from '@packages/shared/src/cqrs'
import { StartBuyToLetOrderingResType, StartBuyToLetOrderingCmd } from '../commands'

export class StartBuyToLetOrderingHandler implements ICommandHandler<StartBuyToLetOrderingCmd, StartBuyToLetOrderingResType> {    
    
    get handlesCommandName(): string {
        return 'cmd:mortgages:start-buy-to-let-ordering.v1'
    }

    // for test purpose, so results can be set from outside
    result?: StartBuyToLetOrderingResType

    async handle(command: StartBuyToLetOrderingCmd): Promise<StartBuyToLetOrderingResType> {
        if (command.name != this.handlesCommandName) {
            throw new Error(`This handler can not handle ${command.name} commands.`)
        }
        StartBuyToLetOrderingCmd.validateArgs(command)
        if (!this.result) {
            throw new Error('No result set')
        }
        return this.result
    }
}
